// src/Login.js
import React, { useState } from "react";
import { ROUTES } from "../utils/ENUMS";
import { getChatHistory } from "../utils/backend";

function Login({ setPage, setCredential, setMessages }) {
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		var emailValue = document.getElementById("email").value.trim();

		if (emailValue !== "") {
			console.log("Login with:", emailValue);
			setCredential({ email: emailValue });
			setIsLoading(true);
			await getChatHistory(
				{ email: emailValue },
				setIsLoading,
				setPage,
				setMessages
			);
		}
	};

	return (
		<div className="login-container">
			<div className="wrapper">
				<div>
					<h3>
						<i className="fas fa-users"></i> Login
					</h3>
				</div>
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="input-field">
						<i className="fas fa-user"></i>
						<input
							required
							id="email"
							type="email"
							placeholder="&nbsp;"
							autoComplete="off"
						/>
						<label htmlFor="email">Email</label>
					</div>

					{/* <div className="input-field">
						<i className="fas fa-lock"></i>
						<input
							id="password"
							type="password"
							placeholder="&nbsp;"
							autocomplete="off"
						/>
						<label for="password">Password</label>
					</div> */}
					{/* <h5>
						<a href="#">
							Forgot password? <span>click here</span>
						</a>
						<a href="#">
							<span>Sign up</span>
						</a>
					</h5> */}
					<input className="btn-submit" type="submit" value="Login" />
				</form>
			</div>
		</div>
	);
}

export default Login;
