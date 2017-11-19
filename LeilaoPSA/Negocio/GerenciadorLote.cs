using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistencia;
namespace Negocio
{
    public class GerenciadorLote
    {
        private GerenciadorDB gerenciadorDB;
        public GerenciadorLote()
        {
            gerenciadorDB = new GerenciadorDB();
        }
        public bool CriarLote(Lote lote)
        {
            if (lote != null)
            {
                return gerenciadorDB.addLote(lote);
            }
            return false;
        }

        public List<Lote> ListarTodosLotesDisponivel(int idUsuario)
        {
            return gerenciadorDB.getLotesByStatusDisponivel(idUsuario);
        }
    }
}
