window.addEventListener("load", function() {
    // Subrutina para editar adjunto en Leyes
    const inputFile = document.querySelector('#mainFile');
    const selectedInfo = document.querySelector('.fileSelected');
    inputFile.addEventListener('change', ()=> {
        const curFiles = inputFile.files;
        if (curFiles.length != 0) {
            for (const file of curFiles) {
                selectedInfo.textContent = `${file.name}`
            }
        }
    });

});