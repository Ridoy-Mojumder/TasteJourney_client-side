import { GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import axios from "axios";


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
    const signInWithGoogle = () => {
        setLoadingState(true);
        return signInWithPopup(auth, googleProvider);
    }


    const signInWithGithub = () => {
        setLoadingState(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        setLoadingState(true);
        setIsSignIn(false)
        return signOut(auth);
    }


    useEffect(() => {
        // Subscribe to authentication state changes
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Extract user email from currentUser or use default if currentUser is null
            const userEmail = currentUser?.email || user.email;
            const loggedUserEmail = { email: userEmail };
    
            // Update user state and set loading state to false
            setUser(currentUser);
            setLoadingState(false);
    
            // If currentUser exists, send a POST request to generate JWT
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', loggedUserEmail, { withCredentials: true })
                    .then(res => {
                        console.log('Token response:', res.data);
                    })
                    .catch(error => {
                        console.error('Error generating JWT:', error);
                    });
            } else {
                // If currentUser doesn't exist, send a POST request to logout
                axios.post('http://localhost:5000/logout', loggedUserEmail, { withCredentials: true })
                    .then(res => {
                        console.log('Logout response:', res.data);
                    })
                    .catch(error => {
                        console.error('Error logging out:', error);
                    });
            }
        });
    
        // Unsubscribe from authentication state changes when component unmounts
        return () => {
            unSubscribe();
        };
    }, [user]);
    


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