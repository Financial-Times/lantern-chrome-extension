// Only add the extension to the ft.com site
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: 'www.ft.com'
          }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// Sets up the inital click handler on the lantern icon
chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    // Fires an event that the content.js file listens to so it can grab the uuid
    // and then respond to the Listener below - document is only available in the
    // content js file
    chrome.tabs.sendMessage(activeTab.id, {"message": "lantern_click"});
  });
});

// Listens to the content.js event to get the new URL and redirect to a new tab
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_lantern" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);