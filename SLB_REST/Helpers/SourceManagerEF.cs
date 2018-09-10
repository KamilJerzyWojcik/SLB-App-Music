using Newtonsoft.Json.Linq;
using SLB_REST.Context;
using SLB_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Helpers
{
    public class SourceManagerEF
    {
        private DiscogsClientModel discogsClient;
        private JObject _albumJSON;


        public SourceManagerEF()
        {
            discogsClient = new DiscogsClientModel();
            _albumJSON = null;
        }

        public SourceManagerEF Load(string link)
        {
            string result = discogsClient.SetLink(link).GetJsonByLink();
            _albumJSON = JObject.Parse(result);

            return this;
        }

        public SourceManagerEF Json(JObject json)
        {
            _albumJSON = json;

            return this;
        }

        public AlbumModel GetAlbum()
        {
            if (_albumJSON == null) return null;
            AlbumModel album = new AlbumModel();
            try
            {
                album.Title = _albumJSON["title"].ToString();
                return album;
            }
            catch (Exception)
            {
                album.Title = "no data";
                return album;
            }
        }

        public List<ArtistModel> GetArtist()
        {
            if (_albumJSON == null) return null;
            List<ArtistModel> artists = new List<ArtistModel>();
            try
            {
                foreach (var a in _albumJSON["artists"])
                    artists.Add(new ArtistModel() { Name = a["name"].ToString() });
                return artists;
            }
            catch (Exception)
            {
                artists.Add(new ArtistModel() { Name = "no data" });
                return artists;
            }
        }

        public List<GenreModel> GetGenres()
        {
            if (_albumJSON == null) return null;
            List<GenreModel> genres = new List<GenreModel>();
            try
            {
                foreach (var g in _albumJSON["genres"])
                    genres.Add(new GenreModel() { Genre = g.ToString() });
                return genres;
            }
            catch (Exception)
            {
                genres.Add(new GenreModel() { Genre = "no data" });
                return genres;
            }
        }

        public List<StyleModel> GetStyles()
        {
            if (_albumJSON == null) return null;
            List<StyleModel> styles = new List<StyleModel>();
            try
            {
                foreach (var s in _albumJSON["styles"])
                    styles.Add(new StyleModel() { Style = s.ToString() });
                return styles;
            }
            catch (Exception)
            {
                styles.Add(new StyleModel() { Style = "no data" });
                return styles;
            }
        }

        public List<VideoModel> GetVideos()
        {
            if (_albumJSON == null) return null;
            List<VideoModel> videos = new List<VideoModel>();
            try
            {
                foreach (var video in _albumJSON["videos"])
                    videos.Add(new VideoModel()
                    {
                        Description = video["description"].ToString(),
                        Uri = video["uri"].ToString()
                    });
                return videos;
            }
            catch (Exception)
            {
                videos.Add(new VideoModel() { Description = "no data", Uri = "no data" });
                return videos;
            }
        }

        public List<TrackModel> GetTracks()
        {
            if (_albumJSON == null) return null;
            List<TrackModel> tracks = new List<TrackModel>();
            try
            {
                foreach (var track in _albumJSON["tracklist"])
                {
                    tracks.Add(new TrackModel()
                    {
                        Duration = track["duration"].ToString(),
                        Position = track["position"].ToString(),
                        Title = track["title"].ToString()
                    });
                }

                return tracks;
            }
            catch (Exception)
            {
                tracks.Add(new TrackModel()
                {
                    Duration = "no data",
                    Position = "no data",
                    Title = "no data"
                });
                return tracks;
            }
        }

        public List<ExtraArtistModel> GetExtraArtist(int idTrack)
        {
            if (_albumJSON == null) return null;
            var ExtraArtists = new List<ExtraArtistModel>();

            try
            {
                foreach (var a in _albumJSON["tracklist"][idTrack]["extraartists"])
                    ExtraArtists.Add(new ExtraArtistModel() { Name = a["name"].ToString() });
                return ExtraArtists;
            }
            catch (Exception)
            {
                ExtraArtists.Add(new ExtraArtistModel() { Name = "no data" });
                return ExtraArtists;
            }
        }

        public List<ImageModel> GetImages()
        {
            if (_albumJSON == null) return null;
            List<ImageModel> images = new List<ImageModel>();
            try
            {
                foreach (var image in _albumJSON["images"])
                    images.Add(new ImageModel() { Uri = image["uri"].ToString() });
                return images;
            }
            catch (Exception)
            {
                images.Add(new ImageModel() { Uri = "no data" });
                return images;
            }
        }

        public AlbumThumbModel GetAlbumThumb()
        {
            AlbumThumbModel albumThumb = new AlbumThumbModel();
            try
            {
                if (GetAlbum() != null) albumThumb.Title = GetAlbum().Title;
                if (GetStyles() != null) albumThumb.Style = GetStyles()[0].Style;
                if (GetGenres() != null) albumThumb.Genres = GetGenres()[0].Genre;
                if (GetArtist() != null) albumThumb.ArtistName = GetArtist()[0].Name;
                if (GetImages() != null) albumThumb.ImageThumbSrc = GetImages()[0].Uri;
                return albumThumb;
            }
            catch (Exception)
            {
                albumThumb = new AlbumThumbModel()
                {
                    Style = "no data",
                    Genres = "no data",
                    ArtistName = "no data",
                    ImageThumbSrc = "no data"
                };
                return albumThumb;
            }
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