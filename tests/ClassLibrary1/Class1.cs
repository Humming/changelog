using System.IO;

using Newtonsoft.Json;

using NUnit;
using NUnit.Framework;

namespace ClassLibrary1
{
    [TestFixture]
    public class Class1
    {
        [Test]
        public void Deserialize()
        {
            TestDelegate td = () =>
            {
                PushEvent p =
                    JsonConvert.DeserializeObject<PushEvent>(
                        File.ReadAllText(@"C:\git\projects\rc2\Changelog\tests\ClassLibrary1\jsonsource\repopush.json"));
            };
            Assert.DoesNotThrow(td);
        }
    }
}
