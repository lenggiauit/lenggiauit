using Lenggiauit.API.Domain.Services.Communication.Request; 
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Data; 
using System.Linq.Dynamic.Core;
using Lenggiauit.API.Domain.Helpers;

namespace Lenggiauit.API.Extensions
{
    public static class PagingQueryable
    {
        public static IQueryable<T> GetPagingQueryable<T>(this IQueryable<T> query, RequestMetaData requestMetaData)
        {
            if(requestMetaData?.SortBy.Count() > 0)
            { 
                query = query.OrderBy(string
                    .Join(", ", requestMetaData.SortBy)); 
            }
            if(requestMetaData?.Paging == null)
            {
                query = query.Take(10);
            }
            if (requestMetaData?.Paging != null)
            {
                query = query.Skip((requestMetaData.Paging.Index - 1) * requestMetaData.Paging.Size).Take(requestMetaData.Paging.Size);
            }
            return query;
        }
    }
}
