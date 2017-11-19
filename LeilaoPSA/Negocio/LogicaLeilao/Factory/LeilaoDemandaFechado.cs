using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.LogicaLeilao.Factory
{
    public class LeilaoDemandaFechado : Leilao, ILeilaoRegra
    {
        public LeilaoDemandaFechado() { }

        public Leilao DefineLeilao(Leilao leiaoParam)
        {
            leiaoParam.id_enum_natureza = 2; // demanda 
            leiaoParam.id_enum_forma_lances = 2; // fechado         
            return leiaoParam;
        }
    }
}
