import { Route, Redirect } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Auth = ({ component: Component, ...rest }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token']);

    return (
        <Route
            {...rest}
            render={props =>
                !!cookies['x-auth-token'] ? (<Component {...props} />
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
