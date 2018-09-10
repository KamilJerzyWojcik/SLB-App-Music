using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SLB_REST.Models
{
	public class TrackModel
	{
		public int ID { get; set; }

		[ForeignKey("AlbumID")]
		public AlbumModel Album { get; set; }

		public string Position { get; set; }
		public string Duration { get; set; }
		public string Title { get; set; }
		public ICollection<ExtraArtistModel> ExtraArtists{ get; set; }
	}
}