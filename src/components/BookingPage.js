import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchShowtimes,
	reserveSeats,
	bookingClearMessage,
	removeBooking
} from '../store/actions/bookingActions';
import './BookingPage.css';

const BookingPage = () => {
	const dispatch = useDispatch();
	const { shows, loading, error, bookingMessage, bookings } = useSelector((state) => state.booking);
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const [selectedShow, setSelectedShow] = useState(null);
	const [form, setForm] = useState({ 
		seats: 1, 
		customerName: '', 
		contact: '',
		phone: '',
		email: '',
		eventType: '',
		date: ''
	});
	const [errors, setErrors] = useState({});
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState('date');

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
				contact: user.email || prev.contact,
				email: user.email || prev.email
			}));
		}
	}, [isAuthenticated, user]);

	useEffect(() => {
		if (bookingMessage || error) {
			const timer = setTimeout(() => dispatch(bookingClearMessage()), 4000);
			return () => clearTimeout(timer);
		}
	}, [bookingMessage, error, dispatch]);


	const handleSelect = (show) => {
		setSelectedShow(show);
		setForm((prev) => ({
			...prev,
			seats: 1,
			customerName: isAuthenticated && user ? (user.username || user.email) : prev.customerName,
			contact: isAuthenticated && user ? (user.email || prev.contact) : prev.contact,
			email: isAuthenticated && user ? (user.email || prev.email) : prev.email
		}));
		setErrors({});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		
		if (!form.customerName.trim()) {
			newErrors.customerName = 'Имя не может быть пустым';
		}
		
		if (!form.seats || form.seats < 1) {
			newErrors.seats = 'Количество гостей должно быть не менее 1';
		}
		
		if (!form.date) {
			newErrors.date = 'Дата должна быть выбрана';
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!selectedShow) return;
		
		if (!validateForm()) {
			return;
		}
		
		dispatch(
			reserveSeats({
				showId: selectedShow.id,
				seats: Number(form.seats),
				customerName: form.customerName,
				contact: form.contact,
				phone: form.phone,
				email: form.email,
				eventType: form.eventType,
				date: form.date
			})
		);
		
		setForm({ 
			seats: 1, 
			customerName: '', 
			contact: '',
			phone: '',
			email: '',
			eventType: '',
			date: ''
		});
		setErrors({});
		setSelectedShow(null);
	};

	const handleDelete = (bookingId) => {
		if (window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
			dispatch(removeBooking(bookingId));
		}
	};

	const filteredAndSortedBookings = useMemo(() => {
		let filtered = bookings;
		
		if (searchQuery.trim()) {
			filtered = filtered.filter((booking) =>
				booking.customerName.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		
		const sorted = [...filtered].sort((a, b) => {
			switch (sortBy) {
				case 'date':
					return new Date(b.createdAt) - new Date(a.createdAt);
				case 'seats':
					return b.seats - a.seats;
				case 'name':
					return a.customerName.localeCompare(b.customerName);
				default:
					return 0;
			}
		});
		
		return sorted;
	}, [bookings, searchQuery, sortBy]);

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
								{errors.seats && <span className="error-text">{errors.seats}</span>}
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
								{errors.customerName && <span className="error-text">{errors.customerName}</span>}
							</label>
							<label>
								Дата
								<input
									type="date"
									name="date"
									value={form.date}
									onChange={handleChange}
									required
								/>
								{errors.date && <span className="error-text">{errors.date}</span>}
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
							<label>
								Телефон
								<input
									type="tel"
									name="phone"
									value={form.phone}
									onChange={handleChange}
									placeholder="+7 (999) 123-45-67"
								/>
							</label>
							<label>
								Email
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									placeholder="example@mail.com"
								/>
							</label>
							<label>
								Тип мероприятия
								<select
									name="eventType"
									value={form.eventType}
									onChange={handleChange}
								>
									<option value="">Выберите тип</option>
									<option value="birthday">День рождения</option>
									<option value="meeting">Встреча</option>
									<option value="business">Деловой ужин</option>
									<option value="other">Другое</option>
								</select>
							</label>
							<div className="booking-form-actions">
								<button type="submit" disabled={loading}>
									{loading ? 'Отправляем...' : 'Забронировать места'}
								</button>
								<button type="button" className="secondary" onClick={() => {
									setSelectedShow(null);
									setErrors({});
								}}>
									Отменить
								</button>
							</div>
						</form>
					</section>
				)}

				<section className="booking-history">
					<h2>Список бронирований</h2>
					
					<div className="booking-controls">
						<div className="search-box">
							<label>
								Найти по имени
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Введите имя клиента..."
									className="search-input"
								/>
							</label>
						</div>
						<div className="sort-box">
							<label>
								Сортировать по:
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="sort-select"
								>
									<option value="date">Дате</option>
									<option value="seats">Количеству гостей</option>
									<option value="name">Имени</option>
								</select>
							</label>
						</div>
					</div>
					
					{!filteredAndSortedBookings.length && (
						<p className="booking-empty">
							{searchQuery ? 'Бронирования не найдены.' : 'Здесь появятся ваши подтвержденные бронирования.'}
						</p>
					)}
					{filteredAndSortedBookings.length > 0 && (
						<ul className="booking-list">
							{filteredAndSortedBookings.map((booking) => (
								<li key={booking.confirmation}>
									<div className="booking-list-head">
										<h3>{booking.showTitle}</h3>
										<button 
											className="delete-button"
											onClick={() => handleDelete(booking.confirmation)}
											title="Удалить бронирование"
										>
											Удалить
										</button>
									</div>
									<div className="booking-details">
										<p><strong>Имя:</strong> {booking.customerName}</p>
										<p><strong>Мест:</strong> {booking.seats}</p>
										<p><strong>Дата:</strong> {booking.date ? new Date(booking.date).toLocaleDateString('ru-RU') : 'Не указана'}</p>
										{booking.phone && <p><strong>Телефон:</strong> {booking.phone}</p>}
										{booking.email && <p><strong>Email:</strong> {booking.email}</p>}
										{booking.eventType && (
											<p><strong>Тип мероприятия:</strong> {
												booking.eventType === 'birthday' ? 'День рождения' :
												booking.eventType === 'meeting' ? 'Встреча' :
												booking.eventType === 'business' ? 'Деловой ужин' :
												'Другое'
											}</p>
										)}
										<p><strong>Контакт:</strong> {booking.contact}</p>
										<p><strong>Создано:</strong> {new Date(booking.createdAt).toLocaleString('ru-RU')}</p>
										<p className="booking-confirmation">Код подтверждения: {booking.confirmation}</p>
									</div>
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


