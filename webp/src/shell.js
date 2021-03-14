const mainShell = () => {
    console.log('main-shell');
    createDom();


}

const createDom = () => {
    const heading = document.createElement('h1')
    heading.textContent = 'Shell'
    const root = document.querySelector('#root')
    root.append(heading)
}

mainShell();