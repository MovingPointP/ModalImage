/*
TODO
画像の拡大機能
サイトごとのcssによるずれ
モーダルサイズ
*/

//画像の左上に表示するbuttonの作成
const createButton = () => {
    button = document.createElement('div')
    button.setAttribute('class', 'modal-button-ex')

    //textの作成
    const textContent = document.createTextNode('Pop')
    button.appendChild(textContent)

    //cssの設定
    const buttonElem = button.style
    const buttonStyle = {
        position: 'absolute',
        color: 'white',
        background: 'black',
        top: '0px',
        left: '0px',
        zIndex: '1000000',
        display: 'none',
        opacity: '0.5',
        padding: '3px 4px 4px' ,
        borderRadius: '7px',
        fontSize: '12px',
        fontFamily: "serif",
        //width: '40px',
        //height: '30px'
    }
    for (let props in buttonStyle) {
        buttonElem[props] = buttonStyle[props]
    }

    button.onclick = () => {
        setModal()
    }

    //作成した要素の追加
    document.body.appendChild(button)
}

//画面の手前に表示するmodalの作成
const createModal = () => {

    //modal 外側の作成
    modal = document.createElement('div')
    modal.setAttribute('class', 'modal-outer-ex')

    //cssの設定
    const modalElem = modal.style
    const modalStyle = {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000000',
        display: 'none',
        width: '100%',
        height: '100%',
        overflow: 'auto'
    }
    for (let props in modalStyle) {
        modalElem[props] = modalStyle[props]
    }

    //modal　内側の作成
    inner = document.createElement('div')
    inner.setAttribute('class', 'modal-inner-ex')

    //cssの設定
    const innerElem = inner.style
    const innerStyle = {
        position: 'relative',
        width:  '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        boxSizing: 'border-box'
    }
    for (let props in innerStyle) {
        innerElem[props] = innerStyle[props]
    }

    //外枠
    container = document.createElement('div')
    container.setAttribute('class', 'modal-container-ex')

    //cssの設定
    const containerElem = container.style
    const containerStyle = {
        position: 'absolute',
        right: '10px',
        top: '10px',
        zIndex: '2000000',
        display: 'flex',
        flexDirection: 'row-reverse'
    }
    for (let props in containerStyle) {
        containerElem[props] = containerStyle[props]
    }

    //modalを閉じるbutton
    const closeImg = document.createElement('div')
    closeImg.style.color = 'white'
    closeImg.style.width = '40px'
    closeImg.style.height = '40px'
    closeImg.style.marginLeft = '3px'
    closeImg.onclick = () => {
        closeModal()
    }
    closeImg.innerHTML = `<svg id="times-ex" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" style="width: 100%; height: 100%; "><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`

    container.appendChild(closeImg)

    //背景をclickしても閉じる
    document.onclick = (e) => {
        if (e.target === inner) {
           closeModal()
        }
    }

    //作成した要素の追加
    inner.appendChild(container)
    modal.appendChild(inner)
    document.body.appendChild(modal)
}

//modalにサイズなどを設定をする
const setModal = () => {

    //modalが作られてなければ作成
    if (!modal) {
        createModal()
    }

    //modalを開く(表示)
    modal.style.display = 'block'

    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)
    img.setAttribute('class', 'modal-img-ex')

    //cssの設定
    const imgElem = img.style
    const imgStyle = {
        position: 'absolute',
        top:  '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    for (let props in imgStyle) {
        imgElem[props] = imgStyle[props]
    }

    //画像サイズの変更
    if (img.naturalWidth > img.naturalHeight) {
        img.style.width = '80%'
        img.style.height = 'auto'
    } else {
        img.style.width = 'auto'
        img.style.height = '80%'
    }

    //作成した要素の追加1
    inner.appendChild(img)

    //画像をダウンロードするbuttonの追加
    const downloadImg = document.createElement('a')
    downloadImg.setAttribute('class', 'modal-download-ex')
    downloadImg.setAttribute('href', imgSrc)
    downloadImg.setAttribute('download', imgSrc)
    downloadImg.style.color = 'white'
    downloadImg.style.width = '35px'
    downloadImg.style.height = '35px'
    downloadImg.innerHTML = `<svg id="download-ex" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" class="svg-inline--fa fa-download fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 100%; height: 100%; padding-top: 5px; "><path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>`

    container.appendChild(downloadImg)
}

//modalを閉じる(見えなくする)、modal内のimgの削除
const closeModal = () => {
    modal.style.display = 'none'
    //modal表示した画像を削除
    const modalImg = document.getElementsByClassName('modal-img-ex')
    inner.removeChild(modalImg[0])
    //dawnload-linkを削除
    const modalDownload = document.getElementsByClassName('modal-download-ex')
    container.removeChild(modalDownload[0])
}

//マウスが移動したときの処理
const overImg = (data) => {
    //createButtonで作成したbuttonは無視
    if (data.className === 'modal-button-ex' ||data.className === 'modal-img-ex'  ) return

    //const bgimg = data.style.backgroundImage
    const cssStyleDeclaration = getComputedStyle( data, null ) 
    const bgimg = cssStyleDeclaration.getPropertyValue( "background-image" )

    //targetがimgタグもしくはbackground-imageがあった場合
    if (data.tagName === 'IMG' || data.tagName === 'img' || bgimg !== 'none') {

        if (bgimg !== 'none') {
            //url()を削除
            imgSrc = bgimg.replace(/^url\(\"|\"\)/g, '')
        } else {
            //imgタグのsrcを取得
            imgSrc = data.getAttribute('src')
        }
    
        //createButtonで作成したbuttonを表示して、位置を決める
        const imgRect = data.getBoundingClientRect()
        const x = window.pageXOffset + imgRect.left + 5
        const y = window.pageYOffset + imgRect.top + 5

        button.style.display = 'block'
        button.style.left = String(x) + 'px'
        button.style.top =  String(y) + 'px'
    } else {
        //createButtonで作成したbuttonを非表示
        button.style.display = 'none'
    }
}

//global変数
var button = ''
var modal  = ''
var inner = ''
var container = ''
var imgSrc = ''

window.onload = () => {
    
    chrome.storage.sync.get(['switch'], (items) => {
        const sw = items.switch
        if (sw) {
            chrome.storage.sync.get(['urlList'], (items) => {
                const protocol = location.protocol
                const host = location.host
                const nowUrl = protocol + host
                var isBlack = false

                const blackList = items.urlList
                const result = blackList.indexOf(nowUrl)
                if (result >= 0) {
                    isBlack = true
                }

                if (!isBlack) {
                    createButton()
                    document.addEventListener('mouseover', (e) => overImg(e.target))
                    document.addEventListener('wheel', () => {
                        button.style.display = 'none'
                    })
                }
            })
            
        }
    })
}