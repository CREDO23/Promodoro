/** @format */
import Header from './composants/Header';
import Main from './composants/Main';
import './App.css';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
	session: { value: 30, isCurent: true },
	breaK: { value: 5, isCurent: false },
	inProgress: false,
};

const reducer = (state, action) => {
	let newState = { ...state };
	switch (action.type) {
		case 'INC_SESSION_TIME':
			newState.session.value++;
			return newState;
		case 'INC_BREAK_TIME':
			newState.breaK.value++;
			return newState;
		case 'DEC_SESSION_TIME':
			newState.session.value--;
			return newState;
		case 'DEC_BREAK_TIME':
			newState.breaK.value--;
			return newState;
		case 'PLAY_PAUSE':
			newState.inProgress = !newState.inProgress;
			return newState;
		case 'MOVE_TO':
			newState.session.isCurent = !newState.session.isCurent;
			newState.breaK.isCurent = !newState.breaK.isCurent;
			return newState;
		case 'RESET':
			newState.breaK.value = 5;
			newState.session.value = 30;
			return newState;
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return (
		<Store.Provider value={value}>
			<main>
				<Header />
				<Main />
			</main>
		</Store.Provider>
	);
};

export default App;
