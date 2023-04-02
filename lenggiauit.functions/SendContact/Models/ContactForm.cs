using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Models
{
    public class ContactForm: BaseModel
    {
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(150)]
        public string Subject { get; set; }
        [MaxLength(500)]
        public string Message { get; set; } 
    }
}
