using Lenggiauit.API.Domain.Services.Communication.Request; 
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Data; 
using System.Linq.Dynamic.Core;
using Lenggiauit.API.Domain.Helpers;
using System.Linq.Expressions;
using System;

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

            //if (requestMetaData?.Filters != null)
            //{
            //    foreach (var f in requestMetaData.Filters)
            //    {
            //        query = query.Where(BuildPredicate<T>(f.Field, f.Comparison, f.Value));
            //    }
            //}

            return query;
        }


        public static Expression<Func<T, bool>> BuildPredicate<T>(string fieldName, string comparison, string value)
        {
            var parameter = Expression.Parameter(typeof(T));
            var left = fieldName.Split('.').Aggregate((Expression)parameter, Expression.PropertyOrField);
            var body = MakeComparison(left, comparison, value);
            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }

        private static Expression MakeComparison(Expression left, string comparison, string value)
        {
            var constant = Expression.Constant(value, left.Type);
            switch (comparison)
            {
                case "==":
                    return Expression.MakeBinary(ExpressionType.Equal, left, constant);
                case "!=":
                    return Expression.MakeBinary(ExpressionType.NotEqual, left, constant);
                case ">":
                    return Expression.MakeBinary(ExpressionType.GreaterThan, left, constant);
                case ">=":
                    return Expression.MakeBinary(ExpressionType.GreaterThanOrEqual, left, constant);
                case "<":
                    return Expression.MakeBinary(ExpressionType.LessThan, left, constant);
                case "<=":
                    return Expression.MakeBinary(ExpressionType.LessThanOrEqual, left, constant);
                case "Contains":
                case "StartsWith":
                case "EndsWith":
                    if (value is string)
                    {
                        return Expression.Call(left, comparison, Type.EmptyTypes, constant);
                    }
                    throw new NotSupportedException($"Comparison operator '{comparison}' only supported on string.");
                default:
                    throw new NotSupportedException($"Invalid comparison operator '{comparison}'.");
            }
        }

    }



}
