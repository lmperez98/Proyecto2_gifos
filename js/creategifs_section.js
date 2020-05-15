const createSpans = (limit, term, styleclass) => {
    let container = document.getElementsByClassName(term)[0]
    for (let i = 0; i < limit; i++) {
        const spanbox = document.createElement("span");
        spanbox.setAttribute("class", styleclass)
        container.appendChild(spanbox)
    }
}

createSpans(16, "loadbarbox", "loadbar_video")
createSpans(21, "loadbar_upload", "upload_bar")


const misGifsButton = document.getElementsByClassName("mis_gifs")[0]
const createGifsButton = document.getElementsByClassName("boton_crear")[0]
const startButton = document.getElementsByClassName("begin_button")[0]
const captureButton = document.getElementsByClassName("capture_button")[0]
const stopRecord = document.getElementsByClassName("button_ready")[0]
const uploadGif = document.getElementsByClassName("upload_gif")[0]
const againButton = document.getElementsByClassName("repeat_gif")[0]
const videoPreview = document.getElementsByClassName("video_elemet")[0]
const playGifButton = document.getElementsByClassName("playgif")[0]
const errorAgainButton = document.getElementsByClassName("button_again")[0]
const gifUpload = document.getElementById("gif_upload")
const titleCreateGifs = document.getElementById("title_create_gif")
const cancelUploadButton = document.getElementById("cancel_upload")
const copyLinkButton = document.getElementById("copy_button")
const downloadButton = document.getElementById("download_button")
const finishButton = document.getElementById("finish_button")
const errorOkButton = document.getElementById("ok_fuckit_button")

let timerBox = document.getElementsByClassName("timerbox")[0]
const loadbarspan = document.getElementsByClassName("loadbar_video")
const uploadBarBox = document.getElementsByClassName("upload_bar")
let watch = new stopwatch(timerBox)

const setRecorder = async () => {
    stream = null
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                height: { max: 480 },
            },
            audio: false,
        })
        videoPreview.srcObject = stream
        videoPreview.play()
    } catch (err) {
        hideElements("window_scene2")
        showElements("window_error_upload")
        document.getElementsByClassName("error_msg")[0].textContent = "Fatal error..." + err
    }
}

let videoRecorder
let gifRecorder
let gifSrc
let newGifID = ""

const startGifRecording = async () => {
    const stream = videoPreview.srcObject;
    try {
        videoRecorder = new RecordRTCPromisesHandler(stream, {
            type: "video",
            mimeType: "video/webm; codecs=vp8",
            disablelogs: true,
            videoBitsPerSecond: 128000,
            frameRate: 30,
            quality: 10,
            width: 480,
            hidden: 240
        });
        gifRecorder = new RecordRTCPromisesHandler(stream, {
            disablelogs: true,
            type: "gif",
            frameRate: 1,
            quality: 10,
        });
        await videoRecorder.startRecording()
        await gifRecorder.startRecording()
        videoRecorder.stream = stream
    } catch (err) {
        hideElements("window_scene2")
        showElements("window_error_upload")
        document.getElementsByClassName("error_msg")[0].textContent = "Fatal error..." + err
        watch.stop()
        watch.reset()
    }
}

const stopGifRecording = async () => {
    try{
        await videoRecorder.stopRecording()
        await gifRecorder.stopRecording()
        const videoBlob = await videoRecorder.getBlob()
        const gifBlob = await gifRecorder.getBlob()
    
        videoPreview.src = URL.createObjectURL(videoBlob)
        videoRecorder.stream.getTracks().forEach(k => k.stop())
        videoPreview.srcObject = null
    
        await videoRecorder.reset()
        await videoRecorder.destroy()
        await gifRecorder.reset()
        await gifRecorder.destroy()
    
        gifSrc = await gifBlob
        gifUpload.src = URL.createObjectURL(await gifBlob)
    
        gifRecorder = null;
        videoRecorder = null;
    }catch(err){
        hideElements("window_scene2")
        showElements("window_error_upload")
        document.getElementsByClassName("error_msg")[0].textContent = "Fatal error..." + err
    }
}
let signalAbort = new AbortController();
const uploadCreateGif = async () => {
    const formData = new FormData()
    formData.append("file", gifSrc, "myGif.gif")
    const parameters = {
        method: "POST",
        body: formData,
        json: true,
        signal: signalAbort.signal,
    }
    const data = fetchUpload(`https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`, parameters)
    console.log(await data);
    console.log("***upload ended***");


    return await data
}

const copyCreateGif = () => {
    const faketemp = document.createElement("textarea")
    faketemp.value = `https://giphy.com/gifs/${newGifID}`
    document.body.appendChild(faketemp)
    faketemp.select()
    document.execCommand("copy")
    alert("Has copiado el enlace de tu gif")
    document.body.removeChild(faketemp)
}

const downloadCreateGif = async () => {
    const urldownload = `https://media.giphy.com/media/${newGifID}/giphy.gif`
    const gifFetch = fetch(urldownload)
    const blobGif = (await gifFetch).blob()
    const urlGif = URL.createObjectURL(await blobGif)
    const imgSave = document.createElement("a")
    imgSave.href = urlGif
    imgSave.download = "mi_guifo.gif"
    imgSave.style = `display:"none"`
    document.body.appendChild(imgSave)
    imgSave.click()
    document.body.removeChild(imgsave)
    console.log("tu gif ha sido descargado");
}

const loadingBar = (index, time, color) => {
    for (let i = 1; i < index + 1; i++) {
        setTimeout(() => {
            loadbarspan[i - 1].style.backgroundColor = color
        }, time * i)
    }
}

let intervalTimer
const uploadBar = (color1, color2) => {
    let counter1 = 0
    let counter2 = 0
    intervalTimer = setInterval(() => {
        if (counter1 < uploadBarBox.length && counter1 != 21) {
            uploadBarBox[counter1].style.backgroundColor = color1
            counter1++
        } else if (counter2 < uploadBarBox.length) {
            uploadBarBox[counter2].style.backgroundColor = color2
            counter2++
        } else {
            counter1 = 0
            counter2 = 0
        }
    }, 200);
}

const hideElements = (...term) => {
    term.forEach(element => {
        document.getElementsByClassName(element)[0].style.display = "none"
    });
}

const showElements = (...term) => {
    term.forEach(element => {
        document.getElementsByClassName(element)[0].style.display = "block"
    });
}

errorAgainButton.onclick = () => {
    hideElements("window_error_upload")
    showElements("window_scene1", "mis_gifs_section")
    document.getElementById("back_arrow").style.display = "block"
    loadMisGifs()
    captureButton.style.display="flex"
}
errorOkButton.onclick = () => {
    setTimeout(() => {
        window.location.href = "index.html"
    }, 200)
}

misGifsButton.onclick = () => {
    hideElements("trend_section", "search_tab", "container_sugest")
    showElements("mis_gifs_section")
    loadMisGifs()
}
createGifsButton.onclick = () => {
    showElements("create_gifs_box", "mis_gifs_section")
    document.getElementById("back_arrow").style.display = "block"
    hideElements("trend_section", "search_tab", "container_sugest", "boton_cambiar_tema", "boton_crear", "window_scene2", "window_scene5", "window_scene6", "window_error_upload", "mis_gifs")
    loadMisGifs()
}
startButton.onclick = () => {
    setRecorder()
    showElements("window_scene2")
    hideElements("mis_gifs_section", "window_scene1", "window_capture_upload", "button_ready")
}
captureButton.onclick = async () => {
    setTimeout(() => {
        document.getElementsByClassName("button_ready")[0].style.display = "flex"
    }, 2000)
    titleCreateGifs.innerText = "Capturando Tu Guifo"
    document.getElementsByClassName("window_capture_upload")[0].style.display = "flex"
    hideElements("capture_button", "loadbar", "repeat_uploadgif")
    watch.reset()
    watch.start()
    startGifRecording()
}
stopRecord.onclick = () => {
    hideElements("button_ready")
    document.getElementsByClassName("loadbar")[0].style.display = "flex"
    titleCreateGifs.innerText = "Vista Previa"
    showElements("repeat_uploadgif")
    watch.stop()
    stopGifRecording()
}

playGifButton.onclick = () => {
    loadingBar(16, 0, "#999999")
    loadingBar(16, watch.timeFinale / 16, "#F7C9F3")
    videoPreview.play()
}

againButton.onclick = async () => {
    hideElements("loadbar", "repeat_uploadgif")
    titleCreateGifs.innerText = "Capturando Tu Guifo"
    loadingBar(16, 0, "#999999")
    await setRecorder()
    await startGifRecording()
    setTimeout(() => {
        document.getElementsByClassName("button_ready")[0].style.display = "flex"
    }, 2000)

    watch.reset()
    watch.start()
}
uploadGif.onclick = async () => {
    hideElements("window_scene2")
    showElements("window_scene5")
    uploadBar("#F7C9F3", "#999999")
    try {
        const newGif = await uploadCreateGif();
        if ((await newGif.meta.status) === 200) {
            newGifID = await newGif.data.id;
            localStorage.setItem(newGifID, JSON.stringify(newGifID))
            clearInterval(intervalTimer)
            hideElements("window_scene5")
            showElements("window_scene6")
            loadMisGifs()
            showElements("mis_gifs_section")
        } 
        else {
            hideElements("window_scene5")
            showElements("window_error_upload")
            document.getElementsByClassName("error_msg")[0].textContent = "Fatal error..." + " VUelte a intentarlo"
        }
    } catch (err) {
        hideElements("window_scene5")
        showElements("window_error_upload")
        document.getElementsByClassName("error_msg")[0].textContent = "Fatal error..." + err
        clearInterval(intervalTimer)
    }
}

cancelUploadButton.onclick = () => {
    signalAbort.abort();
}

copyLinkButton.onclick = () => {
    copyCreateGif()
}

downloadButton.onclick = () => {
    downloadCreateGif()
}

finishButton.onclick = () => {
    setTimeout(() => {
        window.location.href = "index.html"
    }, 200)
}