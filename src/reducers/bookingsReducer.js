import {
    BOOKING_CREATE_FAIL, BOOKING_CREATE_REQUEST, BOOKING_CREATE_RESET, BOOKING_CREATE_SUCCESS,
    ALL_BOOKINGS_REQUEST, ALL_BOOKINGS_SUCCESS, ALL_BOOKINGS_FAIL,
    CLEAR_BOOKINGS_ERRORS,
    BOOKING_UPDATE_REQUEST,
    BOOKING_UPDATE_SUCCESS,
    BOOKING_UPDATE_RESET,
    BOOKING_UPDATE_FAIL,
    BOOKING_DELETE_SUCCESS,
    BOOKING_DELETE_REQUEST,
    BOOKING_DELETE_RESET,
    BOOKING_DELETE_FAIL,
    GET_BOOKINGS_BY_USERID_REQUEST,
    GET_BOOKINGS_BY_USERID_SUCCESS,
    GET_BOOKINGS_BY_USERID_FAIL,
    BOOKING_CANCEL_REQUEST,
    BOOKING_CANCEL_SUCCESS,
    BOOKING_CANCEL_FAIL,
    BOOKING_CANCEL_RESET
} from '../constants/bookingsConstants';



export const allBookingsReducer = (state = { allBookings: [] }, action) => {
    switch (action.type) {
        case ALL_BOOKINGS_REQUEST:
            case GET_BOOKINGS_BY_USERID_REQUEST:
            return {
                loading: true,
                allBookings: []
            }
        case ALL_BOOKINGS_SUCCESS:
            case GET_BOOKINGS_BY_USERID_SUCCESS:
            return {
                loading: false,
                allBookings: action.payload.allBookings,
            }
        case GET_BOOKINGS_BY_USERID_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_BOOKINGS_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const bookingStatusReducer = (state = {}, action) => {

    switch (action.type) {
        case BOOKING_UPDATE_REQUEST:
        case BOOKING_DELETE_REQUEST:
            case BOOKING_CANCEL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case BOOKING_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isBookingUpdated: action.payload
            };
            case BOOKING_CANCEL_SUCCESS:
            return {
                ...state,
                loading: false,
                isBookingUpdated: action.payload
            };
        case BOOKING_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isBookingDeleted: action.payload.success,
                message: action.payload.message
            }
        case BOOKING_UPDATE_FAIL:
        case BOOKING_DELETE_FAIL:
            case BOOKING_CANCEL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case BOOKING_UPDATE_RESET:
            return {
                ...state,
                success: false,
                isBookingUpdated: false
            }
            case BOOKING_CANCEL_RESET:
                return {
                    ...state,
                    success: false,
                    isBookingUpdated: false
                }
        case BOOKING_DELETE_RESET:
            return {
                ...state,
                isBookingDeleted: false,
            }
        case CLEAR_BOOKINGS_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

// adding new bookings
export const addNewBookingsReducer = (state = { createBooking: {} }, action) => {

    switch (action.type) {
        case BOOKING_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case BOOKING_CREATE_SUCCESS:
            return {
                loading: false,
                bookingSuccess: action.payload.success,
                createBooking: action.payload.createBooking
            }
        case BOOKING_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case BOOKING_CREATE_RESET:
            return {
                ...state,
                bookingSuccess:false
            }
        case CLEAR_BOOKINGS_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};