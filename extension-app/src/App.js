import React, { useEffect, useState } from "react";

import ChatBot from "./components/ChatBot";
import Generator from "./components/Generator";
import Profile from "./components/Profile";
import { ROUTES } from "./utils/enums";
import { loadData } from "./utils/localStorage";

function App() {
	const [page, setPage] = useState();
	const [resume, setResume] = useState("resume text here...");
	const [openAIKey, setOpenAIKey] = useState("openAIKey text here...");

	useEffect(() => {
		const fetchLocalData = async () => {
			const fetchedResume = await loadData("resume");
			const fetchedOpenAIKey = await loadData("openAIKey");
			setResume(fetchedResume);
			setOpenAIKey(fetchedOpenAIKey);
		};

		fetchLocalData();
	}, []);

	switch (page) {
		case ROUTES.GENERATOR:
			return <Generator setPage={setPage} />;
		case ROUTES.PROFILE:
			return (
				<Profile
					setPage={setPage}
					resume={resume}
					setResume={setResume}
					openAIKey={openAIKey}
					setOpenAIKey={setOpenAIKey}
				/>
			);
		default:
			return <ChatBot setPage={setPage} />;
	}
}

export default App;
