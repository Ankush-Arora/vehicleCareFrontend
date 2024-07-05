import axios  from "axios";
import { CLEAR_QUERY_ERRORS, GETALL_QUERY_FAIL, GETALL_QUERY_REQUEST, GETALL_QUERY_SUCCESS, QUERY_DELETE_FAIL, QUERY_DELETE_REQUEST, QUERY_DELETE_SUCCESS, QUERY_UPDATE_REQUEST, QUERY_UPDATE_SUCCESS } from "../constants/QueryConstants";



//get all querries

export const getAllQueries = () => async (dispatch) => {

    try {
        dispatch({ type: GETALL_QUERY_REQUEST });
        const { data } = await axios.get(`/api/v1/getAll/queries/`);
    //    if(!data)   alert("server ki dikkat hai");
        dispatch({
            type: GETALL_QUERY_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: GETALL_QUERY_FAIL,
            payload: err.response.data.message,
        })
    }
}


// //update service
export const updateQueryMethod = (id,queryData) => async (dispatch) => {

    try {
        dispatch({ type: QUERY_UPDATE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } }
        // const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/v1/update/query/status/${id}`,queryData, config);
        //  console.log('load method = ',data);
        dispatch({ type: QUERY_UPDATE_SUCCESS, payload: data.success });

}
    catch (err) {
        dispatch({
            type: QUERY_DELETE_FAIL,
            payload: err.response.data.message,
        })
    }

}


// //deleted service 
export const deleteQueryMethod = (id) => async (dispatch) => {
    // console.log("checkpoint one");
    try {
            dispatch({ type: QUERY_DELETE_REQUEST });
            const { data } = await axios.delete(`/api/v1/delete/query/${id}`);
            //  console.log('load method = ',data);
            dispatch({ type: QUERY_DELETE_SUCCESS, payload: data });

    }
    catch (error) {
            dispatch({ type: QUERY_DELETE_FAIL, payload: error.response.data.message });
            // console.log("checkpoint two");
    }

}


// Clearing errors
export const clearQueryErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_QUERY_ERRORS});
}