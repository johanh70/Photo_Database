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
            // Om personens namn har färre tecken än 4 så svara med BadRequest
            if (person.Name.Length < 4)
            {
                return BadRequest();
            }

            if (person.Context.Length < 4)
            {
                return BadRequest();
            }

            var connectionString = @"Server = (localdb)\mssqllocaldb; Database = Photos; Trusted_Connection = True";
            var sql = $"Insert into Person(PersonName, PersonContext) Values(@name, @context)";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand(sql, connection);
                command.Parameters.Add(new SqlParameter("name", person.Name));
                command.Parameters.Add(new SqlParameter("context", person.Context));
                connection.Open();

                command.ExecuteNonQuery();
            }
            return Ok();
        }
    }
}
