// Auth action types
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_HYDRATE = 'AUTH_HYDRATE';

// Action creators
export const authRegisterRequest = (payload) => ({ type: AUTH_REGISTER_REQUEST, payload });
export const authRegisterSuccess = (user) => ({ type: AUTH_REGISTER_SUCCESS, payload: user });
export const authRegisterFailure = (error) => ({ type: AUTH_REGISTER_FAILURE, payload: error });

export const authLoginRequest = (payload) => ({ type: AUTH_LOGIN_REQUEST, payload });
export const authLoginSuccess = (user) => ({ type: AUTH_LOGIN_SUCCESS, payload: user });
export const authLoginFailure = (error) => ({ type: AUTH_LOGIN_FAILURE, payload: error });

export const authLogout = () => ({ type: AUTH_LOGOUT });
export const authHydrate = (state) => ({ type: AUTH_HYDRATE, payload: state });
