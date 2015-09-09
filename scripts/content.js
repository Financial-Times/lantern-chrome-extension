// Listen for the latern icon click event
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "lantern_click" ) {
      // Get the article UUID
      var uuid = document.getElementsByTagName("body")[0].getAttribute("data-article-uid");
      var redirectURL = 'https://lantern.ft.com/';

      if (uuid) {
        redirectURL += 'articles/' + uuid;
      }

      // Fire event with new redirect URL as param
      chrome.runtime.sendMessage({"message": "open_lantern", "url": redirectURL});
    }
  }
);