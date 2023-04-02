using Lenggiauit.API.Domain.Entities;
using Lenggiauit.API.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly LenggiauitContext _context;
        public UnitOfWork(LenggiauitContext context)
        {
            _context = context;
        }
        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}