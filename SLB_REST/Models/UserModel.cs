using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models
{
	public class UserModel : IdentityUser<int>
	{
		public UserModel(string userName) : base(userName)
		{
		}
		public UserModel()
		{

		}

		public ICollection<AlbumModel> Albums { get; set; }
	}
}
