using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using ChangelogApi.Models;

using Newtonsoft.Json;

namespace ChangelogApi.Services
{
    public class SlackClient
    {
        private readonly Uri uri;
        private readonly Encoding encoding = new UTF8Encoding();

        public SlackClient(string urlWithAccessToken)
        {
            this.uri = new Uri(urlWithAccessToken);
        }

        public async Task<HttpResponseMessage> PostMessage(ChangeLog changeLog, string username = null, string channel = null)
        {
            Payload payload = new Payload
            {
                Channel = channel,
                Username = username,
                Text = changeLog.ToMessage(),
                Emoji = ":niiice:"
            };

            return await PostMessage(payload);
        }

        public async Task<HttpResponseMessage> PostMessage(string text, string username = null, string channel = null)
        {
            Payload payload = new Payload
            {
                Channel = channel,
                Username = username,
                Text = text
            };

            return await PostMessage(payload);
        }

        private async Task<HttpResponseMessage> PostMessage(Payload payload)
        {
            var client = new HttpClient();
            var jsoncontent = JsonConvert.SerializeObject(payload);
            StringContent content = new StringContent(jsoncontent,this.encoding,"application/json");
            return await client.PostAsync(this.uri, content).ConfigureAwait(false);
        }
    }
}