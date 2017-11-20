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
        public HttpResponseMessage CriarLeilao(Leilao leilao, string natureza,  string formaLances)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            bool criou = leilaoFachada.CriarLeilao(leilao, natureza, formaLances);
            return Request.CreateResponse(HttpStatusCode.OK, criou);
        }

        [HttpGet]
        public HttpResponseMessage ListarTodosLeilao()
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            List<Leilao> listaLeilao = leilaoFachada.ListarTodosLeilao();
            return Request.CreateResponse(HttpStatusCode.OK, listaLeilao);
        }
    }
}
