using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.ViewModel
{
	public class LoginViewModel
	{
		[Required]
		public string Login { get; set; }
		[Required]
		public string Password { get; set; }
		[DisplayName("Remember me")]
		public bool RememberMe { get; set; }
	}
}
