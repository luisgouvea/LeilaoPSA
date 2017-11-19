namespace Persistencia
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Leilao")]
    public partial class Leilao
    {
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        //public Leilao()
        //{
        //    Lance = new HashSet<Lance>();
        //}

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_leilao { get; set; }

        public int? id_lote { get; set; }

        public int? id_enum_natureza { get; set; }

        public int? id_enum_forma_lances { get; set; }

        public DateTime dtHoraInicio { get; set; }

        public DateTime dtHoraTermino { get; set; }

        public virtual EnumFormaLances EnumFormaLances { get; set; }

        public virtual EnumNatureza EnumNatureza { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public ICollection<Lance> Lance { get; set; }

        public virtual Lote Lote { get; set; }
    }
}
