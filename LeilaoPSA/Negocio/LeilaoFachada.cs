using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistencia;
namespace Negocio
{
    public class LeilaoFachada
    {
        private GerenciadorUsuario gerenciadorUsuario;

        public LeilaoFachada()
        {
            gerenciadorUsuario = new GerenciadorUsuario();
        }

        public Usuario AutenticarUsuario(string email)
        {
            return gerenciadorUsuario.Autenticar(email);
        }

        public bool RegistrarUsuario(Usuario usuario)
        {
            return gerenciadorUsuario.Registrar(usuario);
        }
    }
}
