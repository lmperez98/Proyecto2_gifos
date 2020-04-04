async function change_img_today() {
    let change_img = document.getElementsByClassName("img_today")
    try{
        const response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=uQN81XZ1Dt44mlcLeDhKbjAG4UMv6szw&limit=15&rating=PG-13")
        const data = await response.json()
        console.log(data)
        change_img[0].setAttribute("src",data.data[0].images.fixed_width.url)
    }
    catch(fatal_error){
        console.log("fetch fail?ed",fatal_error)
    }
}
