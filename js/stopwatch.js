function stopwatch(elem) {
    let time = 0;
    let interval;
    let offset;
    let timefinal;

    function update() {
        if (this.isOn) {
            time += delta()
        }
        timefinal = time
        let formattedTime = timeFormate(time)
        elem.textContent = formattedTime
    }
    function delta() {
        let now = Date.now()
        let timePassed = now - offset
        offset = now
        return timePassed
    }
    function timeFormate(timeInMiliseconds) {
        let time = new Date(timeInMiliseconds)
        let minutes = time.getMinutes().toString()
        let seconds = time.getSeconds().toString()
        let miliSeconds = time.getMilliseconds().toString()

        if (minutes.length < 2) {
            minutes = "0" + minutes
        }
        if (seconds.length < 2) {
            seconds = "0" + seconds
        }
        while (miliSeconds.length < 3) {
            miliSeconds = "0" + miliSeconds
        }

        return minutes + ":" + seconds + "." + miliSeconds
    }


    this.isOn = false
    this.timeFinale = 0;

    this.start = () => {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true
        }
    }

    this.stop = () => {
        if (this.isOn) {
            this.timeFinale = timefinal;
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    }

    this.reset = () => {
        time = 0;
        update();
    }



}