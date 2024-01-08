const socket = new WebSocket("ws://localhost:8080")

socket.onmessage = ({ data }) => {
	console.log(data)
}

document.querySelector("form").onsubmit = (e) => {
	e.preventDefault()
	const message = document.querySelector("input").value
	socket.send(message)
}
