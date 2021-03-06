import * as SessionAPI from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveUser = (user) => ({
   type: RECEIVE_CURRENT_USER,
   user 
})

const logoutCurrentUser = () => ({
   type: LOGOUT_CURRENT_USER
})

export const receiveErrors = (errors) => ({
   type: RECEIVE_SESSION_ERRORS,
   errors
})

export const clearErrors = () => ({
   type: CLEAR_SESSION_ERRORS,
   errors: []
})

export const signUp = user => dispatch => (
   SessionAPI.signUp(user)
      .then( 
         (user) => dispatch(receiveUser(user)),
         (errors) => dispatch(receiveErrors(errors))
      )
)

export const login = user => dispatch => (
   SessionAPI.login(user)
      .then( 
         (user) => dispatch(receiveUser(user)),
         (errors) => dispatch(receiveErrors(errors))
      )
)

export const logout = () => dispatch => (
   SessionAPI.logout()
      .then( () => dispatch(logoutCurrentUser()))
)


