namespace Persistencia
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MapeamentoDbContext : DbContext
    {
        public MapeamentoDbContext()
            : base("name=MapeamentoDbContext")
        {
        }

        public virtual DbSet<Bem> Bem { get; set; }
        public virtual DbSet<EnumFormaLances> EnumFormaLances { get; set; }
        public virtual DbSet<EnumNatureza> EnumNatureza { get; set; }
        public virtual DbSet<Lance> Lance { get; set; }
        public virtual DbSet<Leilao> Leilao { get; set; }
        public virtual DbSet<Lote> Lote { get; set; }
        public virtual DbSet<LoteBem> LoteBem { get; set; }
        public virtual DbSet<StatusLote> StatusLote { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lance>()
                .Property(e => e.valor)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Lote>()
                .Property(e => e.preco)
                .HasPrecision(19, 4);
        }
    }
}
