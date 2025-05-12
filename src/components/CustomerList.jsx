import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomerList = ({ customers, loggedUser, onEdit, onDelete }) => (
    <>
        <Typography variant="h6" gutterBottom>
            Lista de Clientes
        </Typography>
        <List>
            {customers.map((c) => (
                <ListItem key={c.id} secondaryAction={
                    c.id === loggedUser.id && (
                        <>
                            <IconButton onClick={() => onEdit(c)} edge="end" sx={{ color: "#a0522d" }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDelete(c.id)} edge="end" sx={{ color: "#b22222" }}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )
                }>
                    <ListItemText primary={c.name} secondary={c.email} />
                </ListItem>
            ))}
        </List>
    </>
);

export default CustomerList;
