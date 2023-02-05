import React, { useState, useEffect } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Pagination';
import defaultImg from '../assets/radio-icon.png';
import Loader from './Loader';
import Pagination from './Pagination';
import '../components/radio.css';

const Radio = () => {
	const [stations, setStations] = useState();
	const [stationFilter, setStationFilter] = useState('all');
	const [stationClick, setStationClick] = useState();

	const [currentPage, setCurrentPage] = useState(1);
	const [stationsPerPage] = useState(8);

	useEffect(() => {
		fetchRadioApi(stationFilter).then((data) => {
			setStations(data);
			setStationClick(data);
			setCurrentPage(1);
		});
	}, [stationFilter]);

	const fetchRadioApi = async (stationFilter) => {
		const api = new RadioBrowserApi('My Radio App');

		const stations = await api
			.searchStations({
				countryCode: 'US',
				tag: stationFilter,
				limit: 80,
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

	if (!stations) {
		return <Loader />;
	}

	const indexOfLastStation = currentPage * stationsPerPage;
	const indexofFirstStation = indexOfLastStation - stationsPerPage;
	const currentStation = stations.slice(
		indexofFirstStation,
		indexOfLastStation
	);

	//change page
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className="radio">
			<div className="media-container">
				<h1>Rock-N-Radio</h1>
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
								layout="horizontal"
								customProgressBarSection={['CURRENT_TIME']}
								customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
								autoPlayAfterSrcChange={true}
							/>
						</div>
					</div>
				)}
				<div className="filters">
					{filters.map((genre, index) => (
						<span
							key={index}
							className={
								stationFilter === genre ? 'selected-genre' : 'station-genre'
							}
							onClick={() => {
								setStationFilter(genre);
							}}
						>
							{genre}
						</span>
					))}
				</div>
			</div>
			<div className="stations">
				{stations &&
					currentStation.map((station, index) => (
						<div className="station" key={index}>
							<div
								className="stations-info"
								onClick={() => {
									setStationClick(station);
								}}
							>
								<img
									className="logo"
									src={station.favicon}
									alt=""
									onError={setDefaultSrc}
								/>
								<div className="name">{station.name}</div>
							</div>
						</div>
					))}
			</div>
			<Pagination
				className="pagination"
				stationsPerPage={stationsPerPage}
				totalStations={stations.length}
				paginate={paginate}
			/>
		</div>
	);
};

export default Radio;
