// running_script_tab_ids = [];
//
// // Make sure script runs only once per tab.
// browser.browserAction.onClicked.addListener(function(activeTab) {
//   if (running_script_tab_ids.indexOf(activeTab.id) < 0) {
//     console.log(JSON.stringify(activeTab.id));
//     browser.tabs.executeScript(null, {file: "solid-client.js"});
//     browser.tabs.executeScript(null, {file: "rdflib-0.12.2.min.js"});
//     browser.tabs.executeScript(null, {file: "ldcomments.js"});
//     running_script_tab_ids.push(activeTab.id);
//     console.log('Clicked on: ' + activeTab.id)
//   }
// });
//
// // Cleanup function, not necessarily required.
// browser.tabs.onRemoved.addListener(function(tabId, removeInfo) {
//   console.log("Tab: " + tabId + " is closing");
//   var index = running_script_tab_ids.indexOf(tabId);
//   if (index > -1) {
//     running_script_tab_ids.splice(index, 1);
//   }
// });



// Make sure script runs only once per tab.
browser.browserAction.onClicked.addListener(function(activeTab) {
    // browser.tabs.executeScript(null, {file: "solid-client.js"});
    // browser.tabs.executeScript(null, {file: "rdflib-0.12.2.min.js"});
    browser.tabs.executeScript(null, {file: "ldcomments.js"}); // Might introduce race condition if previous lines are executed.
});
