using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LeilaoAPI.Controllers
{
    public class TesteController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage Comunicar()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Funcionou a comunicacao");
        }
    }
}
