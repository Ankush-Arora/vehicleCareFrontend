import axios from "axios";
import { ALL_BOOKINGS_FAIL, ALL_BOOKINGS_REQUEST, ALL_BOOKINGS_SUCCESS, BOOKING_CANCEL_FAIL, 
    BOOKING_CANCEL_REQUEST, BOOKING_CANCEL_SUCCESS, BOOKING_CREATE_FAIL, BOOKING_CREATE_REQUEST, 
    BOOKING_CREATE_SUCCESS, BOOKING_DELETE_FAIL, BOOKING_DELETE_REQUEST, BOOKING_DELETE_SUCCESS, 
    BOOKING_UPDATE_FAIL, BOOKING_UPDATE_REQUEST, BOOKING_UPDATE_SUCCESS, CLEAR_BOOKINGS_ERRORS, 
    GET_BOOKINGS_BY_USERID_FAIL, GET_BOOKINGS_BY_USERID_REQUEST, GET_BOOKINGS_BY_USERID_SUCCESS 
} from "../constants/bookingsConstants";


//create new booking
export const createNewBooking = (bookingData) => async (dispatch) => {

    try {
        dispatch({ type: BOOKING_CREATE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } }
        // const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post(`/api/v1/bookNew/service`,bookingData, config);
        //  console.log('load method = ',data);
        dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data });

}
    catch (err) {
        dispatch({
            type: BOOKING_CREATE_FAIL,
            payload: err.response.data.message,
        })
    }

}

export const getAllBookings = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_BOOKINGS_REQUEST });
        const { data } = await axios.get(`/api/v1/getAllBookings/service`);
    //    if(!data)   alert("server ki dikkat hai");
        dispatch({
            type: ALL_BOOKINGS_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: ALL_BOOKINGS_FAIL,
            payload: err.response.data.message,
        })
    }

}

export const getAllBookingLoggedInUser = () => async (dispatch) => {
    try {
        dispatch({ type: GET_BOOKINGS_BY_USERID_REQUEST });
        const { data } = await axios.get(`/api/v1/user/all/bookings`);
    //    if(!data)   alert("server ki dikkat hai");
        dispatch({ type: GET_BOOKINGS_BY_USERID_SUCCESS, payload: data, })
    }
    catch (err) {
        dispatch({
            type: GET_BOOKINGS_BY_USERID_FAIL,
            payload: err.response.data.message,
        })
    }

}

// update booking status by admins
export const updateBookingStatus = (id,bookingData) => async (dispatch) => {

    try {
        dispatch({ type: BOOKING_UPDATE_REQUEST });
         const config = { headers: { "Content-Type": "application/json" } }
        // const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/v1/update/booking/status/${id}`,bookingData, config);
        //  console.log('load method = ',data);
        dispatch({ type: BOOKING_UPDATE_SUCCESS, payload: data.success });
}
    catch (err) {
        dispatch({
            type: BOOKING_UPDATE_FAIL,
            payload: err.response.data.message,
        })
    }
}

// cancel booking
export const cancelBookingByUser = (id,bookingData) => async (dispatch) => {

    try {
        dispatch({ type: BOOKING_CANCEL_REQUEST });
         const config = { headers: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/cancel/booking/${id}`,bookingData, config);
        dispatch({ type: BOOKING_CANCEL_SUCCESS, payload: data.success });
}
    catch (err) {
        dispatch({
            type: BOOKING_CANCEL_FAIL,
            payload: err.response.data.message,
        })
    }
}

// deleting the order by admin
export const deleteBookingMethod = (id) => async (dispatch) => {
    try {
            dispatch({ type: BOOKING_DELETE_REQUEST });
            const { data } = await axios.delete(`/api/v1/delete/booking/${id}`);
            dispatch({ type: BOOKING_DELETE_SUCCESS, payload: data });

    }
    catch (error) {
            dispatch({ type: BOOKING_DELETE_FAIL, payload: error.response.data.message });
    }

}

export const clearBookingErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_BOOKINGS_ERRORS });
}