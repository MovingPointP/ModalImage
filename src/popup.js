//onoffの初期設定
const stateOnOff = () => {
    chrome.storage.sync.get(['switch'], (items) => {
        const sw = items.switch
        const toggleInput = document.getElementById('toggle-input')
        toggleInput.checked = sw
    })
}

//onoff切り替え
const changeOnOff = () => {
    chrome.storage.sync.get(['switch'], (items) => {
        const sw = items.switch
        if (sw) {
            console.log('true -> false')
            chrome.storage.sync.set({ 'switch': false })
        } else {
            console.log('false -> true')
            chrome.storage.sync.set({ 'switch': true })
        }
    })
}
//optionページを開く
const createOption = () => {
    chrome.tabs.create({ 'url': '/options.html' })
}


window.onload = () => {
    const toggleSwitch = document.getElementById('toggle-switch')
    const optionLink = document.getElementById('option-link')
    stateOnOff()

    var textbox = ''

    toggleSwitch.onclick = () => {
        changeOnOff()
        if (!textbox) {
            //textの作成
            textbox = document.createElement('p')
            const textContent = document.createTextNode('Please reload ...')
            textbox.appendChild(textContent)
            document.body.appendChild(textbox)
        }
    }

    optionLink.onclick = () => {
        createOption()
    }
}