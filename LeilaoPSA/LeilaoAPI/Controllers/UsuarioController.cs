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
    public class UsuarioController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Autenticar(string email)
        {
            Negocio.LeilaoFachada leilaoFachada = new Negocio.LeilaoFachada();
            Usuario usuario =  leilaoFachada.AutenticarUsuario(email);
            return Request.CreateResponse(HttpStatusCode.OK, usuario);
        }

        [HttpPost]
        public HttpResponseMessage Registrar(Usuario usuario)
        {
            LeilaoFachada leilaoFachada = new LeilaoFachada();
            bool registrou = leilaoFachada.RegistrarUsuario(usuario);
            return Request.CreateResponse(HttpStatusCode.OK, registrou);
        }
    }
}
