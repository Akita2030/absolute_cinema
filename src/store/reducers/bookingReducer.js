import {
	BOOKING_FETCH_REQUEST,
	BOOKING_FETCH_SUCCESS,
	BOOKING_FETCH_FAILURE,
	BOOKING_RESERVE_REQUEST,
	BOOKING_RESERVE_SUCCESS,
	BOOKING_RESERVE_FAILURE,
	BOOKING_CLEAR_MESSAGE,
	BOOKING_REMOVE
} from '../actions/bookingActions';

const loadBookings = () => {
	try {
		const raw = localStorage.getItem('bookingState');
		return raw ? JSON.parse(raw) : { bookings: [] };
	} catch (error) {
		return { bookings: [] };
	}
};

const persist = (state) => {
	try {
		localStorage.setItem('bookingState', JSON.stringify({ bookings: state.bookings }));
	} catch (error) {
		// no op
	}
};

const initialState = {
	shows: [],
	loading: false,
	error: null,
	bookingMessage: null,
	bookings: loadBookings().bookings || []
};

const bookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case BOOKING_FETCH_REQUEST:
			return { ...state, loading: true, error: null };
		case BOOKING_FETCH_SUCCESS:
			return { ...state, loading: false, shows: action.payload, error: null };
		case BOOKING_FETCH_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case BOOKING_RESERVE_REQUEST:
			return { ...state, loading: true, bookingMessage: null, error: null };
		case BOOKING_RESERVE_SUCCESS: {
			const { showId, seats, customerName, contact, phone, email, eventType, date, confirmation, showTitle } = action.payload;
			const updatedShows = state.shows.map((show) =>
				show.id === showId ? { ...show, availableSeats: show.availableSeats - seats } : show
			);
			const bookingRecord = {
				showId,
				showTitle,
				seats,
				customerName,
				contact,
				phone,
				email,
				eventType,
				date,
				confirmation,
				createdAt: new Date().toISOString()
			};
			const bookings = [...state.bookings, bookingRecord];
			const nextState = {
				...state,
				loading: false,
				shows: updatedShows,
				bookingMessage: `Бронь подтверждена: ${confirmation}`,
				bookings
			};
			persist(nextState);
			return nextState;
		}
		case BOOKING_RESERVE_FAILURE:
			return { ...state, loading: false, error: action.payload };
		case BOOKING_CLEAR_MESSAGE:
			return { ...state, bookingMessage: null, error: null };
		case BOOKING_REMOVE: {
			const bookings = state.bookings.filter((booking) => booking.confirmation !== action.payload);
			const nextState = { ...state, bookings };
			persist(nextState);
			return nextState;
		}
		default:
			return state;
	}
};

export default bookingReducer;


