// Listen for the latern icon click event
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    function getFalconUUID(){
      return document.getElementsByTagName("body")[0].getAttribute("data-article-uid");
    }
    function isNextArticlePage(){
      return (typeof document.getElementsByTagName("article")[0] !== 'undefined');
    }
    function getNextUUID(){
      return document.getElementsByTagName("article")[0].getAttribute("data-content-id");
    }
    if( request.message === "lantern_click" ) {
      var redirectURL = 'https://lantern.ft.com/';
      var host = window.location.host;

      var uuid = getFalconUUID();
      if (typeof uuid !== 'string' && isNextArticlePage) {
        uuid = getNextUUID();
      }

      if (uuid) {
        redirectURL += 'landing/article/' + uuid;
      }

      // Fire event with new redirect URL as param
      chrome.runtime.sendMessage({"message": "open_lantern", "url": redirectURL});
    }
  }
);