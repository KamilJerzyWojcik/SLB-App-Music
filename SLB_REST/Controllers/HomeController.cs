using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.Extensibility.Implementation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SLB_REST.Context;
using SLB_REST.Helpers;
using SLB_REST.Models;
using SLB_REST.Models.Albums;
using SLB_REST.Models.ViewAlbums;

namespace SLB_REST.Controllers
{
	[Authorize]
	public class HomeController : Controller
	{
        private readonly EFContext _context;
        private readonly SourceManagerViewData _sourceManagerViewData;

        public HomeController(EFContext context, SourceManagerViewData sourceManagerViewData)
        {
            _context = context;
            _sourceManagerViewData = sourceManagerViewData;
        }

        [AllowAnonymous]
        public IActionResult About()
        {
            return View();
        }

        [AllowAnonymous]
        public IActionResult Manual()
        {
            return View();
        }


        public IActionResult Albums(string titleDelete = "")
		{
			if(titleDelete != "" && titleDelete != null) 
			{
				TempData["delete"] = $"Album {titleDelete} was deleted";
			}
			int nr = _context.AlbumsThumb
			.Include(a => a.Album)
			.Where(t => t.User.UserName == User.Identity.Name).ToList().Count;
			ViewBag.max = nr;
			if (nr == -1)
			{
				ViewBag.Start = "Your collection is empty, search albums";
			}
			
			return View();
		}

		public IActionResult GetThumbAlbum(int page, int id = -1)
		{

			if (id == -1)
			{
				var albums = _context.AlbumsThumb.Include(t => t.User)
                    .Where(t => t.User.UserName == User.Identity.Name)
                    .Include(t => t.Album).Skip(page * 6).Take(6).ToList();

				var json = new List<AlbumsThumbViewModel>();
				int count = albums.Count + 1 > 6 ? 6 : albums.Count;

				for (int i = 0; i < count; i++)
				{
					var item = _sourceManagerViewData.Load(albums[i]).GetViewThumbAlbum();
					json.Add(item);
				}
				return Json(json);
			}
			else
			{
				var album = _context.AlbumsThumb.Include(a => a.Album).Where(a => a.Album.ID == id).Single();
				var json = _sourceManagerViewData.Load(album).GetViewThumbAlbum();
				return Json(json);
			}
		}

		public IActionResult GetAlbumById(int albumId)
		{
			var album = _context.Albums.Where(a => a.ID == albumId)
			.Include(a => a.Artists)
			.Include(a => a.Genres)
			.Include(a => a.Styles)
			.Include(a => a.Videos)
			.Include(a => a.Images)
			.Include(a => a.Tracks)
			.ThenInclude(t => t.ExtraArtists)
			.SingleOrDefault();

			AlbumViewModel albumView = new AlbumViewModel();
			albumView.Title = album.Title;
			albumView.Artists = _sourceManagerViewData.Load(album).GetViewArtists();
			albumView.Genres = _sourceManagerViewData.GetViewGenres();
			albumView.Styles = _sourceManagerViewData.GetViewStyles();
			albumView.Videos = _sourceManagerViewData.GetViewVideos();
			albumView.Images = _sourceManagerViewData.GetViewImages();
			albumView.Tracks = _sourceManagerViewData.GetViewTracksAndExtraArtists();

			return Json(albumView);
		}

	}
}
