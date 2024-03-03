import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from '../firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({})
    
    function signUp(email,password){
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuario creado exitosamente
                const user = userCredential.user;
                setUser(user);
                // Establecer el documento en Firestore después de que se crea el usuario
                setDoc(doc(db, 'users', email),{
                    savedShows: []
                });
            })
            .catch((error) => {
                // Manejar errores
                console.error('Error al crear usuario:', error);
            });
        
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
            })
            .catch((error) => {
                alert('Invalid credentials');
            });
    }

    function logOut(){
        return signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error('Error al cerrar sesión:', error);
            });
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        })
        return () => {
            unsuscribe()
        };
    });
    
    return(
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}