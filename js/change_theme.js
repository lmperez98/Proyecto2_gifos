let stylesChange = document.getElementById("style_change")
let botonDark = document.getElementById("boton_dark")
let botonLight = document.getElementById("boton_light")
let botonEscogertemas = document.getElementById("boton_tema")
let botonFlechaAbajo = document.getElementById("flecha_abajo")
let logoImg=document.getElementById("logo_img")

botonEscogertemas.onclick = () => {
    document.getElementById("escoger_temas").style.display = "block"
}

botonFlechaAbajo.onclick = () => {
    document.getElementById("escoger_temas").style.display = "block"
}

botonDark.onclick = () => {
    logoImg.setAttribute("src","assets/gifOF_logo_dark.png")
    document.getElementById("escoger_temas").style.display = "none"
    stylesChange.setAttribute("href", "stylesdark.css")
}
botonLight.onclick = () => {
    logoImg.setAttribute("src","assets/gifOF_logo.png")
    document.getElementById("escoger_temas").style.display = "none"
    stylesChange.setAttribute("href", "styles.css")
}
