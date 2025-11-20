import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';

import { auth } from '../../firebase/firebase.init';

const provider = new GoogleAuthProvider(); // doing it outside of the component to avoid rerendering

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // goggle sign in
    const signInGoggle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    // to stop the loading: or observe user state : firebase --> manage users
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, []);

    const authInfo = {
        loading,
        user,
        registerUser,
        signInUser,
        signInGoggle,
        logOut,
        updateUserProfile,
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