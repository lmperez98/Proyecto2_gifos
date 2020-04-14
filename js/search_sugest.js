let fetchsugestsearch = async (term) => {
    try {
        let response = await fetch(
            `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}&q=${term}&limit=3`
        );
        if (response.ok) {
            let res = await response.json()
            return res.data;
        }
        return null
    } catch (error) {
        console.log("Fatal error", error)
    }
}

let resultarray = async (term) => {
    let datos = await fetchsugestsearch(term)
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
let searcharray = []
let loadrecentsearch = () => {
    let buttonbox = document.getElementById("resultados_boton")
    buttonbox.style.display = "block"
    let recentserch = JSON.parse(sessionStorage.getItem("searcharray"))
    if (recentserch == "") {
        buttonbox.style.display = "none"
    } else {
        buttonbox.innerHTML = ""
        recentserch.forEach((element) => {
            let botonrecent = document.createElement("button")
            botonrecent.setAttribute("class", "result-button")
            botonrecent.innerHTML = "#" + element
            buttonbox.appendChild(botonrecent)
            botonrecent.onclick = () => {
                changegifsyname(element)
                let resultsection = document.getElementById("resultados_section")
                resultsection.style.display = "block";
                resultsection.scrollIntoView();
            }
        })
    }
}

let buscarterm = async (term) => {
    console.log(fetchsugest(term,"0"))
    return await fetchsugest(term, "0")
}

let createarrayobj = async (term) => {
    let info = await buscarterm(term)
    console.log(info)
    if (info == null) {
        console.log("Fatal error papi revisa tu fetch")
        return "assets/descarga.png"
    } else {
        let infoarray = []
        info.forEach(element => {
            let infobj = new Object()
            infobj.name = element.title;
            infobj.url = element.images.fixed_height.url;
            infoarray.push(infobj)
        });
        return infoarray
    }
}

let changegifsyname = async (term) => {
    const resultbox = document.getElementById("results")
    let arreglo = await createarrayobj(term)
    if (arreglo.length === 0) {
        document.getElementById("resultados_inicio").innerHTML = "Not found gifs"
        document.getElementById("results").innerHTML = ""
    } else {
        document.getElementById("results").innerHTML = ""
        document.getElementById("resultados_inicio").innerHTML = term
        document.getElementById("search_input").value = ""
        arreglo.forEach((element, index) => {
            const divgifs = document.createElement("div");
            divgifs.setAttribute("class", "model-gif")
            const gif = document.createElement("img")
            gif.setAttribute("src", arreglo[index].url)
            gif.setAttribute("alt", arreglo[index].name)
            gif.setAttribute("class", "gifo")
            const titulodiv = document.createElement("div")
            titulodiv.setAttribute("class", "gifo_titulo")
            const nombregif = document.createElement("p")
            nombregif.innerHTML = arreglo[index].name
            nombregif.setAttribute("class", "gif-texto")
            divgifs.appendChild(gif)
            divgifs.appendChild(titulodiv)
            titulodiv.appendChild(nombregif)
            resultbox.appendChild(divgifs)
        });

    }
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


document.getElementById("boton_buscar").onclick = buscargifs = () => {
    let searchterm = document.getElementById("search_input").value
    changegifsyname(searchterm)
    searcharray.unshift(searchterm)
    sessionStorage.setItem("searcharray", JSON.stringify(searcharray))
    let resultsection = document.getElementById("resultados_section")
    resultsection.style.display = "block"
    resultsection.scrollIntoView()
    let onsearch = document.getElementById("autocomplete_list")
    onsearch.style.display = "none"
    loadrecentsearch();
    searchterm = ""
    document.getElementById("search_input").innerHTML = ""
}

document.getElementById("search_input").onkeyup = (event) => {
    if (event.keyCode === 13) {
        buscargifs()
    }
}