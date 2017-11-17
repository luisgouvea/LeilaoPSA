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
        private LeilaoDAO leilaoDAO;
        public GerenciadorDB()
        {
            usuarioDAO = new UsuarioDAO(db, db.Usuario);
            leilaoDAO = new LeilaoDAO(db, db.Leilao);
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

        #region LeilaoDAO
        public bool addLeilao(Leilao leilao)
        {
            return leilaoDAO.addLeilao(leilao);
        }

        public List<Leilao> getAllLeilao()
        {
            return leilaoDAO.getAllLeilao();
        }
        #endregion

        #region LoteDAO
        public bool addLote(Lote lote)
        {
            //return loteDAO.addLote(leilao);
            return false;
        }
        #endregion
    }
}
