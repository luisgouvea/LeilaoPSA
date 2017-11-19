using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.LogicaLeilao.Factory
{
    public class LeilaoOfertaAberto : Leilao, ILeilaoRegra
    {
        public LeilaoOfertaAberto() { }

        public Leilao DefineLeilao(Leilao leiaoParam)
        {
            leiaoParam.id_enum_natureza = 1; // oferta 
            leiaoParam.id_enum_forma_lances = 1; // aberto         
            return leiaoParam;
        }
    }
}
