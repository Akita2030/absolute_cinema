import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchShowtimes,
	reserveSeats,
	bookingClearMessage
} from '../store/actions/bookingActions';
import './BookingPage.css';

const BookingPage = () => {
	const dispatch = useDispatch();
	const { shows, loading, error, bookingMessage, bookings } = useSelector((state) => state.booking);
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const [selectedShow, setSelectedShow] = useState(null);
	const [form, setForm] = useState({ seats: 1, customerName: '', contact: '' });

	useEffect(() => {
		if (!shows.length) {
			dispatch(fetchShowtimes());
		}
	}, [dispatch, shows.length]);

	useEffect(() => {
		if (isAuthenticated && user) {
			setForm((prev) => ({
				...prev,
				customerName: user.username || user.email || prev.customerName,
				contact: user.email || prev.contact
			}));
		}
	}, [isAuthenticated, user]);

	useEffect(() => {
		if (bookingMessage || error) {
			const timer = setTimeout(() => dispatch(bookingClearMessage()), 4000);
			return () => clearTimeout(timer);
		}
	}, [bookingMessage, error, dispatch]);

	const upcomingBookings = useMemo(() => bookings.slice(-5).reverse(), [bookings]);

	const handleSelect = (show) => {
		setSelectedShow(show);
		setForm((prev) => ({
			...prev,
			seats: 1,
			customerName: isAuthenticated && user ? (user.username || user.email) : prev.customerName,
			contact: isAuthenticated && user ? (user.email || prev.contact) : prev.contact
		}));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!selectedShow) return;
		dispatch(
			reserveSeats({
				showId: selectedShow.id,
				seats: Number(form.seats),
				customerName: form.customerName,
				contact: form.contact
			})
		);
	};

	return (
		<div className="booking-page">
			<div className="container">
				<header className="booking-header">
					<h1>Бронирование сеансов</h1>
					<p>Выберите показ фильма Макото Синкая и забронируйте лучшие места.</p>
				</header>

				{loading && <div className="booking-status">Загружаем расписание...</div>}
				{error && <div className="booking-status error">{error}</div>}
				{bookingMessage && <div className="booking-status success">{bookingMessage}</div>}

				<section className="showtime-grid">
					{shows.map((show) => (
						<article key={show.id} className={`showtime-card ${selectedShow?.id === show.id ? 'active' : ''}`}>
							<div className="showtime-head">
								<h3>{show.title}</h3>
								<span className="showtime-badge">{show.date} · {show.time}</span>
							</div>
							<p className="showtime-desc">{show.description}</p>
							<ul className="showtime-meta">
								<li><strong>Зал:</strong> {show.hall}</li>
								<li><strong>Свободно мест:</strong> {show.availableSeats} из {show.totalSeats}</li>
								<li><strong>Цена:</strong> {show.price}₽</li>
							</ul>
							<button className="showtime-select" onClick={() => handleSelect(show)} disabled={show.availableSeats === 0}>
								{show.availableSeats === 0 ? 'Нет мест' : 'Выбрать сеанс'}
							</button>
						</article>
					))}
				</section>

				{selectedShow && (
					<section className="booking-form-section">
						<h2>Бронирование: {selectedShow.title}</h2>
						<form className="booking-form" onSubmit={handleSubmit}>
							<label>
								Количество мест
								<input
									type="number"
									min="1"
									max={selectedShow.availableSeats}
									name="seats"
									value={form.seats}
									onChange={handleChange}
									required
								/>
							</label>
							<label>
								Имя и фамилия
								<input
									type="text"
									name="customerName"
									value={form.customerName}
									onChange={handleChange}
									placeholder="Например, Иван Иванов"
									required
								/>
							</label>
							<label>
								Контакт (email или телефон)
								<input
									type="text"
									name="contact"
									value={form.contact}
									onChange={handleChange}
									placeholder="Для подтверждения брони"
									required
								/>
							</label>
							<div className="booking-form-actions">
								<button type="submit" disabled={loading}>
									{loading ? 'Отправляем...' : 'Забронировать места'}
								</button>
								<button type="button" className="secondary" onClick={() => setSelectedShow(null)}>
									Отменить
								</button>
							</div>
						</form>
					</section>
				)}

				<section className="booking-history">
					<h2>Последние брони</h2>
					{!upcomingBookings.length && <p className="booking-empty">Здесь появятся ваши подтвержденные бронирования.</p>}
					{upcomingBookings.length > 0 && (
						<ul className="booking-list">
							{upcomingBookings.map((booking) => (
								<li key={booking.confirmation}>
									<div className="booking-list-head">
										<h3>{booking.showTitle}</h3>
										<span>{new Date(booking.createdAt).toLocaleString('ru-RU')}</span>
									</div>
									<p>Мест: {booking.seats} · Контакт: {booking.contact}</p>
									<p className="booking-confirmation">Код подтверждения: {booking.confirmation}</p>
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</div>
	);
};

export default BookingPage;
