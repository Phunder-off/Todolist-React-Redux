import React from "react";

const Message = ({ title = "Hi !", message = "Hello word" }) => {
	return (
		<div className="message">
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
};

export default Message;
