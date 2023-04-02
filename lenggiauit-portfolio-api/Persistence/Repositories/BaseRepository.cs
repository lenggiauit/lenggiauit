using Lenggiauit.API.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lenggiauit.API.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly LenggiauitContext _context;

        protected BaseRepository(LenggiauitContext context)
        {
            _context = context;
        }
    }
}