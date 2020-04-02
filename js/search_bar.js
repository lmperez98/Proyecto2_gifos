async function search_input() {
    let input_search = document.getElementById("search_input").value;
    try{
        const response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=uQN81XZ1Dt44mlcLeDhKbjAG4UMv6szw&q=" + input_search + "&limit=25&offset=0&rating=PG-13&lang=es")
        const data = await response.json()
        console.log(data)
    }
    catch(fatal_error){
        console.log("fetch failed",fatal_error)
    }
}




