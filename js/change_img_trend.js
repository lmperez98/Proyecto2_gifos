async function change_img_trend() {
    let img_trend= document.getElementsByClassName("img_treng")
    try{
        for (let i = 0; i < img_trend.length; i++) {
            const response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=uQN81XZ1Dt44mlcLeDhKbjAG4UMv6szw&limit=25&rating=R")
            const data = await response.json()
            img_trend[i].setAttribute("src",data.data[i].images.fixed_height.url)
        }
    }
    catch(fatal_error){
        console.log("fetch failed",fatal_error)
    }
}
change_img_trend()