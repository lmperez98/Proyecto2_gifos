const createSpans = (limit, term) => {
    let container = document.getElementsByClassName(term)[0]
    for (let i = 0; i < limit; i++) {
        const spanbox = document.createElement("span");
        container.appendChild(spanbox)
    }
}

createSpans(16, "loadbarbox")
createSpans(21, "loadbar_upload")


const MisGifsButton = document.getElementsByClassName("mis_gifs")[0]
const CreateGifsButton = document.getElementsByClassName("boton_crear")[0]
const startButton = document.getElementsByClassName("begin_button")[0]
const captureButton = document.getElementsByClassName("capture_button")[0]
const stopRecord = document.getElementsByClassName("button_ready")[0]
const uploadGif = document.getElementsByClassName("upload_gif")[0]
const againButton = document.getElementsByClassName("repeat_gif")[0]
const videoPreview = document.getElementsByClassName("video_elemet")[0]
let timerBox = document.getElementsByClassName("timerbox")[0]
let watch = new stopwatch(timerBox)

const setRecorder = async () => {
    stream = null
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                height: { max: 500 },
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

MisGifsButton.onclick = () => {
    hideElements("trend_section", "search_tab", "container_sugest")
    showElements("mis_gifs_section")
}
CreateGifsButton.onclick = () => {
    showElements("create_gifs_box", "mis_gifs_section")
    document.getElementById("back_arrow").style.display = "block"
    hideElements("trend_section", "search_tab", "container_sugest", "boton_cambiar_tema", "boton_crear", "mis_gifs", "window_scene2", "window_scene5", "window_scene6", "window_error_upload")
}
startButton.onclick = () => {
    setRecorder()
    showElements("window_scene2")
    hideElements("mis_gifs_section", "window_scene1", "window_capture_upload")
}
captureButton.onclick = () => {
    document.getElementsByClassName("window_capture_upload")[0].style.display = "flex"
    hideElements("capture_button", "loadbar", "repeat_uploadgif")
    watch.start()
}
stopRecord.onclick = () => {
    hideElements("button_ready")
    document.getElementsByClassName("loadbar")[0].style.display = "flex"
    showElements("repeat_uploadgif")
    watch.stop()
}


againButton.onclick = () => {
    hideElements("loadbar", "repeat_uploadgif")
    document.getElementsByClassName("button_ready")[0].style.display = "flex"
    watch.reset()
    watch.start()
}
uploadGif.onclick = () => {
    hideElements("window_scene2")
    showElements("window_scene5")
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