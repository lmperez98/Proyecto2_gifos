const input_search = document.getElementById('search_input')
const matchlist = document.getElementById('match_list')

async function search_input(sugest) {
    try{
        const response = await fetch("https://api.giphy.com/v1/tags/related/{"+sugest+"}?api_key=uQN81XZ1Dt44mlcLeDhKbjAG4UMv6szw")
        const sugestions = await response.json()
        console.log(sugestions)
        let button = document.createElement("button")
        button.innerHTML= sugestions.data[0].name
        matchlist.appendChild(button)
    }
    catch(fatal_error){
        console.log("fetch failed",fatal_error)
    }
}

input_search.addEventListener('input',()=>search_input(input_search.value))