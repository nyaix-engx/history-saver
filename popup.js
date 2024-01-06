const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
const historyList = document.getElementById("historyList");
const historyItemsUl = document.getElementById("historyItems");

// const updateHistoryList = (historyItems) => {
//   historyItemsUl.innerHTML = '';

//   for (const item of historyItems) {
//     const historyItemLi = document.createElement('li');
//     const url = document.createElement('a');
//     url.href = item.url;
//     url.textContent = item.url;

//     const title = document.createElement('span');
//     title.textContent = ` (${item.title})`;

//     const date = document.createElement('small');
//     date.textContent = ` - ${item.date.toLocaleString()}`;

//     historyItemLi.appendChild(url);
//     historyItemLi.appendChild(title);
//     historyItemLi.appendChild(date);

//     historyItemsUl.appendChild(historyItemLi);
//   }
// };

playButton.addEventListener("click", () => {
  console.log("here");
  chrome.runtime.sendMessage({ type: "startSavingHistory" });
});

pauseButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "pauseSavingHistory" });
});

stopButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "stopSavingHistory" }, (data) => {
    console.log("Data", data);
  });
  historyList.innerHTML = "";
});

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.type === 'historyUpdated') {
//     updateHistoryList(message.historyItems);
//   }
// });
