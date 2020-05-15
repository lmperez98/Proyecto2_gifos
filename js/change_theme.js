let stylesChange = document.getElementById("style_change")
let botonDark = document.getElementById("boton_dark")
let botonLight = document.getElementById("boton_light")
let botonEscogertemas = document.getElementById("boton_tema")
let botonFlechaAbajo = document.getElementById("flecha_abajo")
let logoImg = document.getElementById("logo_img")
const colorTheme = true

const dartTheme = () => {
    logoImg.setAttribute("src", "assets/gifOF_logo_dark.png")
    document.getElementById("escoger_temas").style.display = "none"
    stylesChange.setAttribute("href", "stylesdark.css")
}

const ligthTheme = () => {
    logoImg.setAttribute("src", "assets/gifOF_logo.png")
    document.getElementById("escoger_temas").style.display = "none"
    stylesChange.setAttribute("href", "styles.css")
}

botonEscogertemas.onclick = () => {
    document.getElementById("escoger_temas").style.display = "block"
}

botonFlechaAbajo.onclick = () => {
    document.getElementById("escoger_temas").style.display = "block"
}

botonDark.onclick = () => {
    dartTheme()
    colorTheme = false
}
botonLight.onclick = () => {
    ligthTheme()
    colorTheme = true
}
