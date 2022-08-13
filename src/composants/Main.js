/** @format */
import { Store } from '../App';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import { useContext, useRef, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Main = () => {
	const { state, dispatch } = useContext(Store);
	let { session, breaK } = state;

	const [minutesLeft, setMinutesLeft] = useState(session.value);
	const [secondesLeft, setSecondesLeft] = useState(0);

	let minutesRef = useRef(minutesLeft);
	let secondsRef = useRef(secondesLeft);

	const curentlengthSession = useRef(session.value);
	const curentlengthBreak = useRef(breaK.value);

	const interval = useRef();

	const parseNumberHandle = (num) => {
		return num.toString().length > 1 ? num : `0${num}`;
	};

	const countFunction = (minutes, secondes = 0) => {
		let lengthSession = curentlengthSession.current;
		let lengthBreak = curentlengthBreak.current;

		session.isCurent
			? ([secondsRef.current, minutesRef.current] =
					lengthSession !== session.value
						? [0, session.value]
						: [secondes, minutes])
			: ([secondsRef.current, minutesRef.current] =
					lengthBreak !== breaK.value
						? [0, breaK.value]
						: [secondes, minutes]);

		setSecondesLeft(secondsRef.current);
		setSecondesLeft(minutesRef.current);

		curentlengthSession.current = session.value;
		curentlengthBreak.current = breaK.value;

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
				dispatch({ type: 'MOVE_TO' });
				session.isCurent
					? countFunction(breaK.value, 0)
					: countFunction(session.value, 0);
			}
		}, 500);
	};

	return (
		<>
			<section>
				<div>
					<CircularProgressbarWithChildren
						className='progress'
						value={60}>
						<p style={{ fontSize: 20, fontWeight: 300 }}>
							{session.isCurent ? 'Session' : 'Break'}
						</p>
						<h2 style={{ fontSize: 50 }}>
							{' '}
							<span>
								{state.inProgress
									? minutesRef.current || secondsRef.current
										? parseNumberHandle(minutesRef.current)
										: session.isCurent
										? parseNumberHandle(session.value)
										: parseNumberHandle(breaK.value)
									: curentlengthSession.current !== session.value
									? session.isCurent
										? parseNumberHandle(session.value)
										: parseNumberHandle(minutesRef.current)
									: curentlengthBreak.current !== breaK.value
									? parseNumberHandle(breaK.value)
									: parseNumberHandle(minutesRef.current)}
							</span>{' '}
							:{' '}
							<span>
								{curentlengthSession.current !== session.value ||
								curentlengthBreak.current !== breaK.value
									? session.isCurent
										? parseNumberHandle(0)
										: parseNumberHandle(0)
									: parseNumberHandle(secondsRef.current) ??
									  parseNumberHandle(0)}
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
										: session.value,
									secondsRef.current !== 0 ? secondsRef.current : 0,
									session.value,
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
