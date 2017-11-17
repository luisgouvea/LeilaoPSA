using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistencia;
namespace Negocio
{
    public class GerenciadorUsuario
    {
        private GerenciadorDB gerenciadorDB;
        public GerenciadorUsuario()
        {
            gerenciadorDB = new GerenciadorDB();
        }

        public Usuario Autenticar(string email)
        {
            if (!string.IsNullOrEmpty(email))
            {
                Usuario usuarioModel =  new Usuario();
                usuarioModel.emaill = email;
                return gerenciadorDB.getUsuario(usuarioModel);
            }
            return null;
        }

        public bool Registrar(Usuario usuario)
        {
            if (usuario != null)
            {
                return gerenciadorDB.addUsuario(usuario);
            }
            return false;
        }
    }
}
