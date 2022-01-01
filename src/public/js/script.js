function abrirMenu() {
    let button = document.getElementById('abrirMenu')
    let menu = document.getElementById('menu')
    if (button.style.display === 'block') {
        button.style.display = 'none'
        menu.style.display = 'grid'
    }
    else {
        button.style.display = 'block'
        menu.style.display = 'none'
    }
}

function fecharMenu() {
    let button = document.getElementById('abrirMenu')
    let menu = document.getElementById('menu')
    menu.style.display = 'none'
    button.style.display = 'block'
}