import axios from "axios";
import { ALL_WORKER_FAIL, ALL_WORKER_REQUEST, ALL_WORKER_SUCCESS, DELETE_WORKER_FAIL,
     DELETE_WORKER_REQUEST, DELETE_WORKER_SUCCESS, NEW_WORKER_FAIL, NEW_WORKER_REQUEST, 
     NEW_WORKER_SUCCESS, 
     UPDATE_WORKER_FAIL, 
     UPDATE_WORKER_REQUEST,
     UPDATE_WORKER_SUCCESS} from "../constants/workerConstants";

export const createWorker = (workerData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_WORKER_REQUEST });
        // const config = { headers: { "Content-Type": "application/json" } }
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.post(`/api/v1/addWorker/details`,workerData, config);
        //  console.log('load method = ',data);
        dispatch({ type: NEW_WORKER_SUCCESS, payload: data });

}
    catch (err) {
        dispatch({
            type: NEW_WORKER_FAIL,
            payload: err.response.data.message,
        })
    }
}


export const getAllWorkers = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_WORKER_REQUEST });
        // const { data } = await axios.get(`/api/v1/services`);
       
        const { data } = await axios.get(`/api/v1/getAllWorkers`);
    //    if(!data)   alert("server ki dikkat hai");
    // console.log(data.workers);
        dispatch({
            type: ALL_WORKER_SUCCESS,
            payload: data,
        })
    }
    catch (err) {
        dispatch({
            type: ALL_WORKER_FAIL,
            payload: err.response.data.message,
        })
    }
}


// delete worker method

export const deleteWorkerMethod = (id) => async (dispatch) => {
    // console.log("checkpoint one");
    try {
            dispatch({ type:  DELETE_WORKER_REQUEST });
            const { data } = await axios.delete(`/api/v1/delete/worker/${id}`);
            //  console.log('load method = ',data);
            dispatch({ type: DELETE_WORKER_SUCCESS, payload: data });

    }
    catch (error) {
            dispatch({ type: DELETE_WORKER_FAIL, payload: error.response.data.message });
            // console.log("checkpoint two");
    }

}

//update worker
export const updateWorkerMethod = (id,workerData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_WORKER_REQUEST });
        // const config = { headers: { "Content-Type": "application/json" } }
        const config = { headers: { "Content-Type": "multipart/form-data" } }
        const { data } = await axios.put(`/api/v1/update/workerDetails/${id}`,workerData, config);
        //  console.log('load method = ',data);
        dispatch({ type:  UPDATE_WORKER_SUCCESS, payload: data.success });

}
    catch (err) {
        dispatch({
            type:  UPDATE_WORKER_FAIL,
            payload: err.response.data.message,
        })
    }
}