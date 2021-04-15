const protocol = location.protocol
const host = location.host
var url = protocol + host
chrome.storage.sync.get(['urlList'], (items) => {
    var blackList = items.urlList
    if (!blackList) {
        blackList = []
    }
    blackList.push(url)
    chrome.storage.sync.set({ 'urlList': blackList })
})