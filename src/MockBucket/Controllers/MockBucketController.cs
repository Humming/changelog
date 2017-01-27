using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace MockBucket.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/MockBucket")]
    public class MockBucketController : Controller
    {
        private readonly Encoding encoding = new UTF8Encoding();
        private readonly Uri uri;


        public MockBucketController()
        {
            this.uri = new Uri("http://development.changelog.no:54004/api/webhook/");
        }


        // this http://development.mockbucket.no:54005/api/mockbucket/f

        //[HttpGet]
        //public async Task<IActionResult> F()
        //{
        //    //api/values/f
        //    try
        //    {
        //        await Post();
        //    }
        //    catch
        //    {
        //        return BadRequest();
        //    }
        //    return Ok();
        //}

        // POST api/values
        [EnableCors("MyPolicy")]
        [HttpGet]
        [Produces("application/json")]
        public async Task<IActionResult> Index()
        {
            try
            {
                var jsoncontent = EventPayload.Create();
                var client = new HttpClient();

                StringContent content = new StringContent(jsoncontent, this.encoding, "application/json");
                var apiresponse = await client.PostAsync(this.uri, content).ConfigureAwait(false);

                if (!apiresponse.IsSuccessStatusCode)
                    return BadRequest(apiresponse);

                return Ok(apiresponse);
            }
            catch (Exception exception)
            {
                return BadRequest(exception);
            }
        }
    }

    public static class EventPayload
    {
        public static string Create()
        {
            return new RepoPush().GetPayload();
        }
    }

    public class RepoPush
    {
        private readonly string payload;


        public RepoPush()
        {
            this.payload = File.ReadAllText("c:\\git\\projects\\rc2\\changelog\\src\\mockbucket\\repopush.json");
        }


        public string GetPayload()
        {
            return this.payload;
        }
    }
}