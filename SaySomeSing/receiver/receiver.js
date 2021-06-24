const webSocket = new WebSocket("wss://192.168.43.57:3000")

const filter = document.querySelector('#filter')
let currentFilter

webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data))
}

document.getElementById("filter").addEventListener('change', (event) => {
    currentFilter = event.target.value
    document.getElementById("local-video").style.filter = currentFilter
    sendFiltername()
    event.preventDefault
})

let filtername
function sendFiltername(){

    filtername = document.getElementById("local-video").style.filter
    filterData({
        type: "store_filter2"
    })
}

function filterData(data){
    data.filtername = filtername
    webSocket.send(JSON.stringify(data))
}


///////////////////////////////////////////////////////

function handleSignallingData(data) {
    switch (data.type) {
        case "remotefilter1": 
            console.log(data.filtername)
            document.getElementById("remote-video").style.filter = data.filtername
            break
        case "offer":
            peerConn.setRemoteDescription(data.offer)
            createAndSendAnswer()
            break
        case "candidate":
            peerConn.addIceCandidate(data.candidate)
    }
}

function createAndSendAnswer () {
    peerConn.createAnswer((answer) => {
        peerConn.setLocalDescription(answer)
        sendData({
            type: "send_answer",
            answer: answer
        })
    }, error => {
        console.log(error)
    })
}

function sendData(data) {
    data.username = username
    webSocket.send(JSON.stringify(data))
}


let localStream
let peerConn
let username

function joinCall() {

    username = document.getElementById("username-input").value

    navigator.getUserMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia)

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
                type: "send_candidate",
                candidate: e.candidate
            })
        })

        sendData({
            type: "join_call"
        })

        document.getElementById("filter").addEventListener('change', (event) => {
            currentFilter = event.target.value
            document.getElementById("local-video").style.filter = currentFilter
            event.preventDefault
        })


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