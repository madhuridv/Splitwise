import { combineReducers } from 'redux';
// import customerProfileReducer from './customerProfileReducer'
// import ownerProfileReducer from './ownerProfileReducer'
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';


export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    // customerProfile: customerProfileReducer,
    // ownerProfile: ownerProfileReducer
});