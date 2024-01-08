const WebSocket = require("ws")

const server = new WebSocket.Server({ port: 8080 })

let messages = []

server.on("connection", (socket) => {
	socket.on("message", (message) => {
		messages.push(message.toString())
		console.log("messages:", messages)
	})
})
