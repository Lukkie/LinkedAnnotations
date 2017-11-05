/* initialise variables */
var show_button = document.querySelector('#show');
var save_button = document.querySelector('#save');

var title_field = document.querySelector('#title')
var value_field = document.querySelector('#value')
// var bgBtns = document.querySelectorAll('.bg-container button');

var colorPick = document.querySelector('input');

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

window.addEventListener("message", function(event) {
  console.log("Message: " + event.data);
});

function onError(error) {
  console.log("Error: " + error);
}


show_button.addEventListener('click', function() {
  console.log("Updating Content");
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(function(tabs) {
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        {function: "updateContent"}
      )/*.then(response => {
        console.log("Message from the content script:");
        console.log(response.response);
      })*/.catch(onError);
    }
  }).catch(onError);
});

save_button.addEventListener('click', function() {
  if (title_field && value_field && title_field.value && value_field.value) {
    console.log("Saving comment");
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(function(tabs) {
      for (let tab of tabs) {
        browser.tabs.sendMessage(
          tab.id,
          {
            function: "saveComment",
            title: title_field.value,
            value: value_field.value,
            url: tab.url
          }
        )/*.then(response => {
          console.log("Message from the content script:");
          console.log(response.response);
        })*/.catch(onError);
      }
    }).catch(onError);
  } else {
    console.log("Could not save: some fields are empty");
  }
});





// for(var i = 0; i < bgBtns.length; i++) {
//   var imgName = bgBtns[i].getAttribute('class');
//   var bgImg = 'url(\'images/' + imgName + '.png\')';
//   bgBtns[i].style.backgroundImage = bgImg;
//
//   bgBtns[i].onclick = function(e) {
//     getActiveTab().then((tabs) => {
//       var imgName = e.target.getAttribute('class');
//       var fullURL = browser.extension.getURL('popup/images/'+ imgName + '.png');
//       browser.tabs.sendMessage(tabs[0].id, {image: fullURL});
//
//       cookieVal.image = fullURL;
//       browser.cookies.set({
//         url: tabs[0].url,
//         name: "bgpicker",
//         value: JSON.stringify(cookieVal)
//       })
//     });
//   }
// }

/* apply chosen color to HTML background */

// colorPick.onchange = function(e) {
//   getActiveTab().then((tabs) => {
//     var currColor = e.target.value;
//     browser.tabs.sendMessage(tabs[0].id, {color: currColor});
//
//     cookieVal.color = currColor;
//     browser.cookies.set({
//       url: tabs[0].url,
//       name: "bgpicker",
//       value: JSON.stringify(cookieVal)
//     })
//   });
// }
//
// /* reset background */
//
// reset.onclick = function() {
//   getActiveTab().then((tabs) => {
//     browser.tabs.sendMessage(tabs[0].id, {reset: true});
//
//     cookieVal = { image : '',
//                   color : '' };
//     browser.cookies.remove({
//       url: tabs[0].url,
//       name: "bgpicker"
//     })
//   });
// }
//
// /* Report cookie changes to the console */
//
// browser.cookies.onChanged.addListener((changeInfo) => {
//   console.log(`Cookie changed:\n
//               * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
//               * Cause: ${changeInfo.cause}\n
//               * Removed: ${changeInfo.removed}`);
// });
