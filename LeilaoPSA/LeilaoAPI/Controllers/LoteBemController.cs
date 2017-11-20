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
    public class LoteBemController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage ListarBemByIdLote(int idLote)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            List<LoteBem> listLoteBem = leilaoFachada.ListarLoteBemByIdLote(idLote);
            return Request.CreateResponse(HttpStatusCode.OK, listLoteBem);
        }
    }
}
