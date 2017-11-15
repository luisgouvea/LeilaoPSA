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
        private MapeamentoDbContext db = new MapeamentoDbContext();
        private UsuarioDAO usuarioDAO;
        public GerenciadorDB()
        {
            usuarioDAO = new UsuarioDAO(db.Usuario);
        }

        #region UsuarioDAO
        public Usuario getUsuario()
        {
            return usuarioDAO.getUsuario();
        }
        #endregion
    }
}
