using System.ComponentModel.DataAnnotations.Schema;

namespace SLB_REST.Models
{
	public class ExtraArtistModel
	{
		public int ID { get; set; }

        [ForeignKey("TrackID")]
        public TrackModel Track { get; set; }

        public string Name { get; set; }
	}
}