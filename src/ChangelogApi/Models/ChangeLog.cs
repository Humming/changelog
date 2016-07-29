#region License
// --------------------------------------------------
// Copyright © PayEx. All Rights Reserved.
// 
// This software is proprietary information of PayEx.
// USE IS SUBJECT TO LICENSE TERMS.
// --------------------------------------------------
#endregion

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