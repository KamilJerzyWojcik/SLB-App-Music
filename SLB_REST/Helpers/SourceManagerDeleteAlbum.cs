using Microsoft.EntityFrameworkCore;
using SLB_REST.Context;
using SLB_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Helpers
{
    public class SourceManagerDeleteAlbum
    {
        private EFContext _context;

        public SourceManagerDeleteAlbum(EFContext context)
        {
            _context = context;
        }


        public List<GenreModel> GetTrimedGenres(string genres)
        {
            string[] genTab = genres.Split(",");
            var geList = new List<GenreModel>();

            for (int i = 0; i < genTab.Length; i++)
            {
                var ge = new GenreModel();
                ge.Genre = genTab[i].Trim();
                geList.Add(ge);
            }

            return geList;
        }

        public void deleteOldGenres()
        {
            var oldGenres = _context.Genres.Include(g => g.Album).Where(g => g.Album.ID == null).ToList();
            foreach (var old in oldGenres)
            {
                _context.Genres.Remove(old);
                _context.SaveChanges();
            }
        }


        public List<StyleModel> GetTrimedStyles(string styles)
        {
            string[] styTab = styles.Split(",");
            var styList = new List<StyleModel>();

            for (int i = 0; i < styTab.Length; i++)
            {
                var st = new StyleModel();
                st.Style = styTab[i].Trim();
                styList.Add(st);
            }

            return styList;
        }

        public void DeleteOldStyles()
        {
            var oldStyles = _context.Styles.Include(g => g.Album).Where(g => g.Album.ID == null).ToList();
            foreach (var old in oldStyles)
            {
                _context.Styles.Remove(old);
                _context.SaveChanges();
            }
        }

        public List<ArtistModel> GetTrimedArtists(string artists)
        {
            string[] styTab = artists.Split(",");
            var artList = new List<ArtistModel>();

            for (int i = 0; i < styTab.Length; i++)
            {
                var ar = new ArtistModel();
                ar.Name = styTab[i].Trim();
                artList.Add(ar);
            }

            return artList;
        }

        public void DeleteOldArtists()
        {
            var oldArtists = _context.Artists.Include(g => g.Album).Where(g => g.Album.ID == null).ToList();
            foreach (var old in oldArtists)
            {
                _context.Artists.Remove(old);
                _context.SaveChanges();
            }
        }

        public AlbumModel AddImageToModel(AlbumModel albumWithImages, string image)
        {
            ImageModel img = new ImageModel();
            img.Uri = image;
            albumWithImages.Images.Add(img);

            return albumWithImages;
        }

        public AlbumModel AddImageToEdit(AlbumModel albumWithImages, int idList, string image)
        {
            int i = 0;
            foreach (var img in albumWithImages.Images)
            {
                if (i == idList) img.Uri = image;
                i++;
            }

            return albumWithImages;
        }

        public string DeleteImageUri(AlbumModel albumWithImages, int idList)
        {
            int i = 0;
            string uri = "";
            foreach (var img in albumWithImages.Images)
            {
                if (i == idList) uri = img.Uri;
                i++;
            }

            return uri;
        }

        public AlbumModel AddVideo(AlbumModel albumWithVideos, string description, string source)
        {
            VideoModel video = new VideoModel();
            video.Description = description;
            video.Uri = source;
            albumWithVideos.Videos.Add(video);

            return albumWithVideos;
        }

        public string DeleteVideoUri(AlbumModel albumWithVideos, int idList)
        {
            int i = 0;
            string videoUri = "";
            foreach (var video in albumWithVideos.Videos)
            {
                if (i == idList) videoUri = video.Uri;
                i++;
            }

            return videoUri;
        }

        public AlbumModel EditVideoUri(AlbumModel albumWithVideos, string description, string source, int idList)
        {
            int i = 0;
            foreach (var video in albumWithVideos.Videos)
            {
                if (i == idList)
                {
                    video.Description = description;
                    video.Uri = source;
                }
                i++;
            }

            return albumWithVideos;
        }

        public AlbumThumbModel AddThumbData(AlbumThumbModel albumThumb, string[] data)
        {
            albumThumb.ImageThumbSrc = data[0];
            albumThumb.ArtistName = data[1];
            albumThumb.Genres = data[2];
            albumThumb.Style = data[3];

            return albumThumb;
        }


        public void DeleteAlbumArtists(List<ArtistModel> artists)
        {
            ArtistModel beforeArtist = new ArtistModel();
            foreach (var artist in artists)
            {
                if (artist != beforeArtist)
                    _context.Artists.Remove(artist);
                beforeArtist = artist;
            }
        }

        public void DeleteAlbumTracksAndExtraartists(List<TrackModel> tracks)
        {
            foreach (var track in tracks)
            {
                var extraartists = _context.ExtraArtists
                .Include(e => e.Track)
                .Where(e => e.Track.ID == track.ID).ToList();

                ExtraArtistModel beforeExtraArtist = new ExtraArtistModel();
                foreach (var extraartist in extraartists)
                {
                    if (extraartist != beforeExtraArtist)
                        _context.ExtraArtists.Remove(extraartist);
                    beforeExtraArtist = extraartist;
                }
            }
            TrackModel beforeTrack = new TrackModel();
            foreach (var track in tracks)
            {
                if (track != beforeTrack)
                    _context.Tracks.Remove(track);
                beforeTrack = track;
            }
        }

        public void DeleteAlbumGenres(List<GenreModel> genres)
        {
            GenreModel beforeGenre = new GenreModel();
            foreach (var genre in genres)
            {
                if (genre != beforeGenre)
                    _context.Genres.Remove(genre);
                beforeGenre = genre;
            }
        }

        public void DeleteAlbumStyles(List<StyleModel> styles)
        {
            StyleModel beforeStyle = new StyleModel();
            foreach (var style in styles)
            {
                if (style != beforeStyle)
                    _context.Styles.Remove(style);
                beforeStyle = style;
            }
        }

        public void DeleteAlbumVideos(List<VideoModel> videos)
        {
            foreach (var video in videos)
                _context.Videos.Remove(video);
        }

        public void DeleteAlbumImages(List<ImageModel> images)
        {
            foreach (var image in images)
                _context.Images.Remove(image);
        }
    }

}
