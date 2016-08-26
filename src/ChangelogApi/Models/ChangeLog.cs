using System;

namespace ChangelogApi.Models
{
    public class ChangeLog
    {
        public int Id { get; set; }
        public string Version { get; set; }
        public string Message { get; set; }
        public string Username { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}