/** @format */
import Header from './composants/Header';
import Main from './composants/Main';
import './App.css';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
	sessionLength: { value: 30, isCurent: true },
	breakLength: { value: 5, isCurent: false },
	inProgress: false,
};

const reducer = (state, action) => {
	let newState = { ...state };
	switch (action.type) {
		case 'INC_SESSION_TIME':
			newState.sessionLength.value++;
			return newState;
		case 'INC_BREAK_TIME':
			newState.breakLength.value++;
			return newState;
		case 'DEC_SESSION_TIME':
			newState.sessionLength.value--;
			return newState;
		case 'DEC_BREAK_TIME':
			newState.breakLength.value--;
			return newState;
		case 'PLAY_PAUSE':
			newState.inProgress = !newState.inProgress;
			return newState;

		case 'MOVE_TO':
			newState.sessionLength.isCurent =
				!newState.sessionLength.isCurent;
			newState.breakLength.isCurent = !newState.breakLength.isCurent;
			return newState;
		case 'RESET':
			newState.breakLength.value = 5;
			newState.sessionLength.value = 30;
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
