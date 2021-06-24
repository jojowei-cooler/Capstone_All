const webSocket = new WebSocket("wss://192.168.43.114:3000")

const filter = document.querySelector('#filter')
let currentFilter

webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data))
}

webSocket.onopen = function(e) {
    alert("Connection established")
}


function handleSignallingData(data) {
    switch (data.type) {
        case "remotefilter2": 
            console.log(data.filtername)
            document.getElementById("remote-video").style.filter = data.filtername
            break
        case "answer":
            peerConn.setRemoteDescription(data.answer)
            break
        case "candidate":
            peerConn.addIceCandidate(data.candidate)
    }
}

let username
function sendUsername() {

    username = document.getElementById("username-input").value
    sendData({
        type: "store_user"
    })
}

function sendData(data) {
    data.username = username
    webSocket.send(JSON.stringify(data))
}

let filtername
function sendFiltername(){

    filtername = document.getElementById("local-video").style.filter
    filterData({
        type: "store_filter1"
    })
}

function filterData(data){
    data.filtername = filtername
    webSocket.send(JSON.stringify(data))
}

let localStream
let peerConn
function startCall() {
    //document.getElementById("video-call-div")
    //.style.display = "inline"

    navigator.getUserMedia({
        video: {
            frameRate: 24,
            width: {
                min: 480, ideal: 720, max: 1280
            },
            aspectRatio: 1.33333
        },
        audio: true
    }, (stream) => {
        localStream = stream
        document.getElementById("local-video").srcObject = localStream

        let configuration = {
            iceServers: [
                {
                    "urls": ["stun:stun.l.google.com:19302", 
                    "stun:stun1.l.google.com:19302", 
                    "stun:stun2.l.google.com:19302"]
                }
            ]
        }

        peerConn = new RTCPeerConnection(configuration)
        peerConn.addStream(localStream)

        peerConn.onaddstream = (e) => {
            document.getElementById("remote-video")
            .srcObject = e.stream
        }

        peerConn.onicecandidate = ((e) => {
            if (e.candidate == null)
                return
            sendData({
                type: "store_candidate",
                candidate: e.candidate
            })
        })

        createAndSendOffer()
        
        document.getElementById("filter").addEventListener('change', (event) => {
            currentFilter = event.target.value
            document.getElementById("local-video").style.filter = currentFilter
            sendFiltername()
            event.preventDefault
        })

    }, (error) => {
        console.log(error)
    })
}

function createAndSendOffer() {
    peerConn.createOffer((offer) => {
        sendData({
            type: "store_offer",
            offer: offer
        })

        peerConn.setLocalDescription(offer)
    }, (error) => {
        console.log(error)
    })
}

let isAudio = true
function muteAudio() {
    isAudio = !isAudio
    localStream.getAudioTracks()[0].enabled = isAudio
}

let isVideo = true
function muteVideo() {
    isVideo = !isVideo
    localStream.getVideoTracks()[0].enabled = isVideo
}

////////////////////////