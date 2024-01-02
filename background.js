chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getHistory') {
      const historyItems = [];
      console.log("here")
      const browsingHistory = chrome.history.getAllVisits();
  
      for (const visit of browsingHistory) {
        const item = {
          url: visit.url,
          title: visit.title,
          date: new Date(visit.visitTime)
        };
  
        historyItems.push(item);
      }
      console.log('-->',historyItems)
      sendResponse({ historyItems });
    }
  });
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'startSavingHistory') {
      // Start saving history in the background script
      console.log('Received message to start saving history');
  
      // Send a response to acknowledge the message
      sendResponse({ message: 'History saving started' });
  
      // Schedule a timer to send updates to the content script
      const updateInterval = 1000; // Update every second
      setInterval(() => {
        const historyItems = [];
        console.log("here")
        const browsingHistory = chrome.history.getAllVisits();
    
        for (const visit of browsingHistory) {
            const item = {
            url: visit.url,
            title: visit.title,
            date: new Date(visit.visitTime)
            };
    
            historyItems.push(item);
        }
        console.log("-->",historyItems)
        chrome.runtime.sendMessage({ type: 'historyUpdated', historyItems: message.historyItems });
      }, updateInterval);
    } else if (message.type === 'pauseSavingHistory') {
      // Pause history saving in the background script
      console.log('Received message to pause saving history');
  
      // Send a response to acknowledge the message
      sendResponse({ message: 'History saving paused' });
  
      // Clear the update interval
      clearInterval(updateInterval);
    } else if (message.type === 'stopSavingHistory') {
      // Stop history saving in the background script
      console.log('Received message to stop saving history');
  
      // Send a response to acknowledge the message
      sendResponse({ message: 'History saving stopped' });
  
      // Clear the update interval
      clearInterval(updateInterval);
    }
  });