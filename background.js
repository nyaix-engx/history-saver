let timeInterval=[];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getHistory') {
      const historyItems = [];
      console.log("here",message)
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

      timeInterval.push({startTime:new Date()})
  
      // Schedule a timer to send updates to the content script
      // const updateInterval = 1000; // Update every second

      // setInterval(() => {
      //   const historyItems = [];
      //   console.log("here",chrome.history)
      //   const browsingHistory = chrome.history.getVisits();
      //   for (const visit of browsingHistory) {
      //       const item = {
      //       url: visit.url,
      //       title: visit.title,
      //       date: new Date(visit.visitTime)
      //       };
    
      //       historyItems.push(item);
      //   }
      //   console.log("-->",historyItems)
      //   chrome.runtime.sendMessage({ type: 'historyUpdated', historyItems: message.historyItems });
      // }, updateInterval);
    } else if (message.type === 'pauseSavingHistory') {
      // Pause history saving in the background script
      console.log('Received message to pause saving history');
      if(timeInterval.length>0){
        timeInterval[timeInterval.length-1].endTime= new Date()
      }
      // Send a response to acknowledge the message
      sendResponse({ message: 'History saving paused' });
  
      // Clear the update interval
      // clearInterval(updateInterval);
    } else if (message.type === 'stopSavingHistory') {
      // Stop history saving in the background script
      console.log('Received message to stop saving history', timeInterval);
      for(let i=0;i<timeInterval.length;i++){
        let x=Math.floor(timeInterval[i].startTime.getTime())
        let y=Math.floor(timeInterval[i].endTime.getTime())
        console.log("x",x)
        console.log("y",y)
        chrome.history.search({
          text:'',
          startTime: x,
          endTime: y
        },
        function(historyItems){
          console.log("--->",historyItems)
        }
        )
      }
      
      // Send a response to acknowledge the message
      sendResponse({ message: 'History saving stopped' });
  
      // Clear the update interval
      // clearInterval(updateInterval);
    }
  });