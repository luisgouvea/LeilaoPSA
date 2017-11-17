using Persistencia.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia
{
    public class GerenciadorDB
    {
        private static MapeamentoDbContext db = new MapeamentoDbContext();
        private UsuarioDAO usuarioDAO;
        public GerenciadorDB()
        {
            usuarioDAO = new UsuarioDAO(db, db.Usuario);
        }

        #region UsuarioDAO
        public Usuario getUsuario(Usuario usuarioTemp)
        {
            return usuarioDAO.getUsuario(usuarioTemp);
        }

        public bool addUsuario(Usuario usuario)
        {
            return usuarioDAO.addUsuario(usuario);
        }
        #endregion
    }
}
