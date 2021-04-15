//インストール後に実行
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set(
        {'switch': true }
    )

    const parent_menu = chrome.contextMenus.create({
        type: 'normal',
        id: 'parent',
        title: 'ModalImage'
    })

    chrome.contextMenus.create({
        id: 'set-url',
        parentId: parent_menu,
        title: 'モーダルを表示しないサイトに設定'
    })

    chrome.contextMenus.create({
        id: 'option-page',
        parentId: parent_menu,
        title: 'optionページへ'
    })
})

//menuを押して実行
chrome.contextMenus.onClicked.addListener((item) => {
    if (item.menuItemId == 'set-url') {
        chrome.tabs.executeScript({
            file: "/seturl.js"
        })
    }

    if (item.menuItemId == 'option-page') {
        chrome.tabs.create({ 'url': '/options.html' })
    }
})
