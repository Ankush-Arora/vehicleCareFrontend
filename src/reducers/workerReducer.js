  
import { ALL_WORKER_FAIL, ALL_WORKER_REQUEST, ALL_WORKER_SUCCESS, CLEAR_WORKER_ERRORS, DELETE_WORKER_FAIL, DELETE_WORKER_REQUEST, DELETE_WORKER_RESET, DELETE_WORKER_SUCCESS, NEW_WORKER_FAIL, NEW_WORKER_REQUEST, NEW_WORKER_RESET,
     NEW_WORKER_SUCCESS, 
     UPDATE_WORKER_FAIL, 
     UPDATE_WORKER_REQUEST,
     UPDATE_WORKER_RESET,
     UPDATE_WORKER_SUCCESS} from "../constants/workerConstants";

export const addNewWorkerReducer=(state={worker:{}},action)=>{

    switch(action.type)
    {
        case NEW_WORKER_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case NEW_WORKER_SUCCESS:
                return{
                    loading:false,
                     success:action.payload.success,
                     worker:action.payload.WORKER
                }
                case NEW_WORKER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }
                case NEW_WORKER_RESET:
                return{
                    ...state,
                    success:false
                }
                    case CLEAR_WORKER_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};


export const allWorkerReducer=(state={workers:[]},action)=>{

    switch(action.type)
    {
        case ALL_WORKER_REQUEST:
            return {
                loading:true,
                workers:[]
            }
            case ALL_WORKER_SUCCESS:
                return{
                    loading:false,
                    workers:action.payload.workers
                }
                case ALL_WORKER_FAIL:
                    return{
                        loading:false,
                        error:action.payload,
                    }
                    case CLEAR_WORKER_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};

export const workerReducer=(state={},action)=>{

    switch(action.type)
    {
         case DELETE_WORKER_REQUEST:
             case  UPDATE_WORKER_REQUEST:
            return {
                ...state,
                loading:true,
            }
            case  DELETE_WORKER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    isWorkerDeleted:action.payload.success,
                    deletedMessage:action.payload.message
                }
                case  UPDATE_WORKER_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        isWorkerUpdated:action.payload,
                        workerMessage:action.payload
                    }
                case  DELETE_WORKER_FAIL:
                     case  UPDATE_WORKER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        error:action.payload,
                    }
                  
                case DELETE_WORKER_RESET:
                return{
                    ...state,
                    isWorkerDeleted:false
                }
                case  UPDATE_WORKER_RESET:
                return{
                    ...state,
                    isWorkerUpdated:false
                }
                    case CLEAR_WORKER_ERRORS:
                        return{
                            ...state,
                            error:null,
                        }
                default:
                    return state;
    }
};