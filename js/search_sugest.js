
let resultarray = async (term) => {
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${term}&limit=3`
    let datos = await fetchAny(url)
    if (datos == null) {
        console.log("Fatal error en el fetch")
        return "assets/descarga.png"
    } else {
        let arrayresult = []
        datos.forEach((element, index) => {
            arrayresult.push(datos[index].name)
        });
        return arrayresult
    }
}

let idbuttonssearch = ["resultado1", "resultado2", "resultado3"]

let loadresults = async (term) => {
    let box = await resultarray(term)
    box.forEach(async (element, index) => {
        let result = document.getElementById(idbuttonssearch[index])
        result.innerHTML = element
    });
}

let inputfield = document.getElementById("search_input")
inputfield.oninput = () => {
    let term = document.getElementById("search_input").value
    loadresults(term)
}

document.getElementById("search_input").onkeydown = () => {
    let onSearch = document.getElementById("autocomplete_list");
    onSearch.style.display = "block"
}

document.getElementById("boton_close").onclick = () => {
    document.getElementById("search_input").value = "";
    let onSearch = document.getElementById("autocomplete_list")
    onSearch.style.display = "none"
}

document.getElementById("search_input").onkeyup = (event) => {
    if (event.keyCode === 13) {
        insertGifsSearch(document.getElementById("search_input").value, "0")
        document.getElementById("trend_contaier").scrollIntoView()
        document.getElementById("search_input").value = "";
        document.getElementById("autocomplete_list").style.display = "none"
    } else if (event.keyCode === 27) {
        document.getElementById("search_input").value = "";
        document.getElementById("autocomplete_list").style.display = "none"
    }
}

idbuttonssearch.forEach((element) => {
    let sugest = document.getElementById(element)
    let inputvalue = document.getElementById("search_input")
    let list = document.getElementById("autocomplete_list")
    sugest.onclick = () => {
        inputvalue.value = sugest.innerHTML
        list.style.display = "none"
    }
})

let createGifSearch = async (term, limit) => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=${limit}`
    let datos = await fetchAny(url);
    console.log(datos)
    if (datos == null) {
        alert("Fatal error en el fetch papi")
        return "assets/descarga.png"
    } else {
        let infogif = []
        datos.forEach(element => {
            let objGif = new Object()
            objGif.titulo = element.title
            objGif.url = element.images.fixed_height.url
            infogif.push(objGif)
        })
        return infogif
    }
}

let insertGifsSearch = async (term, limit) => {
    let array = await createGifSearch(term, limit)
    let boxGifsImg = document.getElementsByClassName("gifo")
    let boxGifsname = document.getElementsByClassName("gif-texto")
    let boxterm = document.getElementById("result_title")
    boxterm.innerHTML = term + " (resultados)"
    array.forEach((element, index) => {
        boxGifsImg[index].setAttribute("src", array[index].url)
        boxGifsname[index].innerHTML = array[index].titulo
    })
}

document.getElementById("boton_buscar").onclick = () => {
    let inputfield = document.getElementById("search_input")
    if (inputfield.value == "") {
        alert("Escribe algo, lo siento")
    } else {
        insertGifsSearch(inputfield.value, "0")
        document.getElementById("trend_contaier").scrollIntoView()
    }
}

let sugestButtons = document.getElementsByClassName("boton_mas")

Array.prototype.forEach.call(sugestButtons,((element, index) => {
    element.onclick = () => {
        insertGifsSearch(termsshuffle[index], "0")
        document.getElementById("trend_contaier").scrollIntoView()
    }
}))



