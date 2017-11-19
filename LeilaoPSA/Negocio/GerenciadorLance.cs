using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class GerenciadorLance
    {
        private GerenciadorDB gerenciadorDB;
        public GerenciadorLance()
        {
            gerenciadorDB = new GerenciadorDB();
        }

        public bool CriarLance(Lance lance)
        {
            return gerenciadorDB.addLance(lance);
        }

        public List<Lance> ListarTodosLanceByLeilao(int idLeilao)
        {
            return gerenciadorDB.getLancesByIdLeilao(idLeilao);
        }
    }
}
