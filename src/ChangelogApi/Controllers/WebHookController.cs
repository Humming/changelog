using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChangelogApi.Data;
using ChangelogApi.Models;
using ChangelogApi.Services;

using Microsoft.AspNetCore.Cors;

using Newtonsoft.Json.Linq;

namespace ChangelogApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Produces("application/json")]
    [Route("api/WebHook")]
    public class WebHookController : Controller
    {
        [EnableCors("MyPolicy")]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PushEvent pushEvent)
        {

            if (pushEvent == null)
                return BadRequest();

            return Ok(pushEvent);
        }
    }
}