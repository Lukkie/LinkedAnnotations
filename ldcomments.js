var comment = {
    url: '',
    title: '',
    value: ''
}

var save_location = 'https://lukasvanhoucke.databox.me/Public/comments/';
var solid = SolidClient;
var vocab = solid.vocab;

function updateContent() {
  // browser.tabs.query({windowId: myWindowId, active: true})
  //   .then((tabs) => {
  //     contentBox.textContent = tabs[0].url;
  //   });
    console.log('updating content');

    var url = 'https://lukasvanhoucke.databox.me/Public/bins/9e4545'; // temporary
    solid.web.get(url).then(function(response) {
            var graph = response.parsedGraph();
            // set url
            var subject = $rdf.sym(response.url);
            // add title
            var title = graph.any(subject, vocab.dct('title'));

            // add body
            var body = graph.any(subject, vocab.sioc('content'));

            var text = "Title: " + title + "\n\nBody: " + body;
            console.log(text);

        }).catch(function(err) {
            // do something with the error
            console.log("Received error: " + err);
        });
}

function saveComment(request) {
  console.log("Title: "  + request.title);
  console.log("Value: "  + request.value);
  console.log("Url: "  + request.url);
  comment.title = request.title;
  comment.value = request.value;
  comment.url = request.url;

  var graph = $rdf.graph();
  var thisResource = $rdf.sym('');
  graph.add(thisResource, vocab.dct('title'), $rdf.lit(request.title));
  graph.add(thisResource, vocab.sioc('content'), $rdf.lit(request.value));
  graph.add(thisResource, vocab.sioc('about'), $rdf.lit(request.url)); // THIS IS THE WRONG TERM, but which one is the right one?
  var data = new $rdf.Serializer(graph).toN3(graph);

  solid.web.post(save_location, data).then(function(meta) {
      // view
      var url = meta.url;
      if (url && url.slice(0,4) != 'http') {
          if (url.indexOf('/') === 0) {
              url = url.slice(1, url.length);
          }
          url = defaultContainer + url.slice(url.lastIndexOf('/') + 1, url.length);
      }
      console.log("Comment was saved at " + url);
  }).catch(function(err) {
      // do something with the error
      console.log(err);
  });
}

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script: " + request.function);
  switch(request.function) {
    case "updateContent": updateContent(); break;
    case "saveComment": saveComment(request); break;
    default: console.log("Warning: Don't know what to do with message.")
  }
  /*return Promise.resolve({response: "Hi from content script"});*/

});
//
// /*
// Update content when a new tab becomes active.
// */
// browser.tabs.onActivated.addListener(updateContent);
//
// /*
// Update content when a new page is loaded into a tab.
// */
// browser.tabs.onUpdated.addListener(updateContent);
//
// /*
// When the sidebar loads, get the ID of its window,
// and update its content.
// */
// browser.windows.getCurrent({populate: true}).then((windowInfo) => {
//   myWindowId = windowInfo.id;
//   updateContent();
// });
//

// document.addEventListener("mouseup", updateContent);



/*
copy the selected text to clipboard
*/
function copySelection() {
    var selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        console.log("Selected text: " + selectedText);
    }
}

/*
Add copySelection() as a listener to mouseup events.
*/
document.addEventListener("mouseup", copySelection);
