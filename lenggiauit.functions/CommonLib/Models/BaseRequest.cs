using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Models
{
    public class BaseRequest<T> : BaseModel
    {
        public RequestMetaData? MetaData { get; set; }
        [Required]
        public T Payload { get; set; }
    }
    public class RequestMetaData
    {
        public Paging Paging { get; set; }
        public string[] OrderBy { get; set; }
    }
    public class Paging
    {
        public int Index { get; set; }
        public int Size { get; set; }
    }
}
