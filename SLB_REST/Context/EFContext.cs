using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SLB_REST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLB_REST.Context
{
	public class EFContext : IdentityDbContext<UserModel, IdentityRole<int>, int>
	{
		public EFContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<UserModel> Users { get; set; }
		public DbSet<AlbumModel> Albums { get; set; }
		public DbSet<AlbumThumbModel> AlbumsThumb { get; set; }
		public DbSet<ArtistModel> Artists { get; set; }
		public DbSet<ExtraArtistModel> ExtraArtists { get; set; }
		public DbSet<ImageModel> Images { get; set; }
		public DbSet<TrackModel> Tracks { get; set; }
		public DbSet<VideoModel> Videos { get; set; }
		public DbSet<StyleModel> Styles { get; set; }
		public DbSet<GenreModel> Genres { get; set; }


	}
}
