using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.LogicaLeilao.Factory
{
    public class LeilaoFactory
    {
        public Leilao InstanceLeilao(Leilao leilao)
        {
            if (leilao.id_enum_natureza.Equals(2) && leilao.id_enum_forma_lances.Equals(1))
            {
                LeilaoDemandaAberto leilaoDemandaAberto = new LeilaoDemandaAberto();
                return leilaoDemandaAberto.DefineLeilao(leilao);
            }
            else if (leilao.id_enum_natureza.Equals(2) && leilao.id_enum_forma_lances.Equals(2))
            {
                LeilaoDemandaFechado leilaoDemandaFechado = new LeilaoDemandaFechado();
                return leilaoDemandaFechado.DefineLeilao(leilao);
            }
            else if (leilao.id_enum_natureza.Equals(1) && leilao.id_enum_forma_lances.Equals(1))
            {
                LeilaoOfertaAberto leilaoOfertaAberto = new LeilaoOfertaAberto();
                return leilaoOfertaAberto.DefineLeilao(leilao);
            }
            else if (leilao.id_enum_natureza.Equals(1) && leilao.id_enum_forma_lances.Equals(2))
            {
                LeilaoOfertaFechado leilaoOfertaFechado = new LeilaoOfertaFechado();
                return leilaoOfertaFechado.DefineLeilao(leilao);
            }
            else return null;
        }
    }
}
