import React from 'react';
import './loader.css';

const Loader = () => {
	return (
		<div>
			<h2 className="title">Loading</h2>
			<div className="bar-container">
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
			</div>
		</div>
	);
};

export default Loader;
