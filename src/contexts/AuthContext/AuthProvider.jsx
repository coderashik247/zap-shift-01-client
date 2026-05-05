import React from 'react';
import AuthContext from './AuthContext';
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from '../../firebase/firebase.init.js'

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword (auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword (auth, email, password)
    }

    const signInGoogle = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        registerUser,
        signInUser,
        signInGoogle
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;