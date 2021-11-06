window.onload = async () => {
  // add logo on page
  let image = document.querySelector('img');
  image.src = chrome.runtime.getURL('icons/icon128.png');

  const t = (message, args = []) => {
    return chrome.i18n.getMessage(message, args);
  };

  // internationalization
  document.querySelectorAll('[data-locale]').forEach(el => {
    el.innerText = t(el.dataset.locale);

    if ('version' in el.dataset) {
      el.innerText += ' V' + chrome.runtime.getManifest().version;
    }
  })

  let ajaxButton = document.querySelector('#ajax');
  ajaxButton.onclick = async (e) => {
    let background = await chrome.extension.getBackgroundPage();
    await background.openAjaxPage();
  }
}
