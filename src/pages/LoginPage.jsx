import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { auth, providerGoogle, providerGithub, microsoftProvider } from "../firebase";
import { syncWithBackend } from "../services/authService"; // ✅ Nuevo import
import { useCustomer } from "../context/CustomerContext"; // ✅ Obtener el contexto
import "../styles/login.css";
import { Box, Paper } from "@mui/material";



function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const { setCustomer } = useCustomer(); // ✅ Obtener setCustomer del contexto

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Registration successful!");
                    syncWithBackend(userCredential.user, setCustomer, navigate);
                })
                .catch((error) => {
                    alert("Error during registration: " + error.message);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Login successful!");
                    syncWithBackend(userCredential.user, setCustomer, navigate);
                })
                .catch((error) => {
                    alert("Error during login: " + error.message);
                });
        }
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                alert("Google login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Google: " + error.message);
            });
    };

    const handleGithubLogin = () => {
        signInWithPopup(auth, providerGithub)
            .then((result) => {
                alert("Github login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Github: " + error.message);
            });
    };

    const handleMicrosoftLogin = () => {
        signInWithPopup(auth, microsoftProvider)
            .then((result) => {
                alert("Microsoft login successful!");
                syncWithBackend(result.user, setCustomer, navigate);
            })
            .catch((error) => {
                alert("Error with Microsoft: " + error.message);
            });
    };

    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        
            
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                sx={{ background: "linear-gradient(135deg, #FF5722, #FF9800)" }}
            >
                <Paper elevation={6} sx={{ padding: 4, width: 400, bgcolor: "white", borderRadius: 3 }}>
                    <Typography variant="h3" align="center" color="primary" gutterBottom>
                        Flash Food
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        {isRegistering ? "Sign Up" : "Login"}
                    </Typography>
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        isRegistering={isRegistering}
                        handleSubmit={handleSubmit}
                        handleGoogleLogin={handleGoogleLogin}
                        handleGithubLogin={handleGithubLogin}
                        handleMicrosoftLogin={handleMicrosoftLogin}
                        toggleAuthMode={toggleAuthMode}
                    />
                </Paper>
            </Box>
        
    );
}

export default LoginPage;
