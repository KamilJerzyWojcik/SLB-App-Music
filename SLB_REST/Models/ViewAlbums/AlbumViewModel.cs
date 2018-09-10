using SLB_REST.Models.Albums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models.ViewAlbums
{
	public class AlbumViewModel
	{

		public string Title { get; set; }
		public List<ArtistViewModel> Artists { get; set; }
		public List<GenreViewModel> Genres { get; set; }
		public List<StyleViewModel> Styles { get; set; }
		public List<VideoViewModel> Videos { get; set; }
		public List<TrackViewModel> Tracks { get; set; }
		public List<ImageViewModel> Images { get; set; }
	}
}
