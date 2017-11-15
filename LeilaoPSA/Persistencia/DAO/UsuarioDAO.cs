using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DAO
{
    public class UsuarioDAO
    {
        private System.Data.Entity.DbSet<Usuario> usuarioContext;

        public UsuarioDAO(System.Data.Entity.DbSet<Usuario> usuarios)
        {
            usuarioContext = usuarios;
        }

        public Usuario getUsuario()
        {
            Usuario usuario = usuarioContext.Find(1);
            if(usuario != null)
            {
                return usuario;
            }
            return null;
        }
    }
}
