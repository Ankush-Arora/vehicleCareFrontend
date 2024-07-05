import { ALL_SERVICE_REQUEST,ALL_SERVICE_SUCCESS,ALL_SERVICE_FAIL,
    ADMIN_ADD_SERVICE_REQUEST,ADMIN_ADD_SERVICE_SUCCESS,ADMIN_ADD_SERVICE_RESET,ADMIN_ADD_SERVICE_FAIL,
    ADMIN_DELETE_SERVICE_REQUEST,ADMIN_DELETE_SERVICE_SUCCESS,ADMIN_DELETE_SERVICE_FAIL,
    ADMIN_UPDATE_SERVICE_REQUEST,ADMIN_UPDATE_SERVICE_SUCCESS,ADMIN_UPDATE_SERVICE_RESET,ADMIN_UPDATE_SERVICE_FAIL,
    CLEAR_ERRORS,
    ADMIN_DELETE_SERVICE_RESET,
    SINGLE_SERVICE_REQUEST,
    SINGLE_SERVICE_SUCCESS,
    SINGLE_SERVICE_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    GET_SERVICE_REVIEW_REQUEST,
    GET_SERVICE_REVIEW_SUCCESS,
    GET_SERVICE_REVIEW_FAIL,
    REVIEW_DELETE_REQUEST,
    REVIEW_DELETE_SUCCESS,
    REVIEW_DELETE_FAIL,
    REVIEW_DELETE_RESET} from "../constants/serviceConstants";

export const allServicesReducer=(state={services:[]},action)=>{

    switch(action.type)
    {
        case ALL_SERVICE_REQUEST:
            return {
                loading:true,
                services:[]
            }
            case ALL_SERVICE_SUCCESS:
                return{
                    loading:false,
                    services:action.payload.services,
                    servicesCount:action.payload.servicesCount,
                }
                case ALL_SERVICE_FAIL:
                    return{
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
};

//get all reviews
export const allServiceReviewsReducer=(state={allReviews:[]},action)=>{

    switch(action.type)
    {
        case GET_SERVICE_REVIEW_REQUEST:
            return {
                loading:true,
                allReviews:[]
            }
            case GET_SERVICE_REVIEW_SUCCESS:
                return{
                    loading:false,
                    allReviews:action.payload.allReviews,
                    overAllrating:action.payload.overAllrating,
                }
                case GET_SERVICE_REVIEW_FAIL:
                    return{
                        loading:false,
                        error:action.payload,
                    }
            case REVIEW_DELETE_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case REVIEW_DELETE_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isDeleted:action.payload,
                }
                case REVIEW_DELETE_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }
                  
                case REVIEW_DELETE_RESET:
                return{
                    ...state,
                    isDeleted:false
                }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};


export const addNewServiceReducer=(state={service:{}},action)=>{

    switch(action.type)
    {
        case ADMIN_ADD_SERVICE_REQUEST:
           case SINGLE_SERVICE_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case ADMIN_ADD_SERVICE_SUCCESS:
                return{
                    loading:false,
                     success:action.payload.success,
                     service:action.payload.service
                }
                case SINGLE_SERVICE_SUCCESS:
                return{
                    loading:false,
                     service:action.payload.service
                }
                case ADMIN_ADD_SERVICE_FAIL:
                    case SINGLE_SERVICE_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }
                case ADMIN_ADD_SERVICE_RESET:
                return{
                    ...state,
                    success:false
                }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};

export const serviceReducer=(state={},action)=>{

    switch(action.type)
    {
         case ADMIN_DELETE_SERVICE_REQUEST:
            case ADMIN_UPDATE_SERVICE_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case ADMIN_DELETE_SERVICE_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isDeleted:action.payload,
                    message:action.payload
                }
                case ADMIN_UPDATE_SERVICE_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isUpdated:action.payload,
                        message:action.payload
                    }
                case ADMIN_DELETE_SERVICE_FAIL:
                    case ADMIN_UPDATE_SERVICE_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }
                  
                case ADMIN_DELETE_SERVICE_RESET:
                return{
                    ...state,
                    isDeleted:false
                }
                case ADMIN_UPDATE_SERVICE_RESET:
                return{
                    ...state,
                    isUpdated:false
                }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};

export const addReviewReducer=(state={},action)=>{

    switch(action.type)
    {
         case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case NEW_REVIEW_SUCCESS:
                return {
                    ...state,
                    loading:false,
                   success:action.payload
                }
                case NEW_REVIEW_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }
                case NEW_REVIEW_RESET:
                return{
                    ...state,
                    success:false
                }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};