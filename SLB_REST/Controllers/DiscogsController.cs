using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SLB_REST.Context;
using SLB_REST.Helpers;
using SLB_REST.Models;

namespace SLB_REST.Controllers
{
    [Authorize]
    public class DiscogsController : Controller
	{
        private readonly EFContext _context;
        private SourceManagerEF _sourceManagerEF;
        private DiscogsClientModel _discogsClient;

        public DiscogsController(SourceManagerEF sourceManagerEF, EFContext context, DiscogsClientModel discogsClient)
        {
            _context = context;
            _sourceManagerEF = sourceManagerEF;
            _discogsClient = discogsClient;
        }


        public IActionResult Albums(string queryUser = "")
		{

			if (queryUser == "" || queryUser == null)
			{
				TempData["SearchError"] = "Wrong query, try search again";
				return View();
			}

			ViewBag.query = queryUser;

			return View();
		}

		public IActionResult GetJsonByQuery(string queryUser)
		{
			
			string[] query = queryUser.Split(",");
			string json = _discogsClient.SetQuery(query).SearchJsonByQuery();

			return Content(json);
		}

		public IActionResult GetJsonByLink(string link)
		{
			string json = _discogsClient.SetLink(link).GetJsonByLink();

			return Content(json);
		}

		public IActionResult Album(string resource)
		{
			string json = _discogsClient.SetLink(resource).GetJsonByLink();

			return Content(json);
		}

		[HttpPost]
		public IActionResult Add(string link)
		{

            AlbumModel album = _sourceManagerEF.Load(link).GetAlbum();

            album = addAlbum(album);
            addAlbumThumb(album);
            addTracks(album);
            addVideos(album);
            addStyles(album);
            addGenres(album);
            addImages(album);
            addArtists(album);
            _context.SaveChanges();

            return Ok();
        }


        private void addAlbumThumb(AlbumModel album)
        {
            UserModel user = _context.Users.Where(u => u.UserName == User.Identity.Name).SingleOrDefault();
            AlbumThumbModel albumThumb = _sourceManagerEF.GetAlbumThumb();
            if (albumThumb != null)
            {

                albumThumb.Album = new AlbumModel();
                albumThumb.Album.ID = album.ID;
                albumThumb.User = new UserModel();
                albumThumb.User.Id = user.Id;

                _context.AlbumsThumb.Add(albumThumb);
                _context.SaveChanges();
            }
        }

        private AlbumModel addAlbum(AlbumModel album)
        {
            UserModel user = _context.Users
            .Where(u => u.UserName == User.Identity.Name).SingleOrDefault();

            album.User = new UserModel();
            album.ID = 0;
            album.User.Id = user.Id;
            _context.Albums.Add(album);
            _context.SaveChanges();

            return album;
        }

        private void addTracks(AlbumModel album)
        {
            List<TrackModel> tracks = _sourceManagerEF.GetTracks();
            int id = 0;
            if (tracks != null && tracks.Count != 0)
            {
                foreach (var track in tracks)
                {
                    track.Album = new AlbumModel();
                    track.Album.ID = album.ID;
                    _context.Tracks.Add(track);
                    _context.SaveChanges();

                    int trackId = _context.Tracks.Where(t => t.Album.ID == album.ID && t.Title == track.Title).SingleOrDefault().ID;

                    List<ExtraArtistModel> xartists = _sourceManagerEF.GetExtraArtist(id);
                    if (xartists != null && xartists.Count != 0)
                    {
                        foreach (var xartist in xartists)
                        {
                            xartist.Track = new TrackModel();
                            xartist.Track.ID = trackId;
                            _context.ExtraArtists.Add(xartist);
                            //_context.SaveChanges();
                        }
                    }
                    id++;
                }
            }
        }

        private void addVideos(AlbumModel album)
        {
            List<VideoModel> videos = _sourceManagerEF.GetVideos();
            if (videos != null && videos.Count != 0)
            {
                foreach (var video in videos)
                {
                    video.Album = new AlbumModel();
                    video.Album.ID = album.ID;
                    _context.Videos.Add(video);
                    _context.SaveChanges();
                }
            }
        }

        private void addStyles(AlbumModel album)
        {
            List<StyleModel> styles = _sourceManagerEF.GetStyles();
            if (styles != null && styles.Count != 0)
            {
                foreach (var style in styles)
                {
                    style.Album = new AlbumModel();
                    style.Album.ID = album.ID;
                    _context.Styles.Add(style);
                   // _context.SaveChanges();
                }
            }
        }

        private void addGenres(AlbumModel album)
        {
            List<GenreModel> genres = _sourceManagerEF.GetGenres();
            if (genres != null && genres.Count != 0)
            {
                foreach (var genre in genres)
                {
                    genre.Album = new AlbumModel();
                    genre.Album.ID = album.ID;
                    _context.Genres.Add(genre);
                    //_context.SaveChanges();
                }
            }
        }

        private void addImages(AlbumModel album)
        {
            List<ImageModel> images = _sourceManagerEF.GetImages();
            if (images != null && images.Count != 0)
            {
                foreach (var image in images)
                {
                    image.Album = new AlbumModel();
                    image.Album.ID = album.ID;
                    _context.Images.Add(image);
                    _context.SaveChanges();
                }
            }
        }

        private void addArtists(AlbumModel album)
        {
            List<ArtistModel> artists = _sourceManagerEF.GetArtist();
            if (artists != null)
            {
                foreach (var artist in artists)
                {
                    artist.Album = new AlbumModel();
                    artist.Album.ID = album.ID;
                    _context.Artists.Add(artist);
                    //_context.SaveChanges();
                }
            }
        }
    }
}
