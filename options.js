function save_options(){
  var openOption = document.getElementById('open-where').value
  var useURI = true
  if(openOption == "1"){
    var useURI = false
  }
  chrome.storage.local.set({
    useURI: useURI
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.local.get({
    useURI: true
  }, function(items) {
    document.getElementById('open-where').value = "" + +!items.useURI; //dirty butt fun ;)
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click',
  save_options);