using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Models
{
    public class SearchAlbumModel
    {
        public string thumbSrc { get; set; }
        public string title { get; set; }
        public string country { get; set; }
        public string genre { get; set; }
        public string year { get; set; }
        public string style { get; set; }
        public string type { get; set; }
        public string resources { get; set; }
    }
}
