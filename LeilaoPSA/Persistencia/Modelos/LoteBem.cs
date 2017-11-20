namespace Persistencia
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("LoteBem")]
    public partial class LoteBem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_lote_bem { get; set; }

        public int? id_lote { get; set; }

        public int? id_bem { get; set; }

        public virtual Bem Bem { get; set; }

        public virtual Lote Lote { get; set; }
    }
}
