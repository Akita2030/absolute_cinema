export const BOOKING_FETCH_REQUEST = 'BOOKING_FETCH_REQUEST';
export const BOOKING_FETCH_SUCCESS = 'BOOKING_FETCH_SUCCESS';
export const BOOKING_FETCH_FAILURE = 'BOOKING_FETCH_FAILURE';

export const BOOKING_RESERVE_REQUEST = 'BOOKING_RESERVE_REQUEST';
export const BOOKING_RESERVE_SUCCESS = 'BOOKING_RESERVE_SUCCESS';
export const BOOKING_RESERVE_FAILURE = 'BOOKING_RESERVE_FAILURE';

export const BOOKING_CLEAR_MESSAGE = 'BOOKING_CLEAR_MESSAGE';
export const BOOKING_REMOVE = 'BOOKING_REMOVE';

const mockShowtimes = [
	{
		id: 1,
		title: 'Твоё имя — показ на большом экране',
		date: '2025-10-22',
		time: '19:30',
		hall: 'IMAX Зал 1',
		totalSeats: 120,
		availableSeats: 48,
		price: 580,
		description: 'Специальная ретроспектива с эксклюзивным интро от режиссера'
	},
	{
		id: 2,
		title: 'Погода с тобой — ночь премьер',
		date: '2025-10-23',
		time: '21:00',
		hall: 'Premium Hall',
		totalSeats: 90,
		availableSeats: 32,
		price: 520,
		description: 'Показ в оригинальной озвучке с субтитрами'
	},
	{
		id: 3,
		title: 'Судзумэ — дневной сеанс',
		date: '2025-10-24',
		time: '15:45',
		hall: 'Зал Atmos',
		totalSeats: 150,
		availableSeats: 118,
		price: 450,
		description: 'Сеанс в формате Dolby Atmos'
	}
];

export const bookingFetchRequest = () => ({ type: BOOKING_FETCH_REQUEST });
export const bookingFetchSuccess = (shows) => ({ type: BOOKING_FETCH_SUCCESS, payload: shows });
export const bookingFetchFailure = (error) => ({ type: BOOKING_FETCH_FAILURE, payload: error });

export const bookingReserveRequest = () => ({ type: BOOKING_RESERVE_REQUEST });
export const bookingReserveSuccess = (payload) => ({ type: BOOKING_RESERVE_SUCCESS, payload });
export const bookingReserveFailure = (error) => ({ type: BOOKING_RESERVE_FAILURE, payload: error });

export const bookingClearMessage = () => ({ type: BOOKING_CLEAR_MESSAGE });
export const removeBooking = (bookingId) => ({ type: BOOKING_REMOVE, payload: bookingId });

export const fetchShowtimes = () => async (dispatch) => {
	dispatch(bookingFetchRequest());
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));
		dispatch(bookingFetchSuccess(mockShowtimes));
	} catch (error) {
		dispatch(bookingFetchFailure('Не удалось загрузить расписание.')); 
	}
};

export const reserveSeats = ({ showId, seats, customerName, contact, phone, email, eventType, date }) => async (dispatch, getState) => {
	dispatch(bookingReserveRequest());
	try {
		await new Promise((resolve) => setTimeout(resolve, 500));
		const { shows } = getState().booking;
		const show = shows.find((item) => item.id === showId);
		if (!show) {
			throw new Error('Сеанс не найден.');
		}
		if (!seats || seats < 1) {
			throw new Error('Укажите количество мест.');
		}
		if (seats > show.availableSeats) {
			throw new Error('Недостаточно свободных мест для брони.');
		}
		const confirmation = `ABS-${Date.now().toString().slice(-6)}`;
		dispatch(bookingReserveSuccess({
			showId,
			seats,
			customerName,
			contact,
			phone,
			email,
			eventType,
			date,
			confirmation,
			showTitle: show.title
		}));
	} catch (error) {
		dispatch(bookingReserveFailure(error.message));
	}
};


