using Photo_Database.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
            var connectionString = @"Server = (localdb)\mssqllocaldb; Database = Photos; Trusted_Connection = True";
            var sql = "Insert into Person(PersonName, PersonContext) Values('Anders', 'Kollega')";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand(sql, connection);
                connection.Open();

                command.ExecuteNonQuery();
            }
            return Ok();
        }
    }
}
