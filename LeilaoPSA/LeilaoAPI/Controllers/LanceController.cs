using Negocio;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LeilaoAPI.Controllers
{
    public class LanceController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage CriarLance(Lance lance)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            bool criou = leilaoFachada.CriarLance(lance);
            return Request.CreateResponse(HttpStatusCode.OK, criou);
        }

        [HttpPost]
        public HttpResponseMessage ListarTodosLanceByLeilao(int idLeilao)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            List<Lance> listaLance = leilaoFachada.ListarTodosLanceByLeilao(idLeilao);
            return Request.CreateResponse(HttpStatusCode.OK, listaLance);
        }
    }
}
