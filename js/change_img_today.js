async function fetch_today() {
    let datos = ["jonathan van ness", "sailor mercury", "fab five", "unicorns and rainbows"]
    let parrafos_sugest = document.getElementsByClassName("img_today")
    try {
        for (let i = 0; i < datos.length; i++) {
            let random_num = Math.floor(Math.random() * 14)
            const response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=uQN81XZ1Dt44mlcLeDhKbjAG4UMv6szw&q="+datos[i]+"&limit=15&offset=0&rating=R&lang=en")
            const data = await response.json()
            parrafos_sugest[i].setAttribute("src",data.data[random_num].images.fixed_height.url)
        }
    }
    catch (fatal_error) {
        console.log("fetch failed", fatal_error)
    }
}

fetch_today()
