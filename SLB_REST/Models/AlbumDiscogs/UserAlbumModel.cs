using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models
{
	public class UserAlbumModel
	{
		public int ID { get; set; }

		public int UserID { get; set; }
		[ForeignKey("UserID")]
		public UserModel User { get; set; }

		public int AlbumID { get; set; }
		[ForeignKey("AlbumID")]
		public AlbumModel Album { get; set; }
	}
}
