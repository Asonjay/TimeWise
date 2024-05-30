// Credit: https://codepen.io/asonjay/pen/VwNBbMw
import React, { useEffect, useRef } from "react";
import $ from "jquery";
import { HEADER_ARRAY } from "../utils/CONSTANTS";

export const TypingHeader = () => {
	const typingHeaderRef = useRef(null);

	useEffect(() => {
		// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
		let i = 0,
			a = 0,
			isBackspacing = false,
			isParagraph = false;

		// Speed (in milliseconds) of typing.
		const speedForward = 100, //Typing Speed
			speedWait = 10000, // Wait between typing and backspacing
			speedBetweenLines = 1000, //Wait between first and second lines
			speedBackspace = 25; //Backspace Speed

		//Run the loop
		typeWriter(typingHeaderRef.current, HEADER_ARRAY);

		function typeWriter(element, ar) {
			var aString = ar[a],
				eHeader = $(element).find(".typing-header"), //Header element
				eParagraph = $(element).find("p"); //Subheader element

			// Determine if animation should be typing or backspacing
			if (!isBackspacing) {
				// If full string hasn't yet been typed out, continue typing
				if (i < aString.length) {
					// If character about to be typed is a pipe, switch to second line and continue.
					if (aString.charAt(i) === "|") {
						isParagraph = true;
						eHeader.removeClass("cursor");
						eParagraph.addClass("cursor");
						i++;
						setTimeout(function () {
							typeWriter(element, ar);
						}, speedBetweenLines);
					} else {
						// Type header or subheader depending on whether pipe has been detected
						if (!isParagraph) {
							eHeader.text(eHeader.text() + aString.charAt(i));
						} else {
							eParagraph.text(eParagraph.text() + aString.charAt(i));
						}
						i++;
						setTimeout(function () {
							typeWriter(element, ar);
						}, speedForward);
					}
				} else if (i === aString.length) {
					// If full string has been typed, switch to backspace mode.
					isBackspacing = true;
					setTimeout(function () {
						typeWriter(element, ar);
					}, speedWait);
				}
			} else {
				// If backspacing is enabled
				if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
					// If either the header or the paragraph still has text, continue backspacing
					if (eParagraph.text().length > 0) {
						eParagraph.text(
							eParagraph.text().substring(0, eParagraph.text().length - 1)
						);
					} else if (eHeader.text().length > 0) {
						eParagraph.removeClass("cursor");
						eHeader.addClass("cursor");
						eHeader.text(
							eHeader.text().substring(0, eHeader.text().length - 1)
						);
					}
					setTimeout(function () {
						typeWriter(element, ar);
					}, speedBackspace);
				} else {
					// If neither header nor paragraph still has text, switch to next quote in array and start typing.
					isBackspacing = false;
					i = 0;
					isParagraph = false;
					a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
					setTimeout(function () {
						typeWriter(element, ar);
					}, 50);
				}
			}
		}
	}, []);

	return (
		<div className="typing-header-container">
			<div ref={typingHeaderRef}>
				<div className="typing-header"></div>
			</div>
		</div>
	);
};
