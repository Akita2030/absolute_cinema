import {
	AUTH_REGISTER_REQUEST,
	AUTH_REGISTER_SUCCESS,
	AUTH_REGISTER_FAILURE,
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGOUT,
	AUTH_HYDRATE
} from '../actions/authActions';

const loadAuth = () => {
	try {
		const raw = localStorage.getItem('authState');
		return raw ? JSON.parse(raw) : null;
	} catch (e) {
		return null;
	}
};

const initialState = loadAuth() || {
	isAuthenticated: false,
	user: null,
	loading: false,
	error: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_HYDRATE:
			return { ...state, ...action.payload };
		case AUTH_REGISTER_REQUEST:
		case AUTH_LOGIN_REQUEST:
			return { ...state, loading: true, error: null };
		case AUTH_REGISTER_SUCCESS:
		case AUTH_LOGIN_SUCCESS:
			return { ...state, loading: false, isAuthenticated: true, user: action.payload, error: null };
		case AUTH_REGISTER_FAILURE:
		case AUTH_LOGIN_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case AUTH_LOGOUT:
			return { ...state, isAuthenticated: false, user: null };
		default:
			return state;
	}
};

export default authReducer;
