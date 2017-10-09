using Photo_Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Photo_Database.Controllers
{
    [RoutePrefix("api")]
    public class MyApiController : ApiController
    {
        [Route("AddPerson"), HttpPost]
        public IHttpActionResult AddPerson(Person person)
        {
            return Ok();
        }
    }
}
