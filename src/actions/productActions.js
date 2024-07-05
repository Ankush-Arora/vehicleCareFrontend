import axios  from "axios";
import { ALL_SERVICE_FAIL, ALL_SERVICE_REQUEST, ALL_SERVICE_SUCCESS,
    ADMIN_ADD_SERVICE_REQUEST,ADMIN_ADD_SERVICE_SUCCESS,ADMIN_ADD_SERVICE_RESET,ADMIN_ADD_SERVICE_FAIL,
    CLEAR_ERRORS, 
    ADMIN_UPDATE_SERVICE_REQUEST,ADMIN_UPDATE_SERVICE_SUCCESS,ADMIN_UPDATE_SERVICE_RESET,
    ADMIN_UPDATE_SERVICE_FAIL,
    ADMIN_DELETE_SERVICE_REQUEST, ADMIN_DELETE_SERVICE_SUCCESS, ADMIN_DELETE_SERVICE_FAIL, SINGLE_SERVICE_REQUEST, SINGLE_SERVICE_SUCCESS, SINGLE_SERVICE_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, GET_SERVICE_REVIEW_REQUEST, GET_SERVICE_REVIEW_SUCCESS, GET_SERVICE_REVIEW_FAIL, REVIEW_DELETE_REQUEST, REVIEW_DELETE_SUCCESS, REVIEW_DELETE_FAIL}
     from "../constants/serviceConstants";


export const getService = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_SERVICE_REQUEST });
        // const { data } = await axios.get(`/api/v1/services`);
       
        const { data } = await axios.get(`/api/v1/services`);
    //    if(!data)   alert("server ki dikkat hai");
        dispatch({
            type: ALL_SERVICE_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: ALL_SERVICE_FAIL,
            payload: err.response.data.message,
        })
    }
}

export const getServiceReviews = (idParams) => async (dispatch) => {

    try {
        dispatch({ type: GET_SERVICE_REVIEW_REQUEST });
          const { data } = await axios.get(`/api/v1/service/reviews/?id=${idParams}`);
       
        // const { data } = await axios.get(`/api/v1/services`);
    //    if(!data)   alert("server ki dikkat hai");
   
        dispatch({
            type: GET_SERVICE_REVIEW_SUCCESS,
            payload: data,
        })
        // console.log(data.allReviews);
    }
    catch (err) {
        dispatch({
            type: GET_SERVICE_REVIEW_FAIL,
            payload: err.response.data.message,
        })
    }
}

export const getServiceDetailsById = (id) => async (dispatch) => {
        //  console.log("id value id red =",id)
    try {
        dispatch({ type: SINGLE_SERVICE_REQUEST });
        const { data } = await axios.get(`/api/v1/service/details/${id}`);
    //    if(!data)   alert("server ki dikkat hai");
        dispatch({
            type: SINGLE_SERVICE_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: SINGLE_SERVICE_FAIL,
            payload: err.response.data.message,
        })
    }
}


// create service action
export const createService = (serviceData) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_ADD_SERVICE_REQUEST });
        // const config = { headers: { "Content-Type": "application/json" } }
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post(`/api/v1/service/create`,serviceData, config);
        //  console.log('load method = ',data);
        dispatch({ type: ADMIN_ADD_SERVICE_SUCCESS, payload: data });

}
    catch (err) {
        dispatch({
            type: ADMIN_ADD_SERVICE_FAIL,
            payload: err.response.data.message,
        })
    }
}

//Adding review
export const createReview = (reviewData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } }
        // const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/v1/service/review/`,reviewData, config);
         console.log('load method = ',data);
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data });

}
    catch (err) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: err.response.data.message,
        })
    }
}

//delete review
export const deleteReviewMethod = (revId,servId) => async (dispatch) => {
    // console.log("checkpoint one");
    try {
            dispatch({ type: REVIEW_DELETE_REQUEST });
            const { data } = await axios.delete(`/api/v1/service/reviews/?reviewId=${revId}&serviceId=${servId}`);
            //  console.log('load method = ',data);
            dispatch({ type: REVIEW_DELETE_SUCCESS, payload: data.success });

    }
    catch (error) {
            dispatch({ type: REVIEW_DELETE_FAIL, payload: error.response.data.message });
            // console.log("checkpoint two");
    }

}


//update service
export const updateService = (id,serviceData) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_UPDATE_SERVICE_REQUEST });
        // const config = { headers: { "Content-Type": "application/json" } }
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/v1/service/update/${id}`,serviceData, config);
        //  console.log('load method = ',data);
        dispatch({ type: ADMIN_UPDATE_SERVICE_SUCCESS, payload: data.success });

}
    catch (err) {
        dispatch({
            type: ADMIN_UPDATE_SERVICE_FAIL,
            payload: err.response.data.message,
        })
    }
}


//deleted service 
export const deleteServiceMethod = (id) => async (dispatch) => {
    // console.log("checkpoint one");
    try {
            dispatch({ type: ADMIN_DELETE_SERVICE_REQUEST });
            const { data } = await axios.delete(`/api/v1/service/delete/${id}`);
            //  console.log('load method = ',data);
            dispatch({ type: ADMIN_DELETE_SERVICE_SUCCESS, payload: data.success });

    }
    catch (error) {
            dispatch({ type: ADMIN_DELETE_SERVICE_FAIL, payload: error.response.data.message });
            // console.log("checkpoint two");
    }

}


// Clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}