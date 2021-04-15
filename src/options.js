
const showList = () => {
    const parentDiv = document.getElementById('url-list')
    var table = document.createElement('table')
    table.setAttribute('cellpadding', 20)
    //table.setAttribute('class', 'url-table')
    table.style.borderColor = '#4BD865'
    table.style.borderCollapse = 'collapse'
    const tr = document.createElement('tr')
    const th1 = document.createElement('th')
    const th2 = document.createElement('th')
    th2.style.padding = '0 5px'
    const text1 = document.createTextNode('表示しないサイト')
    const text2 = document.createTextNode('削除')
    th1.appendChild(text1)
    th2.appendChild(text2)
    tr.appendChild(th1)
    tr.appendChild(th2)
    table.appendChild(tr)
    tr.style.backgroundColor = '#4BD865'
    chrome.storage.sync.get(['urlList'], (items) => {
        var blackList = items.urlList
        if (blackList) {
            blackList.map((url, index) => {
                const tr = document.createElement('tr')
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                td2.setAttribute('class', 'trash')
                const atag = document.createElement('a')
                atag.setAttribute('href', url)
                const text = document.createTextNode(url)
                if (index % 2 == 0) {
                    tr.style.backgroundColor = '#fff'
                } else {
                    tr.style.backgroundColor = '#eee'
                }
                atag.appendChild(text)
                td1.appendChild(atag)
                td2.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="padding-top: 4px; width: 20px; height: 20px; "><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>`
                td2.onclick = () => {
                    blackList.splice(index, 1)
                    chrome.storage.sync.set({ 'urlList': blackList })
                    table.remove()
                    showList()
                }
                tr.appendChild(td1)
                tr.appendChild(td2)
                table.appendChild(tr)
            })
        } 
        parentDiv.appendChild(table)
    })
}

window.onload = () => {
    showList()
}