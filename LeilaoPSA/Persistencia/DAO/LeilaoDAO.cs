using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DAO
{
    public class LeilaoDAO
    {
        private System.Data.Entity.DbSet<Leilao> leilaoContext;
        private static MapeamentoDbContext dataBase;

        public LeilaoDAO(MapeamentoDbContext db, System.Data.Entity.DbSet<Leilao> leiloes)
        {
            leilaoContext = leiloes;
            dataBase = db;
        }

        public bool addLeilao(Leilao leilao)
        {
            try
            {
                leilaoContext.Add(leilao);
                dataBase.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public List<Leilao> getAllLeilao()
        {
            return leilaoContext.ToList();
        }
    }
}
