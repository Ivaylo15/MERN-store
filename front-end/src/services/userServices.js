import axios from "axios"
import { setUser } from "../redux/userSlice";


export const userServices = {
    register: (username, password) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signUp`, {
            username,
            password
        })
            .then(res => {
                alert(`Signed Up with ${username}. You can signIn!!!`)
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
                alert(`Successfully signIn ${res.data.username}`)
                history.push('/')
            })
            .catch(err => alert(err.message));
    },
    logout: (dispatch) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}signOut`, {}, { withCredentials: true })
            .then(() => {
                dispatch(setUser({}))
                alert(`Successfully loggedout`);
            })
            .catch(err => alert(err.message));
    },
    getAuthUser: (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}auth`, { withCredentials: true })
            .then((res) => {
                dispatch(setUser(res.data))
            })
            .catch(err => alert(err.message));
    }
}