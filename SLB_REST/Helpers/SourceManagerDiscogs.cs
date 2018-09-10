using Newtonsoft.Json.Linq;
using SLB_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Helpers
{
    public class SourceManagerDiscogs
    {
        private JObject _albumJSON;

        public SourceManagerDiscogs Json(JObject json)
        {
            _albumJSON = json;

            return this;
        }

        public List<SearchAlbumModel> GetSearchAlbums()
        {

            List<SearchAlbumModel> albums = new List<SearchAlbumModel>();
            if (!(_albumJSON["results"] is null))
            {
                foreach (var album in _albumJSON["results"])
                {
                    var al = new SearchAlbumModel();
                    if (!(album["thumb"] is null))
                        al.thumbSrc = album["thumb"].ToString();
                    else
                        al.thumbSrc = "/img/cd.jpg";

                    if (!(album["title"] is null))
                        al.title = album["title"].ToString();
                    else
                        al.title = "no data";

                    if (!(album["country"] is null))
                        al.country = album["country"].ToString();
                    else
                        al.country = "no data";

                    if (!(album["year"] is null))
                        al.year = album["year"].ToString();
                    else
                        al.year = "no data";

                    if (!(album["genre"] is null) && album["genre"].ToArray().Length > 0)
                        al.genre = album["genre"][0].ToString();
                    else
                        al.genre = "no data";

                    if (!(album["style"] is null) && album["style"].ToArray().Length > 0)
                        al.style = album["style"][0].ToString();
                    else
                        al.style = "no data";

                    if (!(album["type"] is null))
                        al.type = album["type"].ToString();
                    else
                        al.type = "no data";

                    al.resources= album["resource_url"].ToString();

                    albums.Add(al);
                }
            }
            return albums;

        }

        public string NextPage()
        {
            try
            {
                string nextPageUrl = _albumJSON["pagination"]["urls"]["next"].ToString();
                return nextPageUrl;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string PreviouslyPage()
        {
            try
            {
                string PreviouslyPageUrl = _albumJSON["pagination"]["urls"]["prev"].ToString();
                return PreviouslyPageUrl;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string ActualPage()
        {
            try
            {
                string actualPage = _albumJSON["pagination"]["page"].ToString();
                return actualPage;
            }
            catch (Exception)
            {
                return null;
            }

        }

        public string MaxPage()
        {
            try
            {
                string actualPages = _albumJSON["pagination"]["pages"].ToString();
                return actualPages;
            }
            catch (Exception)
            {
                return null;
            }
        }

    }
}