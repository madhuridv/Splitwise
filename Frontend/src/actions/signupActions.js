import { CUSTOMER_SIGNUP} from "./types";
import backendServer from "../webConfig"
import axios from "axios";

export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${backendServer}/signup`, customerData)
        .then(response => dispatch({
            type: CUSTOMER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: CUSTOMER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}