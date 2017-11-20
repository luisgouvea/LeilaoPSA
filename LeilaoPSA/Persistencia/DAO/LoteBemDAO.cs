using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DAO
{
    public class LoteBemDAO
    {
        private System.Data.Entity.DbSet<LoteBem> loteBensContext;
        private static MapeamentoDbContext dataBase;

        public LoteBemDAO(MapeamentoDbContext db, System.Data.Entity.DbSet<LoteBem> loteBens)
        {
            loteBensContext = loteBens;
            dataBase = db;
        }

        public List<LoteBem> getLoteBensByIdLote(int idLote)
        {
            return loteBensContext.Where(s => s.id_lote.Equals(idLote)).ToList();
        }
    }
}
