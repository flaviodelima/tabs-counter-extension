const API_URL = '<some_api_url>';

const ALARM_INTERVAL_MINUTES = 0.5;

function main() {
    chrome.tabs.query({}, async tabs => {
        const tabCount = tabs.length;
        const dateTime = new Date().toISOString();
        const data = {tabCount, dateTime};

        await sendData(data);
    });
}

async function sendData(data) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error, data));
}

chrome.alarms.create('tabCounter', {
  periodInMinutes: ALARM_INTERVAL_MINUTES
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'tabCounter') {
    main();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  main();
});
