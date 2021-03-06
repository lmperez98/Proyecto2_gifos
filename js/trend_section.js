
let crearcajitagifs = async (limit) => {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&rating=R`
    let datos = await fetchAny(url);
    if (datos == null) {
        console.log("Fatal error en el el fetch papi")
        return "assets/descarga.png"
    } else {
        let infogif = [];
        datos.forEach(element => {
            let objetogif = new Object();
            objetogif.titulo = element.title;
            objetogif.url = element.images.fixed_height.url;
            infogif.push(objetogif)
        });
        return infogif;
    }
}

const contenedor = document.getElementById("trend_gif_container")
let insertargifs = async (limit) => {
    let array = await crearcajitagifs(limit);
    array.forEach((element,index) => {
        const divgifs = document.createElement("div");
        divgifs.setAttribute("class", "model-gif")
        const gif = document.createElement("img")
        gif.setAttribute("src", array[index].url)
        gif.setAttribute("alt", array[index].titulo)
        gif.setAttribute("class", "gifo")
        const titulodiv = document.createElement("div")
        titulodiv.setAttribute("class", "gifo_titulo")
        const nombregif = document.createElement("p")
        nombregif.innerHTML = array[index].titulo
        nombregif.setAttribute("class", "gif-texto")
        divgifs.appendChild(gif)
        divgifs.appendChild(titulodiv)
        titulodiv.appendChild(nombregif)
        contenedor.appendChild(divgifs)
    });
}

insertargifs("0")