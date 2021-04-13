const addList = () => {
    const url = []
    url.push('htttps:twitter')
    url.push('https:youtube')
    chrome.storage.sync.set({ 'urlList': url })
}

const showList = () => {
    const parentDiv = document.getElementById('url-list')
    var table = document.createElement('table')
    const th = document.createElement('th')
    const text = document.createTextNode('表示しないサイト')
    th.appendChild(text)
    table.appendChild(th)
    chrome.storage.sync.get(['urlList'], (items) => {
        const blakList = items.urlList
        blakList.map((url, index) => {
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            const text = document.createTextNode(url)
            if (index % 2 == 0) {
                tr.style.color = 'green'
            }
            td.appendChild(text)
            tr.appendChild(td)
            table.appendChild(tr)
        })
        parentDiv.appendChild(table)
    })
}

window.onload = () => {
    addList()
    showList()
}