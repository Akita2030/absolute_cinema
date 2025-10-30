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

// Helpers to work with localStorage "users" list
const loadUsers = () => {
    try {
        const raw = localStorage.getItem('users');
        return raw ? JSON.parse(raw) : [];
    } catch (_) {
        return [];
    }
};
const saveUsers = (users) => {
    try { localStorage.setItem('users', JSON.stringify(users)); } catch {}
};

// Simulated async API using setTimeout. Validates against locally stored users
const fakeApi = {
    register: async ({ username, email, password }) => {
        await new Promise(r => setTimeout(r, 400));
        if (!username || !email || !password) throw new Error('Все поля обязательны');
        if (password.length < 6) throw new Error('Пароль должен быть не менее 6 символов');
        const users = loadUsers();
        const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) throw new Error('Пользователь с таким email уже существует');
        const user = { id: Date.now(), username, email, password };
        users.push(user);
        saveUsers(users);
        // Do not return password with user object
        const { password: _pw, ...publicUser } = user;
        return publicUser;
    },
    login: async ({ email, password }) => {
        await new Promise(r => setTimeout(r, 300));
        if (!email || !password) throw new Error('Введите email и пароль');
        const users = loadUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) throw new Error('Пользователь не найден. Пройдите регистрацию.');
        if (user.password !== password) throw new Error('Неверный пароль');
        const { password: _pw, ...publicUser } = user;
        return publicUser;
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
