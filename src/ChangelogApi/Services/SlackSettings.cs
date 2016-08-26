namespace ChangelogApi.Services
{
    public class SlackSettings : ISlackSettings{
        public SlackSettings(string webHookUrl)
        {
            WebHookUrl = webHookUrl;
        }


        public string WebHookUrl { get; }
    }
}
