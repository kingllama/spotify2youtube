//on youtube, log youtube.
//register on youtube

var getSong = function(){
  var video = document.title;
  var song = video.replace(/(\(.*\))*(\[.*\])*( - YouTube$)/,'');
  console.log("WE ARE WATCHING: " + song);
};

var addButton = function(){
  var img = chrome.extension.getURL("spotifylogo.png")
  var button = ('<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-has-icon no-icon-markup yt-uix-tooltip" type="button" title="spotify" data-tooltip-text="Play On Spotify"><img id="spotify-button-logo" src='+ img +'><span class="yt-uix-button-content">Spotify</span></button>')
  $(button).appendTo("#watch8-secondary-actions")
};

// var getVideo = function(o){
//   chrome.tabs.executeScript(
//   { 
//     code: "document.title"
//   }, function(result){
//     getSong(result[0]);
//   });
// }
function afterNavigate() {
    if (location.pathname === '/watch') {
      getSong();
      addButton();
    }
};

(document.body || document.documentElement).addEventListener('transitionend',
  function(event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);

afterNavigate();