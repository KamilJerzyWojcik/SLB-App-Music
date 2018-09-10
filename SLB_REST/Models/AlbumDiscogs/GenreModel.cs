using System.ComponentModel.DataAnnotations.Schema;

namespace SLB_REST.Models
{
	public class GenreModel
	{
		public int ID { get; set; }

        [ForeignKey("AlbumID")]
        public AlbumModel Album { get; set; }

        public string Genre { get; set; }
	}
}