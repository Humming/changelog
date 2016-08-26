namespace ChangelogApi.Models
{
    public static class ChangeLogExtensions
    {
        public static string ToMessage(this ChangeLog changeLog)
        {
            var message = string.Format("Version: {0}, Message: {1}, Username: {2}",changeLog.Version,changeLog.Message,changeLog.Username);
            return message;
        }
    }
}