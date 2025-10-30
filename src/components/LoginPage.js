import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLoginRequest } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error, isAuthenticated } = useSelector(s => s.auth);
	const [form, setForm] = useState({ email: '', password: '' });

	const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		dispatch(authLoginRequest(form));
	};

	if (isAuthenticated) {
		navigate('/');
	}

	return (
		<div className="auth-page">
			<div className="auth-card">
				<h2>Вход</h2>
				<form onSubmit={onSubmit}>
					<input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
					<input name="password" type="password" placeholder="Пароль" value={form.password} onChange={onChange} />
					{error && <div className="auth-error">{error}</div>}
					<button type="submit" disabled={loading}>{loading ? 'Входим...' : 'Войти'}</button>
				</form>
				<p className="auth-alt" onClick={() => navigate('/register')}>Нет аккаунта? Регистрация</p>
			</div>
		</div>
	);
};

export default LoginPage;
