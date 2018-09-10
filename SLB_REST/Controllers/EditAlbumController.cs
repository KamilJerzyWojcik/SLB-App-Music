using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SLB_REST.Context;
using SLB_REST.Helpers;
using SLB_REST.Models;

namespace SLB_REST.Controllers
{
    public class EditAlbumController : Controller
    {
        private readonly EFContext _context;
        private SourceManagerEF _sourceManagerEF;
        private SourceManagerViewData _sourceManagerViewData;
        private SourceManagerDeleteAlbum _sourceManagerDeleteAlbum;


        public EditAlbumController(
            SourceManagerEF sourceManagerEF,
            EFContext context,
            SourceManagerViewData sourceManagerViewData,
            SourceManagerDeleteAlbum sourceManagerDeleteAlbum)
        {
            _context = context;
            _sourceManagerEF = sourceManagerEF;
            _sourceManagerViewData = sourceManagerViewData;
            _sourceManagerDeleteAlbum = sourceManagerDeleteAlbum;
        }


        [HttpGet]
        public IActionResult Edit(int id)
        {
            ViewBag.id = id;
            return View();
        }

        [HttpPost]
        public IActionResult Genres(string genres, int id)
        {

            var albumWithGenres = _context.Albums.Where(a => a.ID == id).Include(a => a.Genres).SingleOrDefault();
            albumWithGenres.Genres = _sourceManagerDeleteAlbum.GetTrimedGenres(genres);
            _context.Albums.Update(albumWithGenres);
            _context.SaveChanges();
            _sourceManagerDeleteAlbum.deleteOldGenres();

            var genView = _sourceManagerViewData.Load(albumWithGenres).GetViewGenres();
            return Json(genView);
        }

        [HttpGet]
        public IActionResult Genres(int id)
        {
            var albumWithGenres = _context.Albums.Where(a => a.ID == id).Include(a => a.Genres).SingleOrDefault();
            var genView = _sourceManagerViewData.Load(albumWithGenres).GetViewGenres();

            return Json(genView);
        }

        [HttpPost]
        public IActionResult Styles(string styles, int id)
        {
            var albumWithStyles = _context.Albums
            .Where(a => a.ID == id)
            .Include(a => a.Styles).SingleOrDefault();

            albumWithStyles.Styles = _sourceManagerDeleteAlbum.GetTrimedStyles(styles);

            _context.Albums.Update(albumWithStyles);
            _context.SaveChanges();

            _sourceManagerDeleteAlbum.DeleteOldStyles();

            var styView = _sourceManagerViewData.Load(albumWithStyles).GetViewStyles();
            return Json(styView);
        }

        [HttpGet]
        public IActionResult Styles(int id)
        {
            var albumWithStyles = _context.Albums.Where(a => a.ID == id).Include(a => a.Styles).SingleOrDefault();
            var styView = _sourceManagerViewData.Load(albumWithStyles).GetViewStyles();

            return Json(styView);
        }

        [HttpPost]
        public IActionResult Artists(string artists, int id)
        {
            var albumWithArtists = _context.Albums
            .Where(a => a.ID == id)
            .Include(a => a.Artists).SingleOrDefault();

            albumWithArtists.Artists = _sourceManagerDeleteAlbum.GetTrimedArtists(artists);

            _context.Albums.Update(albumWithArtists);
            _context.SaveChanges();

            _sourceManagerDeleteAlbum.DeleteOldArtists();

            var artView = _sourceManagerViewData.Load(albumWithArtists).GetViewArtists();

            return Json(artView);
        }


        [HttpGet]
        public IActionResult Artists(int id)
        {
            var albumWithArtists = _context.Albums.Where(a => a.ID == id).Include(a => a.Artists).SingleOrDefault();
            var artView = _sourceManagerViewData.Load(albumWithArtists).GetViewArtists();

            return Json(artView);
        }

        [HttpGet]
        public IActionResult Images(int id)
        {
            var albumWithImages = _context.Albums.Where(a => a.ID == id).Include(a => a.Images).SingleOrDefault();
            var imgView = _sourceManagerViewData.Load(albumWithImages).GetViewImages();

            return Json(imgView);
        }

        [HttpPost]
        public IActionResult AddImage(string image, int id)
        {
            ImageModel imgCont = _context.Images
            .Include(im => im.Album)
            .Where(im => im.Album.ID == id && im.Uri == image)
            .SingleOrDefault();

            if (imgCont == null)
            {
                AlbumModel albumWithImages = _context.Albums
                .Where(a => a.ID == id)
                .Include(a => a.Images)
                .SingleOrDefault();

                albumWithImages = _sourceManagerDeleteAlbum.AddImageToModel(albumWithImages, image);

                _context.Albums.Update(albumWithImages);
                _context.SaveChanges();

                return StatusCode(200);
            }

            return StatusCode(406);
        }

        [HttpPost]
        public IActionResult EditImage(string image, int idList, int id)
        {
            AlbumModel albumWithImages = _context.Albums
            .Where(a => a.ID == id)
            .Include(a => a.Images).SingleOrDefault();

            albumWithImages = _sourceManagerDeleteAlbum.AddImageToEdit(albumWithImages, idList, image);

            _context.Albums.Update(albumWithImages);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteImage(int idList, int id)
        {
            AlbumModel albumWithImages = _context.Albums
            .Where(a => a.ID == id)
            .Include(a => a.Images)
            .SingleOrDefault();

            var uri = _sourceManagerDeleteAlbum.DeleteImageUri(albumWithImages, idList);

            var imgCont = _context.Images
            .Include(im => im.Album)
            .Where(im => im.Album.ID == id && im.Uri == uri)
            .SingleOrDefault();

            _context.Images.Remove(imgCont);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult Videos(int id)
        {
            var albumWithVideos = _context.Albums.Where(a => a.ID == id).Include(a => a.Videos).SingleOrDefault();
            var videoView = _sourceManagerViewData.Load(albumWithVideos).GetViewVideos();

            return Json(videoView);
        }

        [HttpPost]
        public IActionResult AddVideos(string description, string source, int id)
        {
            var videoCont = _context.Videos
            .Include(im => im.Album)
            .Where(im => im.Album.ID == id && im.Uri == source)
            .SingleOrDefault();

            if (videoCont == null)
            {
                AlbumModel albumWithVideos = _context.Albums
                .Where(a => a.ID == id)
                .Include(a => a.Videos)
                .SingleOrDefault();

                albumWithVideos = _sourceManagerDeleteAlbum.AddVideo(albumWithVideos, description, source);

                _context.Albums.Update(albumWithVideos);
                _context.SaveChanges();

                return StatusCode(200);

            }

            return StatusCode(404);
        }

        [HttpPost]
        public IActionResult DeleteVideo(int id, int idList)
        {
            var albumWithVideos = _context.Albums
            .Where(a => a.ID == id)
            .Include(a => a.Videos)
            .SingleOrDefault();

            var videoUri = _sourceManagerDeleteAlbum.DeleteVideoUri(albumWithVideos, idList);

            var videoCont = _context.Videos
            .Include(im => im.Album)
            .Where(im => im.Album.ID == id && im.Uri == videoUri)
            .SingleOrDefault();

            _context.Videos.Remove(videoCont);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult EditVideo(string description, string source, int idList, int id)
        {
            AlbumModel albumWithVideos = _context.Albums
            .Where(a => a.ID == id)
            .Include(a => a.Videos)
            .SingleOrDefault();

            albumWithVideos = _sourceManagerDeleteAlbum.EditVideoUri(albumWithVideos, description, source, idList);

            _context.Albums.Update(albumWithVideos);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public IActionResult AlbumThumb(int id)
        {
            var albumWithAlbumThumb = _context.AlbumsThumb.Include(a => a.Album).Where(a => a.Album.ID == id).SingleOrDefault();
            var thumbAlbumView = _sourceManagerViewData.Load(albumWithAlbumThumb).GetViewThumbAlbum();

            return Json(thumbAlbumView);
        }

        [HttpPost]
        public IActionResult EditAlbumThumb(string imgSrc, string artist, string genre, string style, int id)
        {
            var albumThumb = _context.AlbumsThumb
            .Include(a => a.Album)
            .Where(a => a.Album.ID == id)
            .SingleOrDefault();

            albumThumb = _sourceManagerDeleteAlbum.AddThumbData(albumThumb, new string[] { imgSrc, artist, genre, style });

            _context.AlbumsThumb.Update(albumThumb);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteAlbum(int id)
        {
            var album = _context.Albums.Where(a => a.ID == id)
            .Include(a => a.AlbumThumb).SingleOrDefault();
            _context.AlbumsThumb.Remove(album.AlbumThumb);
            _context.SaveChanges();

            var artists = _context.Artists
            .Include(a => a.Album)
            .Where(a => a.Album.ID == id).ToList();
            _sourceManagerDeleteAlbum.DeleteAlbumArtists(artists);

            var tracks = _context.Tracks
            .Include(t => t.Album)
            .Where(t => t.Album.ID == id).ToList();
            _sourceManagerDeleteAlbum.DeleteAlbumTracksAndExtraartists(tracks);

            var genres = _context.Genres
            .Include(g => g.Album)
            .Where(g => g.Album.ID == id).ToList();
            _sourceManagerDeleteAlbum.DeleteAlbumGenres(genres);


            var styles = _context.Styles
            .Include(s => s.Album)
            .Where(s => s.Album.ID == id).ToList();
            _sourceManagerDeleteAlbum.DeleteAlbumStyles(styles);

            var videos = _context.Videos
            .Include(v => v.Album)
            .Where(v => v.Album.ID == id).ToList();
            _sourceManagerDeleteAlbum.DeleteAlbumVideos(videos);

            var images = _context.Images
            .Include(i => i.Album)
            .Where(i => i.Album.ID == id).ToList();
            _sourceManagerDeleteAlbum.DeleteAlbumImages(images);

            _context.Albums.Remove(album);
            _context.SaveChanges();

            return Ok();
        }
    }
}
