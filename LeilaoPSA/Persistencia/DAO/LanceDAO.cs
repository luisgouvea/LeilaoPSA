using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DAO
{
    public class LanceDAO
    {
        private System.Data.Entity.DbSet<Lance> lanceContext;
        private static MapeamentoDbContext dataBase;

        public LanceDAO(MapeamentoDbContext db, System.Data.Entity.DbSet<Lance> lances)
        {
            lanceContext = lances;
            dataBase = db;
        }

        public bool addLance(Lance lance)
        {
            try
            {
                lanceContext.Add(lance);
                dataBase.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public List<Lance> getLancesByIdLeilao(int idLeilao)
        {
            var lances = lanceContext.Where(s => (s.id_leilao.Equals(idLeilao)));
            if (lances != null)
            {
                return lances.Cast<Lance>().ToList();
            }
            return null;
        }
    }
}
