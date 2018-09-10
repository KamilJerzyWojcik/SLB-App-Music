using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models.ViewAlbums
{
	public class TrackViewModel
	{
		public string Position { get; set; }
		public string Duration { get; set; }
		public string Title { get; set; }
		public List<ExtraArtistViewModel> ExtraArtists { get; set; }
	}
}
