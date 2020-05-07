const API_KEY = "uQN81XZ1Dt44mlcLeDhKbjAG4UMv6szw"

const fetchAny = async (url) => {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let res = await response.json()
            return res.data;
        }
        return null
    } catch (error) {
        console.log("Fatal error", error)
    }
}

const fetchUpload = async (url) => {
    try {
        let response = await fetch(url);
        if (response.ok) {
            let res = await response.json()
            return res;
        }
        return null
    } catch (error) {
        console.log("Fatal error", error)
    }
}