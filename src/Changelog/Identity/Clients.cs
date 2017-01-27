#region License
// --------------------------------------------------
// Copyright © PayEx. All Rights Reserved.
// 
// This software is proprietary information of PayEx.
// USE IS SUBJECT TO LICENSE TERMS.
// --------------------------------------------------
#endregion

using System.Collections.Generic;

using IdentityServer4.Models;

namespace Changelog.Identity
{
    public class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "oauthClient",
                    ClientName = "Changelog",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("superSecretPassword1".Sha256())
                    },
                    AllowedScopes = new List<string> { "customAPI.read" }
                },
                new Client
                {
                    ClientId = "oauthClient",
                    ClientName = "ChangelogApi",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("superSecretPassword2".Sha256())
                    },
                    AllowedScopes = new List<string> { "customAPI.read" }
                },
                new Client
                {
                    ClientId = "oauthClient",
                    ClientName = "Mockbucket",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("superSecretPassword3".Sha256())
                    },
                    AllowedScopes = new List<string> { "customAPI.read" }
                },

            };
        }
    }

    public class Resources
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                new IdentityResource
                {
                    Name = "role",
                    UserClaims = new List<string> { "role" }
                }
            };
        }


        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource
                {
                    Name = "customAPI",
                    DisplayName = "Custom API",
                    Description = "Custom API Access",
                    UserClaims = new List<string> { "role" },
                    ApiSecrets = new List<Secret> { new Secret("scopeSecret".Sha256()) },
                    Scopes = new List<Scope>
                    {
                        new Scope("customAPI.read"),
                        new Scope("customAPI.write")
                    }
                }
            };
        }

    }


}