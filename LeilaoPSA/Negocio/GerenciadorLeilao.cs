using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class GerenciadorLeilao
    {
        private GerenciadorDB gerenciadorDB;
        public GerenciadorLeilao()
        {
            gerenciadorDB = new GerenciadorDB();
        }
        public bool CriarLeilao(Persistencia.Leilao leilao, string natureza, string formaLances)
        {
            if (leilao != null)
            {
                // logica - Factory para criar o Leilao
                LogicaLeilao.Factory.LeilaoFactory leilaoFactory = new LogicaLeilao.Factory.LeilaoFactory();
                Leilao leiaoParaCriar =  leilaoFactory.InstanceLeilao(leilao, natureza, formaLances);
                return gerenciadorDB.addLeilao(leiaoParaCriar);
            }
            return false;
        }

        public List<Leilao> ListarTodosLeilao()
        {
            return gerenciadorDB.getAllLeilao();
        }
    }
}
