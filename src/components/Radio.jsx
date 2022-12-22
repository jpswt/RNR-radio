import React, { useState, useEffect } from 'react';
import { RadioBrowserAPI } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Radio = () => {
	const [stations, setStations] = useState();
	const [stationFilter, setStationFilter] = useState('all');

	const filters = [
		'all',
		'classical',
		'country',
		'dance',
		'disco',
		'house',
		'jazz',
		'pop',
		'rap',
		'retro',
		'rock',
	];

	return (
		<div className="radio">
			<div className="filters">
				{filters.map((genre) => (
					<span
						className={stationFilter === genre ? 'selected' : ''}
						onClick={() => setStationFilter(genre)}
					>
						{genre}
					</span>
				))}
			</div>
		</div>
	);
};

export default Radio;
