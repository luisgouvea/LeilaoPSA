namespace Persistencia
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Bem")]
    public partial class Bem
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public Bem()
        //{
        //    LoteBem = new HashSet<LoteBem>();
        //}

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_bem { get; set; }

        [Required]
        [StringLength(15)]
        public string descricaoBreve { get; set; }

        [Required]
        [StringLength(100)]
        public string descricaoCompleta { get; set; }

        [StringLength(30)]
        public string categoria { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LoteBem> LoteBem { get; set; }
    }
}
