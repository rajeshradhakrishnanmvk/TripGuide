namespace hippocampus.HttpClient
{

	public class CustomHttpMessageHandler : HttpClientHandler
	{
		public string CustomLLMUrl { get; set; }
		
		public string[] UrlsToAvoid { get; set;} = { "api.openai.com", "openai.azure.com" };

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.RequestUri != null && UrlsToAvoid.Contains(request.RequestUri.Host))
            {
                request.RequestUri = new Uri($"{CustomLLMUrl}{request.RequestUri.PathAndQuery}");
            }
            return base.SendAsync(request, cancellationToken);
        }


	}

}