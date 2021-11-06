let tabIds = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case MESSAGE_INIT_BACKGROUND:

      chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT },
        tabs => {
          for (const i in tabs) {
            const prefix = isToriUrl(tabs[i].url);
            if (!tabIds.includes(tabs[i].id) && prefix) {
              tabIds.push(tabs[i].id);
              updateTitle(tabs[i].id, `[${prefix}]`, true);
            }
          }
        });

      // add tab change listener
      chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
        const prefix = isToriUrl(tab.url);

        // update title
        if (prefix && 'title' in changeInfo) {
          if (changeInfo.title.substr(0, prefix.length + 2) != `[${prefix}]`) {
            updateTitle(tabId, `'[${prefix}] ${changeInfo.title}'`);
          }
        }


        // update icon
        if (prefix) {
          chrome.browserAction.enable(tab.id, () => {
            chrome.browserAction.setIcon({tabId: tab.id, path: 'icons/icon48.png'});
          });
        } else {
          chrome.browserAction.disable(tab.id, () => {
            chrome.browserAction.setIcon({tabId: tab.id, path: 'icons/icon48-off.png'});
          });
        }
      });

      break;
  }

  return true;
});

function openAjaxPage() {
  getActiveTab().then((tab) => {
    let url = tab.url, urlData = new URL(url);

    url += urlData.search.length > 0 ? '&' : '?';
    url += 'isAjax=1';

    chrome.tabs.create({ url: url });
  });
}

function getActiveTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

function updateTitle(tabId, title, prepend = false) {
  if (prepend) {
    chrome.tabs.executeScript(tabId, { code: `if (document.title.substr(0, '${title}'.length) != '${title}') document.title = '${title} ' + document.title` });
  } else {
    chrome.tabs.executeScript(tabId, { code: `document.title = ${title}` });
  }
}

function isToriUrl(url) {
  let result = false;

  // is correct url
  if (url.substr(0, 4) === 'http') {
    const obj = new URL(url);

    // equal
    Object.keys(domains).forEach(domain => {
      if (!result) {
        if (obj.host == domain) {
          result = domains[domain].toUpperCase();
        }
      }
    });

    // regexp
    if (!result) {
      Object.keys(domainsRegexp).forEach(prefix => {
        if (!result) {
          const re = domainsRegexp[prefix];
          if (re.test(obj.host)) {
            result = prefix.toUpperCase();
          }
        }
      });
    }
  }

  return result;
}
