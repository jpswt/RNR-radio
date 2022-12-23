import React, { useState, useEffect } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImg from '../pngegg.png';

const Radio = () => {
	const [stations, setStations] = useState();
	const [stationFilter, setStationFilter] = useState('all');

	useEffect(() => {
		fetchRadioApi(stationFilter).then((data) => {
			setStations(data);
		});
	}, [stationFilter]);

	const fetchRadioApi = async (stationFilter) => {
		const api = new RadioBrowserApi('My Radio App');

		const stations = await api
			.searchStations({
				countryCode: 'US',
				tag: stationFilter,
				limit: 30,
				hideBroken: true,
			})
			.then((data) => {
				return data;
			});

		return stations;
	};

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

	const setDefaultSrc = (e) => {
		e.target.src = defaultImg;
	};

	return (
		<div className="radio">
			<div className="filters">
				{filters.map((genre, index) => (
					<span
						key={index}
						className={stationFilter === genre ? 'selected' : ''}
						onClick={() => setStationFilter(genre)}
					>
						{genre}
					</span>
				))}
			</div>
			<div className="stations">
				{stations &&
					stations.map((station, index) => (
						<div className="station" key={index}>
							<div className="stationName">
								<img
									className="logo"
									src={station.favicon}
									alt=""
									onError={setDefaultSrc}
								/>
								<div className="name">{station.name}</div>
							</div>
							<AudioPlayer
								className="player"
								src={station.urlResolved}
								showJumpControls={false}
								layout="stacked"
								customProgressBarSection={[]}
								customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
								autoPlayAfterSrcChange={false}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default Radio;
