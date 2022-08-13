/** @format */
import { Store } from '../App';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import { useContext, useRef, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Main = () => {
	const { state, dispatch } = useContext(Store);
	let { sessionLength, breakLength } = state;

	const [minutesLeft, setMinutesLeft] = useState(sessionLength.value);
	const [secondesLeft, setSecondesLeft] = useState(0);

	let minutesRef = useRef(minutesLeft);
	let secondsRef = useRef(secondesLeft);
	const curentlength = useRef(sessionLength.value);
	const interval = useRef();

	const parseHandle = (num) => {
		return num.toString().length > 1 ? num : `0${num}`;
	};

	const countFunction = (minutes, secondes = 0) => {
		let length = curentlength.current;

		[secondsRef.current, minutesRef.current] =
			length !== sessionLength.value
				? [0, sessionLength.value]
				: [secondes, minutes];

		// secondsRef.current =
		// 	length !== sessionLength.value ? 0 : secondes;
		// minutesRef.current =
		// 	length !== sessionLength.value ? sessionLength.value : minutes;
		setSecondesLeft(secondsRef.current);
		setSecondesLeft(minutesRef.current);

		curentlength.current = sessionLength.value;
		interval.current = setInterval(() => {
			if (secondsRef.current > 0) {
				secondsRef.current--;
				setSecondesLeft(secondsRef.current);
			}
			if (secondsRef.current === 0 && minutesRef.current > 0) {
				minutesRef.current--;
				setMinutesLeft(minutesRef.current);
				secondsRef.current = 59;
				setSecondesLeft(secondsRef.current);
			} else if (
				secondsRef.current === 0 &&
				minutesRef.current === 0
			) {
				clearInterval(interval.current);
				dispatch({ type: 'PLAY_PAUSE' });
			}
		}, 1000);
	};

	return (
		<>
			<section>
				<div>
					<CircularProgressbarWithChildren
						className='progress'
						value={60}>
						<p style={{ fontSize: 20, fontWeight: 300 }}>Session</p>
						<h2 style={{ fontSize: 50 }}>
							{' '}
							<span>
								{state.inProgress
									? minutesRef.current || secondsRef.current
										? parseHandle(minutesRef.current)
										: parseHandle(sessionLength.value)
									: curentlength.current !== sessionLength.value
									? parseHandle(sessionLength.value)
									: parseHandle(minutesRef.current)}
							</span>{' '}
							:{' '}
							<span>
								{curentlength.current !== sessionLength.value
									? parseHandle(0)
									: parseHandle(secondsRef.current) ?? parseHandle(0)}
							</span>{' '}
						</h2>
					</CircularProgressbarWithChildren>
				</div>
			</section>
			<footer>
				<button
					onClick={() => {
						!state.inProgress
							? countFunction(
									minutesRef.current !== 0 || secondsRef.current
										? minutesRef.current
										: sessionLength.value,
									secondsRef.current !== 0 ? secondsRef.current : 0,
							  )
							: clearInterval(interval.current);

						dispatch({ type: 'PLAY_PAUSE' });
					}}>
					{state.inProgress ? <FiPause /> : <FiPlay />}
				</button>
				<button
					onClick={() => {
						dispatch({ type: 'RESET' });
					}}>
					<FiRefreshCw />
				</button>
			</footer>
		</>
	);
};

export default Main;
