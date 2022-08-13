/** @format */
import { Store } from '../App';
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi';
import { useContext } from 'react';

const Footer = () => {
	const { state, dispatch } = useContext(Store);
	return (
		<footer>
			<button
				onClick={() => {
					dispatch({ type: 'PLAY_PAUSE' });
				}}>
				{state.inProgress ? <FiPause /> : <FiPlay />}
			</button>
			<button
				onClick={() => {
					dispatch({ type: 'RESET' });
				}}>
				{<FiRefreshCw />}
			</button>
		</footer>
	);
};

export default Footer;
