chrome.runtime.sendMessage({ message: MESSAGE_INIT_BACKGROUND }, async response => {

});

// tab changed listener
chrome.runtime.onMessage.addListener(async (response, sender, respond) => {
  // eslint-disable-next-line default-case
  switch (response.message) {
    // eslint-disable-next-line no-undef
    case MESSAGE_TAB_CHANGED:
      respond(true);

      break;
  }
});
