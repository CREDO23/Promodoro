/** @format */
import { Store } from '../App';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import { useContext, useRef, useState } from 'react';
import sound from '../ringtones/mixkit-toy-telephone-ring-1351.wav';

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

	const ring = new Audio(sound);

	const parseNumberHandle = (num) => {
		return num.toString().length > 1 ? num : `0${num}`;
	};

	const resetFunction = () => {
		clearInterval(interval.current);
		dispatch({ type: 'RESET' });
		state.inProgress
			? dispatch({ type: 'PLAY_PAUSE' })
			: (secondsRef.current = 0);
		minutesRef.current = 30;
		secondsRef.current = 0;
		if (breaK.isCurent) {
			breaK.isCurent = false;
			session.isCurent = true;
		}
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
		setMinutesLeft(minutesRef.current);

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
				ring.play();
				clearInterval(interval.current);
				dispatch({ type: 'MOVE_TO' });
				session.isCurent
					? countFunction(breaK.value, 0)
					: countFunction(session.value, 0);
			}
		}, 1000);
	};

	return (
		<>
			<section>
				<div
					className={
						session.isCurent ? 'circle inSession' : 'circle inBreak'
					}>
					<div>
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
								{curentlengthBreak.current !== breaK.value ||
								curentlengthSession.current !== session.value
									? parseNumberHandle(0)
									: parseNumberHandle(secondsRef.current)}
							</span>{' '}
						</h2>
					</div>
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
							  )
							: clearInterval(interval.current);

						dispatch({ type: 'PLAY_PAUSE' });
					}}>
					{state.inProgress ? <FiPause /> : <FiPlay />}
				</button>
				<button onClick={() => resetFunction()}>
					<FiRefreshCw />
				</button>
			</footer>
		</>
	);
};

export default Main;
