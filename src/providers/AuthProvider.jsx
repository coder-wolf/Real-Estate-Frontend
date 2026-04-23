import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    updateEmail,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleAuthProvider = new GoogleAuthProvider();
    const githubAuthProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserName = (fullName) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: fullName,
        })
    }

    const updateUserPhone = (phone) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            phoneNumber: phone,
        })
    }

    const updateUserEmail = (email) => {
        setLoading(true);
        // return updateProfile(auth.currentUser, {
        //     email: email,
        // })

        return updateEmail(user, email);
    }

    const updateUserPhotoURL = (url) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            photoURL: url,
        })
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }

    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubAuthProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    })

    const authInfo = {
        user,
        loading,
        createUser,
        updateUserName,
        updateUserEmail,
        updateUserPhone,
        updateUserPhotoURL,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;