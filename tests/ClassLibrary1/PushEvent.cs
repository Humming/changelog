using System;
using System.Collections.Generic;

using Newtonsoft.Json;

namespace ClassLibrary1
{
    public class PushEvent
    {
        public Actor Actor { get; set; }
        public Repository Repository { get; set; }

        public Push Push { get; set; }
    }

    public interface ILink
    {
        string Href { get; set; }
    }
    public class LinkItem : ILink
    {
        public string Href { get; set; }
    }
    public class Link 
    {
        public LinkItem Self { get; set; }
        public LinkItem Html { get; set; }
        public LinkItem Avatar { get; set; }

        public LinkItem Diff { get; set; }

        public LinkItem Commits { get; set; }
    }

    public class Actor
    {
        public string Type { get; set; }
        public string Username { get; set; }
        [JsonProperty("display_name")]
        public string DisplayName { get; set; }
        public string UUID { get; set; }
        public Link Links { get; set; }
    }

    public class Repository
    {
        public string Type { get; set; }
        public string Name { get; set; }
        [JsonProperty("full_name")]
        public string Fullname { get; set; }
        public string UUID { get; set; }
        public Link Links { get; set; }
        public string Project { get; set; }
        public string Website { get; set; }
        public Actor Owner { get; set; }
        public string Scm { get; set; }
        [JsonProperty("is_private")]
        public bool IsPrivate { get; set; }
    }

    public class Project
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string UUID { get; set; }
        public Link Links { get; set; }
        public string Key { get; set; }
    }

    public class Push
    {
        public List<Change> Changes { get; set; }
        
    }

    public class Target : ITarget
    {
        public string Type { get; set; }
        public string Hash { get; set; }
        public Actor Author { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public List<Parent> Parents { get; set; }
        public Link Links { get; set; }
    }

    public class Parent : IParent
    {
        public string Type { get; set; }
        public string Hash { get; set; }
        public Link Links { get; set; }
    }
    public interface IParent
    {
        string Type { get; set; }
        string Hash { get; set; }
        Link Links { get; set; }

    }
    public interface ITarget
    {
        string Type { get; set; }
        string Hash { get; set; }
        Actor Author { get; set; }
        string Message { get; set; }
        DateTime Date { get; set; }
        List<Parent> Parents { get; set; }
        Link Links { get; set; }
    }

    public interface IChangeItem
    {
        string Type { get; set; }
        string Name { get; set; }
        LinkItem Links { get; set; }
        Target Target { get; set; }
    }

    public class ChangeItem : IChangeItem
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public LinkItem Links { get; set; }
        public Target Target { get; set; }
        public List<Parent> Parents { get; set; }
    }

    public class Change
    {
        public ChangeItem New { get; set; }
        public ChangeItem Old { get; set; }
        public Link Links { get; set; }
        public bool Created { get; set; }
        public bool Forced { get; set; }
        public bool Closed { get; set; }
        public bool Truncated { get; set; }
        public List<Commit> Commits { get; set; }
    }

    public class Commit
    {
        public string Hash { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public Actor Author { get; set; }

        public Link Links { get; set; }


    }
}
