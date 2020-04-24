const createSpans=(limit,term)=>{
    let container=document.getElementsByClassName(term)[0]
    for (let i = 0; i < limit; i++) {
        const spanbox= document.createElement("span");
        container.appendChild(spanbox)
    }
}

createSpans(16,"loadbarbox")
createSpans(21,"loadbar_upload")