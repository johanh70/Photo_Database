using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Photo_Database.Controllers
{
    [RoutePrefix("api/test")]
    public class TestApiController : ApiController
    {
        // GET api/values
        [Route("get")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
