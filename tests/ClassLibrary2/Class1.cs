using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;

namespace ClassLibrary2
{
    public class Class1
    {
        [Fact]
        public async void FactCheck()
        {
            Action a = () => { throw new Exception("!"); };
            Assert.Throws<Exception>(a);

            Func<Task> testCode = () => { throw new ArgumentException("alex er sulten'ish"); };

            var b = await Assert.ThrowsAsync<ArgumentException>(testCode);

            Assert.Equal("ALEX ER SULTEN",b.Message);
        }
    }
}
