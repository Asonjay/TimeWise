import { useEffect } from "react";

export const useBorderToggle = () => {
	useEffect(() => {
		const intervalId = setInterval(() => {
			const messageInput = document.querySelector(".cs-message-input");
			const typingIndicator = document.querySelector(".cs-typing-indicator");

			console.log("messageInput: ", typingIndicator);
			if (messageInput && typingIndicator) {
				// Once elements are found, clear the interval
				clearInterval(intervalId);

				// Define the toggleBorder function
				const toggleBorder = () => {
					// Use 'getComputedStyle' to check the actual visibility of the typingIndicator
					const isVisible =
						window.getComputedStyle(typingIndicator).display !== "none";
					if (isVisible) {
						messageInput.classList.remove("border-top-active");
					} else {
						messageInput.classList.add("border-top-active");
					}
				};

				// Set up the MutationObserver to observe changes
				const observer = new MutationObserver(toggleBorder);

				// Start observing the typingIndicator for style changes
				observer.observe(typingIndicator, {
					attributes: true,
					attributeFilter: ["style"],
				});

				// Run toggleBorder initially in case the typingIndicator's visibility is already set
				toggleBorder();

				// Clean up function to disconnect the observer when the effect is cleaned up
				return () => observer.disconnect();
			}
		}, 100); // Check every 100 milliseconds

		// Clear the interval when the component unmounts or the effect is cleaned up
		return () => clearInterval(intervalId);
	}, []); // Empty dependency array ensures this effect runs only once on component mount
};
