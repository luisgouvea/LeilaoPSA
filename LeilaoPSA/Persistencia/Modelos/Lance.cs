namespace Persistencia
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Lance")]
    public partial class Lance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_lance { get; set; }

        public int? id_usuario { get; set; }

        public int? id_leilao { get; set; }

        public DateTime dtHora { get; set; }

        [Column(TypeName = "money")]
        public decimal valor { get; set; }

        public virtual Leilao Leilao { get; set; }

        public virtual Usuario Usuario { get; set; }
    }
}
