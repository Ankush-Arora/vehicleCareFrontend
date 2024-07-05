import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS,
    REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAIL,
    LOAD_USER_FAIL,LOAD_USER_SUCCESS,LOAD_USER_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL, 
    ADMIN_ALL_USER_REQUEST, ADMIN_ALL_USER_SUCCESS, ADMIN_ALL_USER_FAIL, ADMIN_USER_FAIL, 
    ADMIN_USER_SUCCESS, ADMIN_USER_REQUEST, ADMIN_UPDATE_USER_REQUEST, ADMIN_UPDATE_USER_SUCCESS, 
    ADMIN_UPDATE_USER_FAIL, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAIL,
     ADMIN_UPDATE_USER_RESET,
     ADMIN_DELETE_USER_RESET,
     CHANGE_USER_PASSWORD_REQUEST,
     CHANGE_USER_PASSWORD_SUCCESS,
     CHANGE_USER_PASSWORD_RESET,
     CHANGE_USER_PASSWORD_FAIL,
     UPDATE_USERNAME_SUCCESS,
     UPDATE_USERNAME_FAIL,
     FORGOT_PASSWORD_REQUEST,
     FORGOT_PASSWORD_SUCCESS,
     FORGOT_PASSWORD_FAIL,
     RESET_PASSWORD_REQUEST,
     RESET_PASSWORD_FAIL,
     RESET_PASSWORD_SUCCESS
} from "../constants/userConstants"

export const userReducer=(state={user:{}},action)=>{

    switch(action.type)
    {
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
                case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            };
            case LOGIN_SUCCESS:
                case REGISTER_SUCCESS:
                    case LOAD_USER_SUCCESS:
                return{
                     ...state,
                     loading:false,
                     isAuthenticated:true,
                     user:action.payload,
                };
                case LOGOUT_SUCCESS:
                    return {
                        loading:false,
                        isAuthenticated:false,
                        user:null,
                }
                case LOGIN_FAIL:
                    case REGISTER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        isAuthenticated:false,
                        user:null,
                        error:action.payload
                    };
                    case LOAD_USER_FAIL:
                        return{
                            loading:false,
                            isAuthenticated:false,
                            user:null,
                            error:action.payload,
                        };
                        case LOGOUT_FAIL:
                        return {
                            ...state,
                            loading:false,
                            error:action.payload,
                        }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }

}


export const adminAllUsersReducer=(state={users:[] },action)=>{

    switch(action.type)
    {
        case ADMIN_ALL_USER_REQUEST:
            return {
                ...state,
                loading:true,
            };
            case  ADMIN_ALL_USER_SUCCESS:
                return{
                     ...state,
                     loading:false,
                     users:action.payload,
                };
                case ADMIN_ALL_USER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload
                    };
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        };
                default:
                    return state;
    }
}

export const adminUserDetailsReducer=(state={user:{}},action)=>{

    switch(action.type)
    {
        case ADMIN_USER_REQUEST:
            return {
                ...state,
                loading:true,
                // isAuthenticated:false,
            };
            case  ADMIN_USER_SUCCESS:
                return{
                     ...state,
                     loading:false,
                    //  isAuthenticated:true,
                    user:action.payload,
                };
                case ADMIN_USER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        // isAuthenticated:false,
                        // users:null,
                        error:action.payload
                    };
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
}

export const adminProfileReducer=(state={},action)=>{

    switch(action.type)
    {
        case ADMIN_UPDATE_USER_REQUEST:
            case ADMIN_DELETE_USER_REQUEST:
                case CHANGE_USER_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
            };
            case  ADMIN_UPDATE_USER_SUCCESS:
                case CHANGE_USER_PASSWORD_SUCCESS:
                return{
                     ...state,
                     loading:false,
                      isUpdated:action.payload
                };
                case ADMIN_DELETE_USER_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isDeleted:action.payload.success,
                        message:action.payload.message,
                    }
                case ADMIN_UPDATE_USER_FAIL:
                    case ADMIN_DELETE_USER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    };
                    case UPDATE_USERNAME_SUCCESS:
                            return{
                                success:action.payload.success,
                                message:action.payload.message
                            }
                            case UPDATE_USERNAME_FAIL:
                                return{
                                    error:action.payload,
                                }
                    case CHANGE_USER_PASSWORD_FAIL :
                        return{
                            ...state,
                            loading:false,
                            error:action.payload,
                            message:action.payload.message
                        };
                    case  ADMIN_UPDATE_USER_RESET:
                        case CHANGE_USER_PASSWORD_RESET:
                        return{
                            ...state,
                            success:false,
                            isUpdated:false
                        }
                        case ADMIN_DELETE_USER_RESET:
                            return {
                                ...state,
                                isDeleted:false,
                            }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
}


export const forgetPasswordReducer=(state={},action)=>{

    switch(action.type)
    {
            case FORGOT_PASSWORD_REQUEST:
              case  RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
                error:null
            };
            case  FORGOT_PASSWORD_SUCCESS:
                return{
                     ...state,
                     loading:false,
                      message:action.payload
                };  
                case  RESET_PASSWORD_SUCCESS:
                    return{
                         ...state,
                         loading:false,
                          success:action.payload
                    }; 
                case FORGOT_PASSWORD_FAIL:
                    case RESET_PASSWORD_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    };
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
}