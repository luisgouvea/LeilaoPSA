using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Persistencia;
namespace Negocio
{
    public class LeilaoFachada
    {
        private GerenciadorUsuario gerenciadorUsuario;
        private GerenciadorLeilao gerenciadorLeilao;

        public LeilaoFachada()
        {
            gerenciadorUsuario = new GerenciadorUsuario();
            gerenciadorLeilao = new GerenciadorLeilao();
        }

        #region - UsuarioController
        public Usuario AutenticarUsuario(string email)
        {
            return gerenciadorUsuario.Autenticar(email);
        }

        public bool RegistrarUsuario(Usuario usuario)
        {
            return gerenciadorUsuario.Registrar(usuario);
        }
        #endregion

        #region - LeilaoController
        public bool CriarLeilao(Leilao leilao)
        {
            return gerenciadorLeilao.CriarLeilao(leilao);
        }
        #endregion
    }
}
