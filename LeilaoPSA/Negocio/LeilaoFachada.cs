using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class LeilaoFachada
    {
        private GerenciadorUsuario gerenciadorUsuario;

        public LeilaoFachada()
        {
            gerenciadorUsuario = new GerenciadorUsuario();
        }

        public Persistencia.Usuario Autenticar()
        {
            return gerenciadorUsuario.Autenticar();
        }
    }
}
