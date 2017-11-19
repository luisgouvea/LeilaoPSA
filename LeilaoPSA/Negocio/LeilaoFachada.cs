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
        private GerenciadorLote gerenciadorLote;
        private GerenciadorLance gerenciadorLance;

        public LeilaoFachada()
        {
            gerenciadorUsuario = new GerenciadorUsuario();
            gerenciadorLeilao = new GerenciadorLeilao();
            gerenciadorLote = new GerenciadorLote();
            gerenciadorLance = new GerenciadorLance();
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

        public List<Leilao> ListarTodosLeilao()
        {
            return gerenciadorLeilao.ListarTodosLeilao();
        }
        #endregion

        #region - LoteController
        public bool CriarLote(Lote lote)
        {
            return gerenciadorLote.CriarLote(lote);
        }

        public List<Lote> ListarTodosLotesDisponivel(int idUsuario)
        {
            return gerenciadorLote.ListarTodosLotesDisponivel(idUsuario);
        }
        #endregion

        #region - Lance
        public bool CriarLance(Lance lance)
        {
            return gerenciadorLance.CriarLance(lance);
        }

        public List<Lance> ListarTodosLanceByLeilao(int idLeilao)
        {
            return gerenciadorLance.ListarTodosLanceByLeilao(idLeilao);
        }
        #endregion
    }
}
