using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistencia.DAO
{
    public class UsuarioDAO
    {
        private System.Data.Entity.DbSet<Usuario> usuarioContext;
        private static MapeamentoDbContext dataBase;

        public UsuarioDAO(MapeamentoDbContext db, System.Data.Entity.DbSet<Usuario> usuarios)
        {
            usuarioContext = usuarios;
            dataBase = db;
        }

        public Usuario getUsuario(Usuario usuarioTemp)
        {
            string emailTarget = usuarioTemp.emaill;
            var usuario = usuarioContext.Where(s => (s.emaill.Contains(emailTarget)));
            if (usuario != null)
            {
                return usuario.Cast<Usuario>().First();
            }
            return null;
        }

        public bool addUsuario(Usuario usuario)
        {
            try
            {
                usuarioContext.Add(usuario);
                dataBase.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new Exception("Não foi possivel inserir o usuario, erro: " + e.Message);
            }
        }
    }
}
