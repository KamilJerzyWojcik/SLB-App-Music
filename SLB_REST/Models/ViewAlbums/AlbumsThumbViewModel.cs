using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models
{
    public class AlbumsThumbViewModel
    {
		public int AlbumId { get; set; }
		public string ImageThumbSrc { get; set; }
		public string Title { get; set; }
		public string ArtistName { get; set; }
		public string Style { get; set; }
		public string Genres { get; set; }
	}
}
