using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Net;
using Newtonsoft.Json.Linq;

namespace SLB_REST.Models
{
    public class DiscogsClientModel
    {
		public DiscogsClientModel()
		{
			Key = "HfsyysppxnrCYpIttoYY";
			Secret = "hIuWlIIOvzhnINezvqJCeRJgeWYYNsNw";
			MyStringWebResource = "https://api.discogs.com";
			Query = new string[] { };
            ResultPerPage = 6;
        }

        public DiscogsClientModel(int resultPerPage)
        {
            Key = "HfsyysppxnrCYpIttoYY";
            Secret = "hIuWlIIOvzhnINezvqJCeRJgeWYYNsNw";
            MyStringWebResource = "https://api.discogs.com";
            Query = new string[] { };
            ResultPerPage = resultPerPage;
        }

        public DiscogsClientModel(string key, string secret)
		{
			MyStringWebResource = "https://api.discogs.com";
			Query = new string[] { };
			Key = key;
			Secret = secret;
            ResultPerPage = 6;

        }

		public string MyStringWebResource { get; private set; }
		public string[] Query { get; private set; }
		public string Get { get; private set; }
		public string Link { get; private set; }
		public string Key { get; private set; }
		public string Secret { get; private set; }
        public int ResultPerPage { get; private set; }



        public DiscogsClientModel SetQuery(string[] query)
		{
			try
			{
				if (string.IsNullOrEmpty(query[0])) throw new Exception("Wrong format query");
				Query = query;
				return this;
			}
			catch (Exception e)
			{
				Debug.WriteLine("DiscogsClientModel error: " + e.Message);
				return this;
			}
		}

		public DiscogsClientModel SetLink(string link)
		{
			try
			{
				if (string.IsNullOrEmpty(link)) throw new Exception("Wrong format link");

				Link = link;
				return this;
			}
			catch (Exception e)
			{
				Debug.WriteLine("DiscogsClientModel error: " + e.Message);
				return this;
			}
		}

		public string SearchJsonByQuery()
		{
			string result;
			try
			{
				if (string.IsNullOrEmpty(Query[0])) throw new Exception("No Query, use SetQuery()");

				if (Query.Length == 1)
				{
					Get = "/database/search?q={" + Query[0].Trim() + "}&per_page=" + ResultPerPage;
				}
				else
				{
					Get = "/database/search?q={" + Query[0].Trim() + "}&{?";

					for(int i = 1; i < Query.Length; i++)
					{
						Get += Query[i].Trim();
						if (i < Query.Length - 1) Get += ",";
						else Get += "}&per_page=" + ResultPerPage;
					}
				}

				MyStringWebResource = MyStringWebResource + Get;

				using (WebClient client = new WebClient())
				{
					client.Headers.Add("User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)");
					client.Headers.Add("Content-Type", "application/json");
					client.Headers.Add($"Authorization: Discogs key={Key}, secret={Secret}");

					client.UseDefaultCredentials = true;

					result = client.DownloadString(MyStringWebResource);
				}

				return result;

			}
			catch (WebException e)
			{
				Debug.WriteLine("DiscogsClientModel error: " + e.Message);
				return null;
			}
			catch (Exception e)
			{
				Debug.WriteLine("DiscogsClientModel error: " + e.Message);
				return null;
			}

		}

		public string GetJsonByLink()
		{
			string result;
			try
			{
				if (string.IsNullOrEmpty(Link)) throw new Exception("No Link, use SetLink()");

				using (WebClient client = new WebClient())
				{
					client.Headers.Add("User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)");
					client.Headers.Add("Content-Type", "application/json");
					client.Headers.Add($"Authorization: Discogs key={Key}, secret={Secret}");

					client.UseDefaultCredentials = true;

					result = client.DownloadString(Link);
				}
				return result;
			}
			catch (WebException e)
			{
				Debug.WriteLine("DiscogsClientModel error: " + e.Message);
				return "";
			}
			catch (Exception e)
			{
				Debug.WriteLine("DiscogsClientModel error: " + e.Message);
				return "";
			}
		}
	}
}
