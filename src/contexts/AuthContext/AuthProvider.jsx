import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({ children }) => {

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
        registerUser,
        signInUser,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;

/* 
`children` represents whatever components are wrapped inside `AuthProvider`.
By returning `{children}`, the provider allows all those inner components to **access the shared auth data** through the context.
In simple terms, `children` makes `AuthProvider` wrap the entire app (or part of it) and **pass authInfo to all nested components automatically**.

*/