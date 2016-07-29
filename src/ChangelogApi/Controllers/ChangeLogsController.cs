using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChangelogApi.Data;
using ChangelogApi.Models;

using Microsoft.AspNetCore.Cors;

namespace ChangelogApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Produces("application/json")]
    [Route("api/ChangeLogs")]
    public class ChangeLogsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChangeLogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ChangeLogs
        [EnableCors("MyPolicy")]
        [HttpGet]
        public IEnumerable<ChangeLog> GetChangeLog()
        {
            return _context.ChangeLog;
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

            ChangeLog changeLog = await _context.ChangeLog.SingleOrDefaultAsync(m => m.Id == id);

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

            _context.Entry(changeLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
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

            _context.ChangeLog.Add(changeLog);
            try
            {
                await _context.SaveChangesAsync();
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

            return CreatedAtAction("GetChangeLog", new { id = changeLog.Id }, changeLog);
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

            ChangeLog changeLog = await _context.ChangeLog.SingleOrDefaultAsync(m => m.Id == id);
            if (changeLog == null)
            {
                return NotFound();
            }

            _context.ChangeLog.Remove(changeLog);
            await _context.SaveChangesAsync();

            return Ok(changeLog);
        }

        private bool ChangeLogExists(int id)
        {
            return _context.ChangeLog.Any(e => e.Id == id);
        }
    }
}