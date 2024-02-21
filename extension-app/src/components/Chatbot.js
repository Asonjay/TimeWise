import React from "react";
import { FaUserGear } from "react-icons/fa6";
import { ROUTES } from "../utils/routes";

function Chatbot({ setPage }) {
	function sendToLanguageModel(message) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve("Hello! How can I assist you?"); // Replace with your actual API call
			}, 1000);
		});
	}

	const Popup = () => {
		const [messages, setMessages] = useState([]);
		const [userInput, setUserInput] = useState("");
		const chatBodyRef = useRef(null);

		// Send message to language model
		const handleSubmit = async (event) => {
			event.preventDefault();

			setMessages([...messages, { text: userInput, isBot: false }]);
			setUserInput("");

			try {
				const response = await sendToLanguageModel(userInput);
				setMessages([...messages, { text: response, isBot: true }]);
			} catch (error) {
				console.error("Error fetching chatbot response:", error);
			}
		};

		// Scroll to the bottom on new message
		useEffect(() => {
			if (chatBodyRef.current) {
				chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
			}
		}, [messages]);

		return (
			<div id="chat-container">
				{/* ... Chat header ... */}
				<div id="chat-body" ref={chatBodyRef}>
					{messages.map((message, index) => (
						<div
							key={index}
							className={message.isBot ? "bot-message" : "user-message"}
						>
							{message.text}
						</div>
					))}
				</div>
				{/* ... Chat Input ... */}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		);
	};
}

export default Chatbot;
