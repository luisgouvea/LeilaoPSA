using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Persistencia;
using Negocio;

namespace LeilaoAPI.Controllers
{
    public class LeilaoController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage CriarLeilao(Leilao leilao)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            bool criou = leilaoFachada.CriarLeilao(leilao);
            return Request.CreateResponse(HttpStatusCode.OK, criou);
        }
    }
}
