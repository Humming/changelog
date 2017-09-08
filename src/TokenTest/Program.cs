using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using IdentityModel.Client;

namespace TokenTest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Do();
        }


        public static void Do()
        {
            var authorizationUrl = "http://localhost:5000";

            var discovery = DiscoveryClient.GetAsync(authorizationUrl).Result;
            if (discovery == null)
            {
                Console.WriteLine($"Couldnt reach server");
            }
            var tokenClient = new TokenClient(discovery.TokenEndpoint, "clientA", "secret".Sha256());
            var tokenResponse = tokenClient.RequestClientCredentialsAsync("api1").Result;
            if (tokenResponse.IsError)
            {
                Console.WriteLine($"error:{tokenResponse.Error}");
                return;
            }

            Console.WriteLine($"json:{tokenResponse.Json}");

            var httpClient = new HttpClient();
            httpClient.SetBearerToken(tokenResponse.AccessToken);

            var response = httpClient.GetAsync("http://localhost:58029/home/about").Result;
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine(response.StatusCode);
            }
            else
            {
                var content = response.Content.ReadAsStringAsync().Result;
                Console.WriteLine(content);
            }
        }
    }
    public static class HashExtensions
    {
        public static bool IsMissing(this string value)
        {
            return string.IsNullOrWhiteSpace(value);
        }

        public static string Sha256(this string input)
        {
            if (input.IsMissing())
                return string.Empty;
            using (SHA256 shA256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(input);
                return Convert.ToBase64String(shA256.ComputeHash(bytes));
            }
        }

        public static byte[] Sha256(this byte[] input)
        {
            if (input == null)
                return (byte[])null;
            using (SHA256 shA256 = SHA256.Create())
                return shA256.ComputeHash(input);
        }

        public static string Sha512(this string input)
        {
            if (input.IsMissing())
                return string.Empty;
            using (SHA512 shA512 = SHA512.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(input);
                return Convert.ToBase64String(shA512.ComputeHash(bytes));
            }
        }
    }
}
