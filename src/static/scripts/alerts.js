if (sessionStorage.getItem('blockAlerts') === 'true') {
  window.alert = function () {};
  window.confirm = function () {
    return true;
  };
  window.prompt = function () {
    return null;
  };

  window.addEventListener('load', () => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('iframe').forEach((iframe) => {
        try {
          if (iframe.contentWindow && iframe.contentWindow.alert !== window.alert) {
            iframe.contentWindow.alert = function () {};
            iframe.contentWindow.confirm = function () {
              return true;
            };
            iframe.contentWindow.prompt = function () {
              return null;
            };
          }
        } catch {
          // comment here just for vscode b/c it thinks there's an error
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}
