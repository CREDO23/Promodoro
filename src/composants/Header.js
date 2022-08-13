/** @format */
import { Store } from '../App';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { useContext } from 'react';
const Header = () => {
	const { state, dispatch } = useContext(Store);
	return (
		<header>
			<div>
				<p>Break Length</p>
				<span className='breack-length'>
					{state.breakLength.value}
				</span>
				<div>
					<button
						disabled={state.inProgress}
						onClick={() => {
							dispatch({ type: 'INC_BREAK_TIME' });
						}}>
						{<BiUpArrow />}
					</button>
					<button
						disabled={state.inProgress}
						onClick={() => {
							dispatch({ type: 'DEC_BREAK_TIME' });
						}}>
						{<BiDownArrow />}
					</button>
				</div>
			</div>
			<div className='divider'></div>
			<div>
				<p>Session Length</p>
				<span className='session-length'>
					{state.sessionLength.value}
				</span>
				<div>
					<button
						disabled={state.inProgress}
						onClick={() => {
							dispatch({ type: 'INC_SESSION_TIME' });
						}}>
						{<BiUpArrow />}
					</button>
					<button
						disabled={state.inProgress}
						onClick={() => {
							dispatch({ type: 'DEC_SESSION_TIME' });
						}}>
						{<BiDownArrow />}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
