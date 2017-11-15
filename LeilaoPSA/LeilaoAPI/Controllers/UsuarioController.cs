using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LeilaoAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Autenticar()
        {
            Negocio.LeilaoFachada leilaoFachada = new Negocio.LeilaoFachada();
            Persistencia.Usuario usuario =  leilaoFachada.Autenticar();

            return Request.CreateResponse(HttpStatusCode.OK, "Nome do usuario do banco: " + usuario.nome);
        }
    }
}
