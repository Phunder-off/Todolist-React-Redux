import React from "react";

const Loader = ({ message = "Chargement..." }) => {
	return (
		<div id="loader">
			<span className="loading"></span>
			<p>{message}</p>
		</div>
	);
};

export default Loader;
