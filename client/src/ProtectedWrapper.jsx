import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedWrapper ( props ) {
    const user = JSON.parse(useSelector((state) => state.auth.user));

    if ( !user ) {
        return <Navigate to="/login" replace />;
    }else{
        // window.location.reload();
    }

    // eslint-disable-next-line react/prop-types
    return props.children;
}
export default ProtectedWrapper;
