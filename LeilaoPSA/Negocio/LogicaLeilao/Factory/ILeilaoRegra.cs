using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.LogicaLeilao.Factory
{
    public interface ILeilaoRegra
    {
        Leilao DefineLeilao(Leilao leilao);
    }
}
