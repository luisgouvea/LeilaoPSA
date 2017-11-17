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
    public class LoteController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage CriarLote(Lote lote)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            bool criou = leilaoFachada.CriarLote(lote);
            return Request.CreateResponse(HttpStatusCode.OK, criou);
        }

        [HttpGet]
        public HttpResponseMessage ListarTodosLeilaoDisponivel(int idUsuario)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            List<Lote> listaLote = leilaoFachada.ListarTodosLotesDisponivel(idUsuario);
            return Request.CreateResponse(HttpStatusCode.OK, listaLote);
        }
    }
}
