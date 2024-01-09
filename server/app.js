const WebSocket = require("ws")

const server = new WebSocket.Server({ port: 8080 })

let messages = [{ sender: "Admin", message: "hello" }]
let usernames = ["Duck", "Rabbit", "Bee"]

server.on("connection", (socket) => {
	const usernameIndex = Math.floor(Math.random() * usernames.length)
	const username = usernames[usernameIndex]
	socket.send(JSON.stringify({ username, messages }))
	socket.on("message", (data) => {
		const parsedData = JSON.parse(data.toString())
		messages.push(parsedData)
		server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(parsedData))
		})
	})
})
