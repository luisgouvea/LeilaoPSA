namespace Persistencia
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class EnumFormaLances
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public EnumFormaLances()
        //{
        //    Leilao = new HashSet<Leilao>();
        //}

        [Key]
        public int id_enum_forma_lances { get; set; }

        [Required]
        [StringLength(30)]
        public string descricao { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public ICollection<Leilao> Leilao { get; set; }
    }
}
