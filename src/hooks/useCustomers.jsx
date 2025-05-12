import { useEffect, useState } from "react";
import { getCustomers, deleteCustomer, updateCustomer } from "../services/CustomerService";

export function useCustomers(loggedUser) {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        getCustomers().then(setCustomers);
    }, []);

    const handleDelete = async (id) => {
        await deleteCustomer(id);
        setCustomers(customers.filter(c => c.id !== id));
    };

    const handleUpdate = async (id) => {
        await updateCustomer(id, editFormData);
        setCustomers(customers.map(c => (c.id === id ? { ...c, ...editFormData } : c)));
        setEditingCustomerId(null);
        if (id === loggedUser.id) {
            const updated = { ...loggedUser, ...editFormData };
            localStorage.setItem("customer", JSON.stringify(updated));
        }
    };

    const handleEditClick = (customer) => {
        setEditingCustomerId(customer.id);
        setEditFormData({ name: customer.name, email: customer.email, phone: customer.phone });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    return {
        customers,
        editingCustomerId,
        editFormData,
        setEditingCustomerId,
        handleDelete,
        handleUpdate,
        handleEditClick,
        handleInputChange,
    };
}
