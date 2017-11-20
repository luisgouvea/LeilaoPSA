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
        public Leilao InstanceLeilao(Leilao leilao, string natureza, string formaLances)
        {
            if (natureza.Equals("demanda") && formaLances.Equals("aberto"))
            {
                LeilaoDemandaAberto leilaoDemandaAberto = new LeilaoDemandaAberto();
                return leilaoDemandaAberto.DefineLeilao(leilao);
            }
            else if (natureza.Equals("demanda") && formaLances.Equals("fechado"))
            {
                LeilaoDemandaFechado leilaoDemandaFechado = new LeilaoDemandaFechado();
                return leilaoDemandaFechado.DefineLeilao(leilao);
            }
            else if (natureza.Equals("oferta") && formaLances.Equals("aberto"))
            {
                LeilaoOfertaAberto leilaoOfertaAberto = new LeilaoOfertaAberto();
                return leilaoOfertaAberto.DefineLeilao(leilao);
            }
            else if (natureza.Equals("oferta") && formaLances.Equals("fechado"))
            {
                LeilaoOfertaFechado leilaoOfertaFechado = new LeilaoOfertaFechado();
                return leilaoOfertaFechado.DefineLeilao(leilao);
            }
            else return null;
        }
    }
}
