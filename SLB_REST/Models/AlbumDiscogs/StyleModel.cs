using System.ComponentModel.DataAnnotations.Schema;

namespace SLB_REST.Models
{
	public class StyleModel
	{
		public int ID { get; set; }

        [ForeignKey("AlbumID")]
        public AlbumModel Album { get; set; }

        public string Style { get; set; }
	}
}