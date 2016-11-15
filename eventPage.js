
var getSong = function(){
  var video = document.title;
  var song = video.replace(/(\(.*\))|\;|\/|\?|\:|\@|\=|\+|\$|\,|\'|(\[.*\])|( - YouTube$)/g,'').split(' ').join('+').replace(/\&/g,'and');
  $.get("https://api.spotify.com/v1/search?q=" + song + "&type=track&limit=1", function(data){
      var foundItem = data.tracks.items[0]
      var songLink = false
      chrome.storage.local.get({
        useURI: true
      }, function(items) {
        if(items.useURI){
          songLink = foundItem.uri
        } else {
          songLink = foundItem.external_urls.spotify
        }

        if(songLink){
          var songTitle = foundItem.artists[0].name + " - " + foundItem.name
          addButton(songLink, songTitle);
        }
      })
  })
};

var addButton = function(songLink, songTitle){
  $("#spotifyLink").remove()
  var img = chrome.extension.getURL("spotifylogo.png")
  var button = ('<a id="spotifyLink" href="'+ songLink + '"><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-has-icon no-icon-markup yt-uix-tooltip" type="button" title="spotify" data-tooltip-text="Play On Spotify: '+ songTitle + '"><img id="spotify-button-logo" src='+ img +'><span class="yt-uix-button-content">Spotify</span></button></a>');
  $(button).appendTo("#watch8-secondary-actions");
  $('#spotifyLink').on("click", function(event){
    $(".ytp-play-button").trigger("click");
  });
};

function afterNavigate() {
    if (location.pathname === '/watch') {
      getSong();
    }
};

(document.body || document.documentElement).addEventListener('transitionend',
  function(event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);

afterNavigate();