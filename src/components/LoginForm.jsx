import { TextField, Button, Typography } from "@mui/material";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaWindows } from 'react-icons/fa';

const LoginForm = ({ email, setEmail, password, setPassword, isRegistering, handleSubmit, handleGoogleLogin, handleGithubLogin, handleMicrosoftLogin, toggleAuthMode }) => (
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

        <Typography style={{ marginTop: "10px", textAlign: "center" }}>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button onClick={toggleAuthMode} color="secondary">
                {isRegistering ? "Log In" : "Sign Up"}
            </Button>
        </Typography>

        <hr style={{ margin: "20px 0" }} />

        <Button onClick={handleGoogleLogin} variant="outlined" color="secondary" fullWidth>
            <FcGoogle style={{ marginRight: "8px" }} /> Login with Google
        </Button>
        <hr style={{ margin: "5px 0" }} />
        <Button onClick={handleGithubLogin} variant="outlined" color="secondary" fullWidth>
            <FaGithub style={{ marginRight: "8px" }} /> Login with Github
        </Button>
        <hr style={{ margin: "5px 0" }} />
        <Button onClick={handleMicrosoftLogin} variant="outlined" color="secondary" fullWidth>
            <FaWindows style={{ marginRight: "8px" }} /> Login with Microsoft
        </Button>
    </form>
);

export default LoginForm;
