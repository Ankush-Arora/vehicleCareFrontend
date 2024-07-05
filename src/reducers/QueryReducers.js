import {
    QUERY_UPDATE_REQUEST, QUERY_UPDATE_SUCCESS, QUERY_DELETE_RESET, QUERY_DELETE_FAIL, CLEAR_QUERY_ERRORS, GETALL_QUERY_SUCCESS, GETALL_QUERY_FAIL, GETALL_QUERY_REQUEST, QUERY_UPDATE_RESET, QUERY_DELETE_SUCCESS, QUERY_UPDATE_FAIL, QUERY_DELETE_REQUEST,

} from "../constants/QueryConstants";


export const allQueriesReducer = (state = { queries: [] }, action) => {

    switch (action.type) {
        case GETALL_QUERY_REQUEST:
            return {
                loading: true,
                queries: []
            }
        case GETALL_QUERY_SUCCESS:
            return {
                loading: false,
                queries: action.payload.queries,
            }
        case GETALL_QUERY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_QUERY_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};


export const updateQueryReducer = (state = {}, action) =>{
    switch(action.type)
    {
        case QUERY_UPDATE_REQUEST:
            case QUERY_DELETE_REQUEST:
            return {
                ...state,
                loading:true,
            };
            case  QUERY_UPDATE_SUCCESS:
                return{
                     ...state,
                     loading:false,
                      isQueryUpdated:action.payload,
                };
                case QUERY_DELETE_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isQueryDeleted:action.payload.success,
                        deletedMessage:action.payload.message,
                    }
                case QUERY_UPDATE_FAIL:
                    case QUERY_DELETE_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    };
                    case  QUERY_UPDATE_RESET:
                        return{
                            ...state,
                            success:false,
                            isQueryUpdated:false
                        }
                        case QUERY_DELETE_RESET:
                            return {
                                ...state,
                                isQueryDeleted:false,
                            }
                    case CLEAR_QUERY_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
}

