using System.ComponentModel.DataAnnotations.Schema;

namespace SLB_REST.Models
{
	public class ArtistModel
	{
		public int ID { get; set; }

        [ForeignKey("AlbumID")]
        public AlbumModel Album { get; set; }

        public string Name { get; set; }
	}
}