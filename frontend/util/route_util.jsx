import {Route} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'
import { Redirect, withRouter } from 'react-router'

const Auth = ({ component: Component, path, loggedIn, exact }) => (
   <Route
      path={path}
      exact={exact}
      render={props =>
         !loggedIn ? <Component {...props} /> : <Redirect to="/channels/@me" />
      }
   />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
   <Route
      path={path}
      exact={exact}
      render={props =>
         loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
   />
);

const mapStateToProps = state => {
   return { loggedIn: Boolean(state.session.currentUserId) };
};

export const AuthRoute = withRouter( 
   connect(
      mapStateToProps,
      null
   )(Auth)
);

export const ProtRoute = withRouter( 
   connect(
      mapStateToProps,
      null
   )(Protected)
);

