import axios from "axios";
import {
        LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST,
        LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS,
        LOGOUT_SUCCESS, LOGOUT_FAIL,
        ADMIN_ALL_USER_REQUEST, ADMIN_ALL_USER_SUCCESS, ADMIN_ALL_USER_FAIL, ADMIN_USER_FAIL,
        ADMIN_USER_SUCCESS, ADMIN_USER_REQUEST, ADMIN_UPDATE_USER_REQUEST, ADMIN_UPDATE_USER_SUCCESS,
        ADMIN_UPDATE_USER_FAIL, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAIL,
        CHANGE_USER_PASSWORD_REQUEST,
        CHANGE_USER_PASSWORD_SUCCESS,
        CHANGE_USER_PASSWORD_FAIL,
        CLEAR_ERRORS,
        UPDATE_USERNAME_SUCCESS,
        UPDATE_USERNAME_FAIL,
        FORGOT_PASSWORD_REQUEST,
        FORGOT_PASSWORD_SUCCESS,
        FORGOT_PASSWORD_FAIL,
        RESET_PASSWORD_REQUEST,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAIL
} from "../constants/userConstants";
// import Cookies from "js-cookie";

export const loginUserMethod = (email, password) => async (dispatch) => {

        try {
                dispatch({ type: LOGIN_REQUEST });

                const config = { headers: { "Content-Type": "application/json" } };
                const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
                // console.log('token is here =', data.token)
                // const token=data.token;
                // Cookies.set('authToken',token);
                dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        }
        catch (error) {
                dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        }
}

export const registerUserMethod = (name, email, password) => async (dispatch) => {

        try {
                dispatch({ type: REGISTER_REQUEST });

                const config = { headers: { "Content-Type": "application/json" } };
                const { data } = await axios.post(`/api/v1/register`, { name, email, password }, config);
                dispatch({ type: REGISTER_SUCCESS, payload: data.user });
        }
        catch (error) {
                dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
        }

}

export const loadUserMethod = () => async (dispatch) => {
        try {
                dispatch({ type: LOAD_USER_REQUEST });
                // console.log('Test one ');
                const { data } = await axios.get("/api/v1/loggedin/user");
                //   console.log('load method = ',data.user);
                dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        }
        catch (error) {
                dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
        }

}

export const getAllUsersMethod = () => async (dispatch) => {
        // console.log("checkpoint one");
        try {
                dispatch({ type: ADMIN_ALL_USER_REQUEST });
                const { data } = await axios.get(`/api/v1/allUsers`);
                //  console.log('load method = ',data);
                dispatch({ type: ADMIN_ALL_USER_SUCCESS, payload: data.users });

        }
        catch (error) {
                dispatch({ type: ADMIN_ALL_USER_FAIL, payload: error.response.data.message });
                // console.log("checkpoint two");
        }

}

// update role by admin
export const updateUserRoleUserMethod = (id, userData) => async (dispatch) => {
        try {
                dispatch({ type: ADMIN_UPDATE_USER_REQUEST });
                const config = { headers: { "Content-Type": "application/json" } }
                const { data } = await axios.put(`/api/v1/updateRole/${id}`, userData, config);
                //  console.log('load method = ',data);
                dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data });

        }
        catch (error) {
                dispatch({ type: ADMIN_UPDATE_USER_FAIL, payload: error.response.data.message });
                // console.log("checkpoint two");
        }
}

export const changeUserPasswordMethod = (passwords) => async (dispatch) => {
        try {
                dispatch({ type: CHANGE_USER_PASSWORD_REQUEST });
                const config = { headers: { "Content-Type": "application/json" } }
                const { data } = await axios.post(`/api/v1/changePassword`, passwords, config);
                //  console.log('load method = ',data);
                dispatch({ type: CHANGE_USER_PASSWORD_SUCCESS, payload: data });

        }
        catch (error) {
                dispatch({ type: CHANGE_USER_PASSWORD_FAIL, payload: error.response.data.message });
                // console.log("checkpoint two");
        }
}


// delete user by admin

export const deleteUserMethod = (id) => async (dispatch) => {
        // console.log("checkpoint one");
        try {
                dispatch({ type: ADMIN_DELETE_USER_REQUEST });
                const { data } = await axios.delete(`/api/v1/deleteUser/${id}`);
                //  console.log('load method = ',data);
                dispatch({ type: ADMIN_DELETE_USER_SUCCESS, payload: data });

        }
        catch (error) {
                dispatch({ type: ADMIN_DELETE_USER_FAIL, payload: error.response.data.message });
                // console.log("checkpoint two");
        }

}

//for update username 

export const updateUserNameMethod = (userData) => async (dispatch) => {
        try {
                const config = { headers: { "Content-Type": "application/json" } }
                const { data } = await axios.put(`/api/v1/update/userName`, userData, config);
                dispatch({ type: UPDATE_USERNAME_SUCCESS,payload:data });
        }
        catch (error) {
                dispatch({ type: UPDATE_USERNAME_FAIL, payload: error.response.data.message });
        }
}

//for loggout user

export const logoutUserMethod = () => async (dispatch) => {
        try {
                await axios.get(`/api/v1/logout`);
                dispatch({ type: LOGOUT_SUCCESS });
        }
        catch (error) {
                dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
        }
}

//forget password action
export const forgotPasswordMethod = (email) => async (dispatch) => {

        try {
                dispatch({ type: FORGOT_PASSWORD_REQUEST });

                const config = { headers: { "Content-Type": "application/json" } };
                const { data } = await axios.post(`/api/v1/forgot/password`,email, config);
                dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
        }
        catch (error) {
                dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
        }
}

//reset password action
export const resetPasswordMethod = (token,passwords) => async (dispatch) => {

        try {
                dispatch({ type: RESET_PASSWORD_REQUEST });

                const config = { headers: { "Content-Type": "application/json" } };
                const { data } = await axios.put(`/api/v1/password/reset/${token}`,passwords, config);
                dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
        }
        catch (error) {
                dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
        }
}



// Clearing errors
export const clearUserErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
}
