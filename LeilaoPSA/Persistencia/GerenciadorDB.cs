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
        private LoteDAO loteDAO;
        private LanceDAO lanceDAO;
        private LoteBemDAO loteBemDAO;
        public GerenciadorDB()
        {
            usuarioDAO = new UsuarioDAO(db, db.Usuario);
            leilaoDAO = new LeilaoDAO(db, db.Leilao);
            loteDAO = new LoteDAO(db, db.Lote);
            lanceDAO = new LanceDAO(db, db.Lance);
            loteBemDAO = new LoteBemDAO(db, db.LoteBem);
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
            return loteDAO.addLote(lote);
        }

        public List<Lote> getLotesByStatusDisponivel(int idUsuario)
        {
            return loteDAO.getLotesByStatusDisponivel(idUsuario);
        }
        #endregion

        #region Lance
        public bool addLance(Lance lance)
        {
            return lanceDAO.addLance(lance);
        }

        public List<Lance> getLancesByIdLeilao(int idLeilao)
        {
            return lanceDAO.getLancesByIdLeilao(idLeilao);
        }
        #endregion

        #region LoteBem
        public List<LoteBem> getLoteBensByIdLote(int idLote)
        {
            return loteBemDAO.getLoteBensByIdLote(idLote);
        }
        #endregion
    }
}
