import axios from "axios"
import { messages } from "../constants/messages";
import { setInitialBasket, addToBasket, emptyBasket } from "../redux/basketSlice";
import { setUser } from "../redux/userSlice";

export const userServices = {
    register: (username, password) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signUp`, {
            username,
            password
        })
            .then(res => {
                alert(messages.signedUp)
            })
            .catch(err => alert(err.message));
    },
    login: (dispatch, username, password, history) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signIn`, {
            username,
            password
        }, { withCredentials: true })
            .then(res => {
                dispatch(setUser(res.data));
                dispatch(setInitialBasket(res.data.basket));
                alert(messages.signedIn)
                history.push('/')
            })
            .catch(err => alert(err.message));
    },
    logout: (dispatch) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signOut`, {}, { withCredentials: true })
            .then(() => {
                dispatch(emptyBasket());
                dispatch(setUser())
                alert(messages.signedOut);
            })
            .catch(err => alert(err.message));
    },
    getAuthUser: (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}auth`, { withCredentials: true })
            .then((res) => {
                dispatch(setUser(res.data));
                dispatch(setInitialBasket(res.data.basket))
            })
            .catch(err => alert(err.message));
    },
    addToBasket: (dispatch, userId, productsIds, productToBasket) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}addToBasket`, {
            userId,
            productsIds
        }, { withCredentials: true }
        ).then((res) => {
            alert(messages.addToBasket);
            dispatch(addToBasket(productToBasket))
        })
            .catch(err => alert(err.message));
    },
    removeFromBasket: (userId, productsIds) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}addToBasket`, {
            userId,
            productsIds
        }, { withCredentials: true }
        ).then((res) => {
            alert(messages.removeFromBasket);
        })
            .catch(err => alert(err.message));
    }
}