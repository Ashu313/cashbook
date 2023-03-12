import react from 'react';
import { Navigate, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'; ;





   
    
    const AdminProtectedRoute = ({ component: Component, ...rest }) => {
      //check if user is loggin
      const user = useSelector(state => state?.users);
      const { userAuth } = user;
      return (
        <Route
          {...rest}
          render={() =>
            userAuth?.isAdmin ? (
              <Component {...rest} />
            ) : (
              <Navigate to="/not-admin" />
            )
          }
        />
      );
    };
    


export default AdminProtectedRoute;
