import React, { useEffect } from "react";
import "./GoCapiba.css";
import Header from "../../Components/Header/Header";
import Map from "../../Components/Map/Map";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { setUser } from "../../redux/userSlice";

function GoCapiba() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    name: user.displayName,
                    email: user.email,
                    profilePic: user.photoURL,
                }));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <div className="gocapiba-container">
            <Header />
            <Map />
        </div>
    );
}

export default GoCapiba;