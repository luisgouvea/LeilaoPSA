using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DAO
{
    public class LoteDAO
    {
        private System.Data.Entity.DbSet<Lote> loteContext;
        private static MapeamentoDbContext dataBase;

        public LoteDAO(MapeamentoDbContext db, System.Data.Entity.DbSet<Lote> lotes)
        {
            loteContext = lotes;
            dataBase = db;
        }

        public bool addLote(Lote lote)
        {
            try
            {
                loteContext.Add(lote);
                dataBase.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public List<Lote> getLotesByStatusDisponivel(int idUsuario)
        {
            var usuario = loteContext.Where(s => (s.id_usuario.Equals(idUsuario) && s.id_status_lote.Equals(1)));
            return loteContext.ToList();
        }
    }
}
