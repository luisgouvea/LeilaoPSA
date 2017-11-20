namespace Persistencia
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Lote")]
    public partial class Lote
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public Lote()
        //{
        //    Leilao = new HashSet<Leilao>();
        //    LoteBem = new HashSet<LoteBem>();
        //}

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_lote { get; set; }

        public int? id_status_lote { get; set; }

        public int? id_usuario { get; set; }

        [Column(TypeName = "money")]
        public decimal preco { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public ICollection<Leilao> Leilao { get; set; }

        public virtual StatusLote StatusLote { get; set; }

        public virtual Usuario Usuario { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public ICollection<LoteBem> LoteBem { get; set; }
    }
}
