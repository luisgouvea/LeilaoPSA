using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class GerenciadorUsuario
    {
        private Persistencia.GerenciadorDB gerenciadorDB;
        public GerenciadorUsuario()
        {
            gerenciadorDB = new Persistencia.GerenciadorDB();
        }

        public Persistencia.Usuario Autenticar()
        {
            return gerenciadorDB.getUsuario();
        }
    }
}
