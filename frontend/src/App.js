import React, { useState } from "react";

import { ROUTES } from "./utils/ENUMS";
import ChatBot from "./components/ChatBot";
import Login from "./components/Login";
import "./themes/main.scss";

function App() {
	const [page, setPage] = useState();
	const [credential, setCredential] = useState({
		email: "",
	});
	const [messages, setMessages] = useState([]);

	switch (page) {
		case ROUTES.LOGIN:
			return (
				<Login
					setPage={setPage}
					setCredential={setCredential}
					setMessages={setMessages}
				/>
			);
		case ROUTES.CHATBOT:
			return (
				<ChatBot
					setPage={setPage}
					credential={credential}
					messages={messages}
					setMessages={setMessages}
				/>
			);
		default:
			return (
				<Login
					setPage={setPage}
					setCredential={setCredential}
					setMessages={setMessages}
				/>
			);
	}
}

export default App;
