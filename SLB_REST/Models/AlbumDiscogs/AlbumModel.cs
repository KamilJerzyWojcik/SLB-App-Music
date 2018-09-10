using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models
{
	public class AlbumModel
	{
		public int ID { get; set; }

		[ForeignKey("UserID")]
		public UserModel User { get; set; }

		public string Title { get; set; }
		public AlbumThumbModel AlbumThumb { get; set; }
		public ICollection<ArtistModel> Artists { get; set; }
		public ICollection<GenreModel> Genres { get; set; }
		public ICollection<StyleModel> Styles { get; set; }
		public ICollection<VideoModel> Videos { get; set; }
		public ICollection<TrackModel> Tracks { get; set; }
		public ICollection<ImageModel> Images { get; set; }
	}
}
