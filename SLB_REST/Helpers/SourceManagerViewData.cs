using SLB_REST.Models;
using SLB_REST.Models.Albums;
using SLB_REST.Models.ViewAlbums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Helpers
{
	public class SourceManagerViewData
	{
		private AlbumThumbModel _albumThumb;
		private AlbumModel _album;

		public SourceManagerViewData Load(AlbumThumbModel albumThumb)
		{
			_albumThumb = albumThumb;
			return this;
		}

		public SourceManagerViewData Load(AlbumModel album)
		{
			_album = album;
			return this;
		}


		public AlbumsThumbViewModel GetViewThumbAlbum()
		{
			var albumView = new AlbumsThumbViewModel();
			albumView.AlbumId = _albumThumb.Album.ID;
			albumView.ArtistName = _albumThumb.ArtistName;
			albumView.Genres = _albumThumb.Genres;
			albumView.Style = _albumThumb.Style;
			albumView.Title = _albumThumb.Title;
			albumView.ImageThumbSrc = _albumThumb.ImageThumbSrc;

			return albumView;
		}

		public List<ArtistViewModel> GetViewArtists()
		{
			List<ArtistViewModel> artists = new List<ArtistViewModel>();

			foreach (var artist in _album.Artists)
			{
				ArtistViewModel art = new ArtistViewModel();
				art.Name = artist.Name;
				artists.Add(art);
			}

			return artists;
		}

		public List<GenreViewModel> GetViewGenres()
		{
			List<GenreViewModel> genres = new List<GenreViewModel>();

			foreach (var genre in _album.Genres)
			{
				GenreViewModel gen = new GenreViewModel();
				gen.Genre = genre.Genre;
				genres.Add(gen);
			}

			return genres;
		}

		public List<StyleViewModel> GetViewStyles()
		{
			List<StyleViewModel> styles = new List<StyleViewModel>();

			foreach (var style in _album.Styles)
			{
				StyleViewModel sty = new StyleViewModel();
				sty.Style = style.Style;
				styles.Add(sty);
			}

			return styles;
		}

		public List<VideoViewModel> GetViewVideos()
		{
			List<VideoViewModel> videos = new List<VideoViewModel>();

			foreach (var video in _album.Videos)
			{
				VideoViewModel vid = new VideoViewModel();
				vid.Uri = video.Uri;
				vid.Description = video.Description;

				videos.Add(vid);
			}

			return videos;
		}

		public List<ImageViewModel> GetViewImages()
		{
			List<ImageViewModel> images = new List<ImageViewModel>();

			foreach (var image in _album.Images)
			{
				ImageViewModel img = new ImageViewModel();
				img.Uri = image.Uri;

				images.Add(img);
			}

			return images;
		}

		public List<TrackViewModel> GetViewTracksAndExtraArtists()
		{
			List<TrackViewModel> tracks = new List<TrackViewModel>();
			

			foreach (var track in _album.Tracks)
			{
				TrackViewModel tra = new TrackViewModel();
				tra.Title = track.Title;
				tra.Duration = track.Duration;
				tra.Position = track.Position;
				tra.ExtraArtists = new List<ExtraArtistViewModel>();

				foreach(var artist in track.ExtraArtists)
				{
					var art = new ExtraArtistViewModel();
					art.Name = artist.Name;
					tra.ExtraArtists.Add(art);
				}

				tracks.Add(tra);
			}

			return tracks;
		}
	}
}
