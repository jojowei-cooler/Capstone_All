const Socket = require("websocket").server
const https = require("https")
const http = require("http")
const fs = require("fs")

const options = {
    key: fs.readFileSync('web-key.pem'),
    cert: fs.readFileSync('web-cert.pem')
}

const server = https.createServer(options, (req, res) => {})

server.listen(3000, () => {
    console.log("Listening on port 3000...")
})

const webSocket = new Socket({ httpServer: server })

let users = []
var clients= []

webSocket.on('request', (req) => {
    const connection = req.accept()
    clients.push(connection)

    connection.on('message', (message) => {
        const data = JSON.parse(message.utf8Data)

        const user = findUser(data.username)

        switch(data.type) {
            case "store_filter1":
                console.log(data.filtername)
                clients.forEach(function(client){
                    sendData({
                        type: "remotefilter1",
                        filtername: data.filtername
                    }, client)
                })

                break
            case "store_filter2":
                console.log(data.filtername)
                clients.forEach(function(client){
                    sendData({
                        type: "remotefilter2",
                        filtername: data.filtername
                    }, client)
                })
    
                break
            case "sendsocket2":
                console.log(data.socket2)
                break
            
            case "store_user":

                if (user != null) {
                    return
                }

                const newUser = {
                     conn: connection,
                     username: data.username
                }

                users.push(newUser)
                console.log(newUser.username)
                break
            case "store_offer":
                if (user == null)
                    return
                user.offer = data.offer
                break
            
            case "store_candidate":
                if (user == null) {
                    return
                }
                if (user.candidates == null)
                    user.candidates = []
                
                user.candidates.push(data.candidate)
                break
            case "send_answer":
                if (user == null) {
                    return
                }

                sendData({
                    type: "answer",
                    answer: data.answer
                }, user.conn)
                break
            case "send_candidate":
                if (user == null) {
                    return
                }

                sendData({
                    type: "candidate",
                    candidate: data.candidate
                }, user.conn)
                break
            case "join_call":
                if (user == null) {
                    return
                }

                sendData({
                    type: "offer",
                    offer: user.offer
                }, connection)
                
                user.candidates.forEach(candidate => {
                    sendData({
                        type: "candidate",
                        candidate: candidate
                    }, connection)
                })

                break
        }
    })

    connection.on('close', (reason, description) => {
        users.forEach(user => {
            if (user.conn == connection) {
                users.splice(users.indexOf(user), 1)
                return
            }
        })
    })
})

function sendData(data, conn) {
    conn.send(JSON.stringify(data))
}

function findUser(username) {
    for (let i = 0;i < users.length;i++) {
        if (users[i].username == username)
            return users[i]
    }
}