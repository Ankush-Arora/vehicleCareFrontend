import { createStore,combineReducers,applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from "redux-thunk";
import { addNewServiceReducer, addReviewReducer, allServiceReviewsReducer, allServicesReducer, serviceReducer } from "./reducers/serviceReducers";
import { adminAllUsersReducer, adminProfileReducer, adminUserDetailsReducer, forgetPasswordReducer, userReducer } from "./reducers/userReducer";
import { addNewBookingsReducer, allBookingsReducer, bookingStatusReducer } from "./reducers/bookingsReducer";
import { allQueriesReducer, updateQueryReducer } from "./reducers/QueryReducers";
import { addNewWorkerReducer, allWorkerReducer, workerReducer } from "./reducers/workerReducer";

const reducer=combineReducers({
   services:allServicesReducer,
   user:userReducer,
   allUsers: adminAllUsersReducer,
   userDetails:adminUserDetailsReducer,
   profile: adminProfileReducer,
   newService:addNewServiceReducer,
   service:serviceReducer,
   allBookings:allBookingsReducer,
   updateBooking:bookingStatusReducer,
   addBooking:addNewBookingsReducer,
   allQueries:allQueriesReducer,
   updateQuery:updateQueryReducer,
   newReview:addReviewReducer,
   newWorker:addNewWorkerReducer,
   allWorkers:allWorkerReducer,
   worker:workerReducer,
   allReviews:allServiceReviewsReducer,
   forgotPassword:forgetPasswordReducer
});

let initialState={};
// const middleware=[thunk];
// const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)) );
const middleware=[thunk];
const store = createStore(reducer,initialState, applyMiddleware(...middleware) );

export default store;