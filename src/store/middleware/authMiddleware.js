import {
	authRegisterSuccess,
	authRegisterFailure,
	authLoginSuccess,
	authLoginFailure,
	authLogout,
	AUTH_REGISTER_REQUEST,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGOUT
} from '../actions/authActions';

// Simulated async API using setTimeout. Replace with real API later
const fakeApi = {
	register: async ({ username, email, password }) => {
		await new Promise(r => setTimeout(r, 500));
		if (!username || !email || !password) throw new Error('Все поля обязательны');
		if (password.length < 6) throw new Error('Пароль должен быть не менее 6 символов');
		return { id: Date.now(), username, email };
	},
	login: async ({ email, password }) => {
		await new Promise(r => setTimeout(r, 400));
		if (!email || !password) throw new Error('Введите email и пароль');
		// Accept any email/password for demo; could validate against saved user
		return { id: Date.now(), username: email.split('@')[0], email };
	}
};

const persist = (state) => {
	try { localStorage.setItem('authState', JSON.stringify(state)); } catch {}
};

const clearPersist = () => {
	try { localStorage.removeItem('authState'); } catch {}
};

const authMiddleware = store => next => async action => {
	next(action);
	if (action.type === AUTH_REGISTER_REQUEST) {
		try {
			const user = await fakeApi.register(action.payload);
			store.dispatch(authRegisterSuccess(user));
			persist({ isAuthenticated: true, user });
		} catch (e) {
			store.dispatch(authRegisterFailure(e.message));
		}
	}
	if (action.type === AUTH_LOGIN_REQUEST) {
		try {
			const user = await fakeApi.login(action.payload);
			store.dispatch(authLoginSuccess(user));
			persist({ isAuthenticated: true, user });
		} catch (e) {
			store.dispatch(authLoginFailure(e.message));
		}
	}
	if (action.type === AUTH_LOGOUT) {
		clearPersist();
	}
};

export default authMiddleware;
