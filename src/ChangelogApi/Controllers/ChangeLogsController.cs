using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChangelogApi.Data;
using ChangelogApi.Models;
using ChangelogApi.Services;

using Microsoft.AspNetCore.Cors;

namespace ChangelogApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Produces("application/json")]
    [Route("api/ChangeLogs")]
    public class ChangeLogsController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly ISlackSettings settings;


        public ChangeLogsController(ApplicationDbContext context, ISlackSettings settings)
        {
            this.context = context;
            this.settings = settings;
        }


        // GET: api/ChangeLogs
        [EnableCors("MyPolicy")]
        [HttpGet]
        public async Task<IActionResult> GetChangeLog()
        {
            var changelogs = await this.context.ChangeLog.ToListAsync();
            if (!changelogs.Any())
                return NotFound();
            return Ok(changelogs);
        }

        // GET: api/ChangeLogs/5
        [EnableCors("MyPolicy")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChangeLog([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ChangeLog changeLog = await this.context.ChangeLog.SingleOrDefaultAsync(m => m.Id == id);

            if (changeLog == null)
            {
                return NotFound();
            }

            return Ok(changeLog);
        }

        // PUT: api/ChangeLogs/5
        [EnableCors("MyPolicy")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChangeLog([FromRoute] int id, [FromBody] ChangeLog changeLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != changeLog.Id)
            {
                return BadRequest();
            }

            this.context.Entry(changeLog).State = EntityState.Modified;

            try
            {
                await this.context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChangeLogExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ChangeLogs
        [EnableCors("MyPolicy")]
        [HttpPost]
        public async Task<IActionResult> PostChangeLog([FromBody] ChangeLog changeLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            this.context.ChangeLog.Add(changeLog);
            try
            {
                await this.context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ChangeLogExists(changeLog.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }
            var slackClient= new SlackClient(this.settings.WebHookUrl);
            var slackResponse = await slackClient.PostMessage(changeLog);
            if(slackResponse.IsSuccessStatusCode)
            {
                return CreatedAtAction("GetChangeLog", new { id = changeLog.Id }, changeLog);
            }
            else
            {
                return BadRequest();
            }
        }


        

        // DELETE: api/ChangeLogs/5
        [EnableCors("MyPolicy")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChangeLog([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ChangeLog changeLog = await this.context.ChangeLog.SingleOrDefaultAsync(m => m.Id == id);
            if (changeLog == null)
            {
                return NotFound();
            }

            this.context.ChangeLog.Remove(changeLog);
            await this.context.SaveChangesAsync();

            return Ok(changeLog);
        }

        private bool ChangeLogExists(int id)
        {
            return this.context.ChangeLog.Any(e => e.Id == id);
        }
    }
}