import "../styles/login.css"; // Import your CSS file here
import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { TextField, Button, Card, Typography } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegistering) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Registration successful!");
                    console.log(userCredential.user);
                })
                .catch((error) => {
                    alert("Error during registration: " + error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Login successful!");
                    console.log(userCredential.user);
                })
                .catch((error) => {
                    alert("Error during login: " + error.message);
                });
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                alert("Google login successful!");
                console.log(result.user);
            })
            .catch((error) => {
                alert("Error with Google: " + error.message);
            });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
            <Card className="login-card" style={{ padding: "20px", maxWidth: "400px", width: "100%" }}>

                <Typography variant="h2" style={{ marginBottom: "20px", textAlign: "center", color: "#FF5722" }}>
                    Flash Food
                </Typography>
                <Typography variant="h5" style={{ marginBottom: "20px", textAlign: "center" }}>
                    {isRegistering ? "Sign Up" : "Login"}
                </Typography>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <TextField
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {isRegistering ? "Sign Up" : "Login"}
                    </Button>
                </form>

                <Typography style={{ marginTop: "10px", textAlign: "center" }}>
                    {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
                    <Button onClick={() => setIsRegistering(!isRegistering)} color="secondary">
                        {isRegistering ? "Log In" : "Sign Up"}
                    </Button>
                </Typography>

                <hr style={{ margin: "20px 0" }} />

                <Button onClick={handleGoogleLogin} variant="outlined" color="secondary" fullWidth>
                    <FcGoogle style={{ marginRight: "8px" }} /> Login with Google
                </Button>
            </Card>
        </div>
    );
}

export default Login;