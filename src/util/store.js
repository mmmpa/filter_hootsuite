class Store {
  // value:Set
  saveIgnoreSet(value, callback = () => null) {
    chrome.storage.local.set({'ignoreList': [...value]}, callback)
  }

  loadIgnoreSet(callback) {
    chrome.storage.local.get('ignoreList', (value) => {
      callback(new Set(value.ignoreList || []))
    });
  }
}

export const store = new Store();