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
    login: (dispatch, username, password, history, cookies) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signIn`, {
            username,
            password
        }, { withCredentials: true })
            .then(res => {
                dispatch(setUser(res.data));
                dispatch(setInitialBasket(cookies[res.data._id]));
                alert(messages.signedIn)
                history.push('/')
            })
            .catch(err => alert(err.message));
    },
    logout: (dispatch, history) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signOut`, {}, { withCredentials: true })
            .then(() => {
                dispatch(emptyBasket());
                dispatch(setUser())
                alert(messages.signedOut);
                history.push('/')
            })
            .catch(err => alert(err.message));
    },
    getAuthUser: (dispatch, cookies) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}auth`, { withCredentials: true })
            .then((res) => {
                dispatch(setUser(res.data));
                dispatch(setInitialBasket(cookies[res.data._id]))
            })
            .catch(err => alert(err.message));
    },
    addToBasket: (dispatch, userId, productToBasket, setCookie, basketProducts) => {
        dispatch(addToBasket(productToBasket))
        alert(messages.addToBasket);
        setCookie(userId, [...basketProducts, productToBasket], { path: '/' })

        // axios.put(`${process.env.REACT_APP_BASE_URL}addToBasket`, {
        //     userId,
        //     productsIds
        // }, { withCredentials: true }
        // ).then((res) => {
        //     alert(messages.addToBasket);
        //     dispatch(addToBasket(productToBasket))
        // })
        //     .catch(err => alert(err.message));
    },
    removeFromBasket: (userId, productsInBasket, setCookie) => {
        setCookie(userId, productsInBasket, { path: '/'});

        // axios.put(`${process.env.REACT_APP_BASE_URL}addToBasket`, {
        //     userId,
        //     productsIds
        // }, { withCredentials: true }
        // ).then((res) => {
        //     alert(messages.removeFromBasket);
        // })
        //     .catch(err => alert(err.message));
    }
}