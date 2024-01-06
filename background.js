let timeInterval = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getHistory") {
    const historyItems = [];
    console.log("here", message);
    const browsingHistory = chrome.history.getAllVisits();

    for (const visit of browsingHistory) {
      const item = {
        url: visit.url,
        title: visit.title,
        date: new Date(visit.visitTime),
      };

      historyItems.push(item);
    }
    console.log("-->", historyItems);
    sendResponse({ historyItems });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startSavingHistory") {
    // Start saving history in the background script
    console.log("Received message to start saving history");

    // Send a response to acknowledge the message
    sendResponse({ message: "History saving started" });

    timeInterval.push({ startTime: new Date() });
  } else if (message.type === "pauseSavingHistory") {
    console.log("Received message to pause saving history");
    if (timeInterval.length > 0) {
      timeInterval[timeInterval.length - 1].endTime = new Date();
    }
    sendResponse({ message: "History saving paused" });
  } else if (message.type === "stopSavingHistory") {
    // Stop history saving in the background script
    let history = [];
    console.log("Received message to stop saving history", timeInterval);
    for (let i = 0; i < timeInterval.length; i++) {
      let x = Math.floor(timeInterval[i].startTime.getTime());
      let y = Math.floor(timeInterval[i].endTime.getTime());
      chrome.history.search(
        {
          text: "",
          startTime: x,
          endTime: y,
        },
        function (historyItems) {
          chrome.storage.local.set({ history: historyItems });
          sendResponse({
            message: "History saving stopped",
            data: historyItems,
          });
        }
      );
    }
    return true;
  }
});
