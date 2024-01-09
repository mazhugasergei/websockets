const socket = new WebSocket("ws://ip_address:8080")
let username

socket.onmessage = ({ data }) => {
	const parsedData = JSON.parse(data)
	const table = document.querySelector("table")
	const showMessage = (data) => {
		const tr = document.createElement("tr")
		const senderContainer = document.createElement("th")
		const messageContainer = document.createElement("td")
		senderContainer.innerText = data.sender
		messageContainer.innerText = data.message
		tr.appendChild(senderContainer)
		tr.appendChild(messageContainer)
		table.appendChild(tr)
	}
	if (parsedData.username) {
		username = parsedData.username
		parsedData.messages.forEach((data) => showMessage(data))
	} else showMessage(parsedData)
	document.querySelector("form").reset()
}

document.querySelector("form").onsubmit = (e) => {
	e.preventDefault()
	const message = document.querySelector("input").value
	const sendData = { sender: username, message }
	socket.send(JSON.stringify(sendData))
}
