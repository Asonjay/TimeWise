import React from "react";
import { ROUTES } from "../utils/routes";
import { saveData } from "../utils/localStorage";

function Profile({ setPage, resume, setResume, openAIKey, setOpenAIKey }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const updatedResume = formData.get("resume");
		const updatedOpenAIKey = formData.get("openAIKey");
		setResume(updatedResume);
		setOpenAIKey(updatedOpenAIKey);
		saveData("resume", updatedResume);
		saveData("openAIKey", updatedOpenAIKey);
	};
	return (
		<div className="flex flex-col  mx-5">
			<div className="flex flex-row justify-between my-3 items-center">
				<h2 className="text-2xl font-bold">Profile</h2>
				<button
					onClick={() => {
						setPage(ROUTES.GENERATOR);
					}}
					className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
				>
					Back
				</button>
			</div>

			<form className="flex-col" onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor="openAIKey"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your Open AI Key
					</label>
					<input
						id="openAIKey"
						name="openAIKey"
						type="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="sk-...1234" // Replace with your OpenAI key
						defaultValue={openAIKey} // default value
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="resume"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your Resume
					</label>
					<textarea
						id="resume"
						name="resume"
						rows={8}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Paste your resume here..."
						defaultValue={resume}
					></textarea>
				</div>
				<div className="mb-6 text-center">
					<button
						type="submit"
						className="border-2 border-solid border-blue-500 text-blue-500 text-lg rounded-md px-5 py-2 hover:text-white hover:bg-blue-500"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default Profile;
