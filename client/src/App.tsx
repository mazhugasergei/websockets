import { FormEvent, useEffect, useRef, useState } from "react"
import { LuSendHorizonal } from "react-icons/lu"

export default () => {
	const [socket, setSocket] = useState<WebSocket>()
	const username = useRef()
	const [messages, setMessages] = useState<{ sender: string; message: string }[]>([])
	const [message, setMessage] = useState("")

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		const sendData = { sender: username.current, message }
		socket?.send(JSON.stringify(sendData))
		setMessage("")
	}

	useEffect(() => {
		const newSocket = new WebSocket("ws://192.168.151.186:8080")
		setSocket(newSocket)
	}, [])

	useEffect(() => {
		if (socket)
			socket.onmessage = ({ data }) => {
				const parsedData = JSON.parse(data)
				if (parsedData.username) {
					username.current = parsedData.username
					setMessages(parsedData.messages)
				} else setMessages((prev) => [...prev, parsedData])
				document.querySelector("form")?.reset()
			}
	}, [socket])

	return (
		<div className="cont">
			<div className="messages">
				{messages.map((message, i) => (
					<div className="messageCont" key={i}>
						<div className="sender">{message.sender}</div>
						<div className="message">{message.message}</div>
					</div>
				))}
			</div>
			<form onSubmit={onSubmit}>
				<textarea value={message} onChange={(e) => setMessage(e.target.value)} />
				<button>
					<LuSendHorizonal />
				</button>
			</form>
		</div>
	)
}
