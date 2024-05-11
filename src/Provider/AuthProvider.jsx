import { GoogleAuthProvider,GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loadingState, setLoadingState] = useState(true)
    const [isSignIn, setIsSignIn] = useState(false)
    //console.log(children)

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const createUser = (email, password) => {
        console.log(email, password)
        setIsSignIn(false)
        setLoadingState(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoadingState(true);
        setIsSignIn(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = () =>{
        setLoadingState(true);
        return signInWithPopup(auth, googleProvider);
    }


    const signInWithGithub = () =>{
        setLoadingState(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        setLoadingState(true);
        setIsSignIn(false)
        return signOut(auth);
    }


    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('Current User Found:', currentUser);
            setLoadingState(false)
        });


        return () => {
            unSubscribe();
        };
    }, []);


    const authInfo = {
        user,
        loadingState,
        isSignIn,
        createUser,
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
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;