using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Communication
{
    public class Json<T>  
    {
        public ResultCode ResultCode { get; set; }
        public string Message { get; set; }
        public T Resource { get; set; }

    }
}
