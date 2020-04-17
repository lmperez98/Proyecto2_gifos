
let creargifobj = async (term, limit) => {
    let url =`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=${limit}`
    let datos = await fetchAny(url);
    if (datos == null) {
        alert("Fatal error en el fetch papi")
        return "assets/descarga.png"
    } else {
        let randomnum= Math.floor(Math.random()*10)
        let gifobj = new Object();
        gifobj.name = datos[randomnum].title;
        gifobj.url = datos[randomnum].images.fixed_height.url;
        return gifobj;
    }
}

let gifpos = ["gif1", "gif2", "gif3", "gif4"]
let gifidtitle = ["titulo_gif1", "titulo_gif2", "titulo_gif3", "titulo_gif4"]
let searchterms = ["mindblow", "homer", "holy shit", "do it"]

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let termsshuffle = shuffle(searchterms)

let cargargifsdom = () => {
    searchterms.forEach(async (element, index) => {
        let gif = await creargifobj(element, "10")
        let img = document.getElementById(gifpos[index])
        img.setAttribute("src", gif.url)
        img.setAttribute("alt", gif.name)
        let numeral = document.getElementById(gifidtitle[index])
        numeral.innerHTML = "#" + termsshuffle[index]
    })
}

cargargifsdom()