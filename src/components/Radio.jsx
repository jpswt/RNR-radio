import React, { useState, useEffect, useCallback } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImg from '../pngegg.png';
import '../components/radio.css';
import { useCallback } from 'react';

const Radio = () => {
	const [stations, setStations] = useState();
	const [stationFilter, setStationFilter] = useState('all');
	const [stationClick, setStationClick] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	let numStations = stations.length;
	let limit = 8;

	const onPageChange = useCallback(
		(event, page) => {
			event.preventDefault();
			setCurrentPage(page);
		},
		[setCurrentPage]
	);

	useEffect(() => {
		fetchRadioApi(stationFilter).then((data) => {
			setStations(data);
			setStationClick(data);
		});
	}, [stationFilter]);

	const fetchRadioApi = async (stationFilter) => {
		const api = new RadioBrowserApi('My Radio App');

		const stations = await api
			.searchStations({
				countryCode: 'US',
				tag: stationFilter,
				limit: 52,
				offset: 1,
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

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	if (!stations) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="radio">
			<div className="media-container">
				{stations && (
					<div className="player-container">
						<div className="player-logo-container">
							<img
								className="player-logo"
								src={stationClick.favicon || defaultImg}
								onError={setDefaultSrc}
								alt=""
							/>
							<div className="station-name">
								{stationClick.name || 'Select a Station'}
							</div>
						</div>
						<div className="player-info">
							<AudioPlayer
								className="player"
								src={stationClick.urlResolved}
								showJumpControls={false}
								// header={stationClick.name}
								layout="horizontal"
								customProgressBarSection={['CURRENT_TIME']}
								customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
								autoPlayAfterSrcChange={true}
							/>
						</div>
					</div>
				)}
			</div>
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
									onClick={() => {
										setStationClick(station);
										scrollToTop();
									}}
								/>
								<div className="name">{station.name}</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Radio;
