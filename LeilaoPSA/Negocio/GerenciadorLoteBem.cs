using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class GerenciadorLoteBem
    {
        private GerenciadorDB gerenciadorDB;
        public GerenciadorLoteBem()
        {
            gerenciadorDB = new GerenciadorDB();
        }

        public List<LoteBem> getLoteBensByIdLote(int idLote)
        {
            return gerenciadorDB.getLoteBensByIdLote(idLote);
        }
    }
}
