import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart =()=>{
    return({
        type:actionTypes.AUTH_START
    })
}
export const authLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
 return({
     type:actionTypes.AUTH_LOGOUT,

 })   
}
export const authCheckTimeout =(expirationTime)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(authLogout())
        },expirationTime);
    
    }
      
}
export const authSuccess =(tokenId,userId)=>{
    return ({
        type:actionTypes.AUTH_SUCCESS,
        tokenId:tokenId,
        userId:userId

    })
}
export const authFail =(error)=>{
    return({
        type:actionTypes.AUTH_FAIL,
        error:error
    })
}
export const auth =(email,password,isSignUp)=>{
    return dispatch=>{   
        dispatch(authStart());
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDs5ByLIB8OHcFdiB3KGSuulGAWiFh6BeA'
        if(isSignUp){
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDs5ByLIB8OHcFdiB3KGSuulGAWiFh6BeA'
        }
        axios.post(url,authData)
            .then( response=>{
                const expirationDate = new Date(new Date().getTime()+response.data.expiresIn*1000)
                localStorage.setItem("token",response.data.idToken)
                localStorage.setItem("expirationDate",expirationDate)
                localStorage.setItem("userId",response.data.localId)
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(authCheckTimeout(response.data.expiresIn*1000))
            })
            .catch(error=>{
                
                dispatch(authFail(error.response.data.error.message.split('_').join(' ')))
                    
            })
    }
}
export const setAuthRedirectPath =(path)=>{
    return({
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    })
}

export const setAutoLogin=()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            if ( expirationDate < new Date()){
                dispatch(authLogout())
            }
            else {
                dispatch(authSuccess(token,localStorage.getItem('userId')))
                dispatch(authCheckTimeout(expirationDate.getTime()- new Date().getTime()))
            }
        }

    }
}