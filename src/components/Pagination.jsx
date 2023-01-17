import React from 'react';
import './pagination.css';

const Pagination = ({ stationsPerPage, totalStations, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalStations / stationsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul>
				{pageNumbers.map((number) => (
					<li key={number}>
						<a href="!#" onClick={() => paginate(number)}>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
