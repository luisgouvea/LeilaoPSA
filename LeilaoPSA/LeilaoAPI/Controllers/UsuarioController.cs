using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Persistencia;
using Negocio;
using Newtonsoft.Json;
using System.IO;

namespace LeilaoAPI.Controllers
{
    public class UsuarioController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Autenticar(string email)
        {
            try
            {
                LeilaoFachada leilaoFachada = new LeilaoFachada();
                Usuario usuario = leilaoFachada.AutenticarUsuario(email);
                return Request.CreateResponse(HttpStatusCode.OK, usuario);
            }
            catch (Exception ex)
            {
                //Loggin log = new Loggin();
                //log.criarMensagem(ex);
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        public HttpResponseMessage Registrar(Usuario usuario)
        {
            try
            {
                LeilaoFachada leilaoFachada = new LeilaoFachada();
                bool registrou = leilaoFachada.RegistrarUsuario(usuario);
                return Request.CreateResponse(HttpStatusCode.OK, registrou);
            }
            catch (Exception ex)
            {
                Loggin log = new Loggin();
                log.criarMensagem(ex);
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
