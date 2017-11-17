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
        public bool CriarLeilao(Leilao leilao)
        {
            if (leilao != null)
            {
                // logica - Factory para criar o Leilao
                return gerenciadorDB.addLeilao(leilao);
            }
            return false;
        }

        public List<Leilao> ListarTodosLeilao()
        {
            return gerenciadorDB.getAllLeilao();
        }
    }
}
