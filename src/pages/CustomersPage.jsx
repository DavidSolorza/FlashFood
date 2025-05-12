import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useCustomers } from "../hooks/useCustomers";
import CustomerList from "../components/CustomerList";
import CustomerProfile from "../components/CustomerProfile";
import EditCustomerForm from "../components/EditCustomerForm";
import { useState } from "react";

function CustomersPage() {
    const navigate = useNavigate();
    const [loggedUser] = useState(JSON.parse(localStorage.getItem("customer")) || {});
    const {
        customers,
        editingCustomerId,
        editFormData,
        setEditingCustomerId,
        handleDelete,
        handleUpdate,
        handleEditClick,
        handleInputChange,
    } = useCustomers(loggedUser);

    return (
        <Box display="flex" height="100vh" bgcolor="#f9f5f0" color="#333">
            <Box width="30%" p={2} borderRight="1px solid #ccc" bgcolor="#e6d3b3" overflow="auto">
                <CustomerList
                    customers={customers}
                    loggedUser={loggedUser}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />
            </Box>
            <Box flex={1} p={4} overflow="auto">
                <h2>Mi Perfil</h2>
                <CustomerProfile user={loggedUser} />
                {editingCustomerId === loggedUser.id && (
                    <EditCustomerForm
                        formData={editFormData}
                        onChange={handleInputChange}
                        onSave={() => handleUpdate(loggedUser.id)}
                        onCancel={() => setEditingCustomerId(null)}
                    />
                )}
                <Button
                    onClick={() => navigate("/login")}
                    variant="contained"
                    sx={{ mt: 4, bgcolor: "#a0522d", "&:hover": { bgcolor: "#8b4513" } }}
                >
                    Continuar pedido
                </Button>
            </Box>
        </Box>
    );
}

export default CustomersPage;
