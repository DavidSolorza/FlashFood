const API = "http://localhost:5000/customers";

export const getCustomers = () => fetch(API).then(res => res.json());
export const deleteCustomer = (id) => fetch(`${API}/${id}`, { method: "DELETE" });
export const updateCustomer = (id, data) =>
    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
