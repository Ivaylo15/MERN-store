import { Route, Redirect } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { constants } from './constants/constants';

const Auth = ({ component: Component, ...rest }) => {
    const [cookies, setCookie, removeCookie] = useCookies([constants.cookieName]);
    
    return (
        <Route
            {...rest}
            render={props =>
                !!cookies[constants.cookieName] ? (<Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signIn',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export default Auth;
