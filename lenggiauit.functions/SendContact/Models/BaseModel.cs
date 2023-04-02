using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Models
{
    public abstract class BaseModel
    {
        private ValidationContext _validationContext;
        private List<ValidationResult> _validationResult;
        public BaseModel()
        {
            _validationContext = new ValidationContext(this, null, null);
            _validationResult = new List<ValidationResult>();
        }
        public bool IsValid()
        { 
            return Validator.TryValidateObject(this, _validationContext, _validationResult, true);
        }
    }
}
