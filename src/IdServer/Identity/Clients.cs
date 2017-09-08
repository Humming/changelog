#region License
// --------------------------------------------------
// Copyright © PayEx. All Rights Reserved.
// 
// This software is proprietary information of PayEx.
// USE IS SUBJECT TO LICENSE TERMS.
// --------------------------------------------------
#endregion

using System.Collections.Generic;
using System.Security.Claims;

using IdentityModel;

using IdentityServer4.Models;
using IdentityServer4.Test;

namespace IdServer.Identity
{
    public class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "clientA",
                    EnableLocalLogin = true,
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = 
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes =  { "api1" },AllowAccessTokensViaBrowser = true
                },
            };
        }
    }

    public class Resources
    {
        //public static IEnumerable<IdentityResource> GetIdentityResources()
        //{
        //    return new List<IdentityResource>
        //    {
        //        new IdentityResources.OpenId(),
        //        new IdentityResources.Profile(),
        //        new IdentityResources.Email(),
        //        new IdentityResource
        //        {
        //            Name = "role",
        //            UserClaims = new List<string> { "role" }
        //        }
        //    };
        //}


        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1","My api") {Scopes = {new Scope("api1")}}
            };
        }
    }

    public class Users
    {
        public static List<TestUser> Get()
        {
            return new List<TestUser> {
            new TestUser {
                SubjectId = "c6e7541d-6236-4241-a2e5-7bbaa063aab3",
                Username = "Eric",
                Password = "password",
                Claims = new List<Claim> {
                    new Claim(JwtClaimTypes.Email, "eric.stenseth@payex.com"),
                    new Claim(JwtClaimTypes.Role, "admin")
                }
            }
        };
        }
    }


}