import { Box, Grid, TextField, Typography, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const EditCustomerForm = ({ formData, onChange, onSave, onCancel }) => (
    <Box component="form" bgcolor="#e6d3b3" p={3} borderRadius={2}>
        <Typography variant="h6" gutterBottom>
            Editar Mis Datos
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <TextField name="name" label="Nombre" fullWidth value={formData.name} onChange={onChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField name="email" label="Email" fullWidth value={formData.email} onChange={onChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField name="phone" label="Teléfono" fullWidth value={formData.phone} onChange={onChange} />
            </Grid>
            <Grid item xs={12}>
                <IconButton onClick={onSave} sx={{ color: "#6b8e23" }}>
                    <SaveIcon />
                </IconButton>
                <IconButton onClick={onCancel} sx={{ color: "#d2691e" }}>
                    <CancelIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Box>
);

export default EditCustomerForm;
