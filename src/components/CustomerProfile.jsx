import { Card, TextField } from "@mui/material";

const CustomerProfile = ({ user }) => (
    <Card sx={{ bgcolor: "#e6d3b3", p: 3, mb: 4 }}>
        <TextField label="Nombre" value={user.name || ""} fullWidth margin="normal" disabled />
        <TextField label="Correo" value={user.email || ""} fullWidth margin="normal" disabled />
        <TextField label="Teléfono" value={user.phone || ""} fullWidth margin="normal" disabled />
    </Card>
);

export default CustomerProfile;
