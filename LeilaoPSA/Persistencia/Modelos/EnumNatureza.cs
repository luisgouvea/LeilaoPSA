namespace Persistencia
{
    using Persistencia;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EnumNatureza")]
    public partial class EnumNatureza
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public EnumNatureza()
        //{
        //    Leilao = new HashSet<Leilao>();
        //}

        [Key]
        public int id_enum_natureza { get; set; }

        [Required]
        [StringLength(30)]
        public string descricao { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public ICollection<Leilao> Leilao { get; set; }
    }
}
