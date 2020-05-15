const createGifsSection = async (url) => {
    let data = await fetchAny(url)
    if (data == null) {
        console.log("Fatal error en el fetch papi");
        return
    } else {
        let gifObjArray = []
        data.forEach(element => {
            let gifobj = new Object();
            gifobj.url = element.images.fixed_height.url;
            gifObjArray.push(gifobj)
        });
        return gifObjArray;
    }
}

const loadGifSection = async (url) => {
    const boxContainer = document.getElementById("mygifs_container");
    boxContainer.innerHTML = ""
    let arrayMisGifs = await createGifsSection(url)
    arrayMisGifs.forEach((element, index) => {
        const divGifs = document.createElement("div")
        divGifs.setAttribute("class", "model-gif")
        const img = document.createElement("img")
        img.setAttribute("src", arrayMisGifs[index].url)
        img.setAttribute("class","gifo")
        divGifs.appendChild(img)
        boxContainer.appendChild(divGifs)
    })
}

const loadMisGifs = async () => {
    if (localStorage.length !== 0) {
        let idsArray = []
        for (let i = 0; i < localStorage.length; i++) {
            const id = localStorage.key(i)
            idsArray.unshift(id)
        }
        let url=`https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${idsArray}`
        await loadGifSection(url)
    }
}



