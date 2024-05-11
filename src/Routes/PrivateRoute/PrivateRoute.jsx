import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const PrivateRoute = ({children}) => {
   
    const {user, loadingState} =useContext(AuthContext)

    if(loadingState){
        return <span className="loading loading-spinner text-info"></span>;
    }
    if(user){
        return children;
    }
    return <Navigate to="/logIn"></Navigate>
};
PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;