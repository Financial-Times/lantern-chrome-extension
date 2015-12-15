// Listen for the latern icon click event
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "lantern_click" ) {
      var uuid;
      var redirectURL = 'https://lantern.ft.com/';
      var host = window.location.host;

      // Check the host - ft.com and next have different article identifiers
      if (host === 'www.ft.com') {
        uuid = document.getElementsByTagName("body")[0].getAttribute("data-article-uid");
      }
      else if (host === 'next.ft.com') {
        var pageType = document.getElementsByTagName("html")[0].getAttribute("data-next-app");
        if(pageType === 'article'){
          uuid = document.getElementsByTagName("article")[0].getAttribute("data-content-id");
        }
      }

      if (uuid) {
        redirectURL += 'landing/article/' + uuid;
      }

      // Fire event with new redirect URL as param
      chrome.runtime.sendMessage({"message": "open_lantern", "url": redirectURL});
    }
  }
);