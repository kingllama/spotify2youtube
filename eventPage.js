
var getSong = function(){
  var video = document.title;
  var song = video.replace(/(\(.*\))|\;|\/|\?|\:|\@|\=|\+|\$|\,|\'|(\[.*\])|( - YouTube$)/g,'').split(' ').join('+').replace(/\&/g,'and');
  $.get(
    "https://api.spotify.com/v1/search?q="+ song + "&type=track", function(data){
      var songUri = data.tracks.items[0].uri
      if(songUri){
        addButton(songUri);
      }
  })
};

var addButton = function(songUri){
  var img = chrome.extension.getURL("spotifylogo.png")
  var button = ('<a id="spotifyLink" href="'+ songUri + '"><button class="yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-has-icon no-icon-markup yt-uix-tooltip" type="button" title="spotify" data-tooltip-text="Play On Spotify"><img id="spotify-button-logo" src='+ img +'><span class="yt-uix-button-content">Spotify</span></button></a>')
  $(button).appendTo("#watch8-secondary-actions");
  $('#spotifyLink').on("click", function(event){
    $(".ytp-button-pause").trigger("click");
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