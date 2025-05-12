export const syncWithBackend = async (user, setCustomer, navigate) => {
    try {
        const response = await fetch(`http://localhost:5000/customers`, {
            method: "GET"
        });
        const customers = await response.json();

        const existingCustomer = customers.find(c => c.email === user.email);

        if (existingCustomer) {
            console.log("Cliente ya existe:", existingCustomer);
            setCustomer(existingCustomer); // actualiza contexto
            navigate("/clientes");
        } else {
            const newCustomer = {
                name: user.displayName || "Sin nombre",
                email: user.email,
                phone: "0000000000"
            };

            const createResponse = await fetch(`http://localhost:5000/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCustomer)
            });

            const createdCustomer = await createResponse.json();
            console.log("Cliente creado:", createdCustomer);
            setCustomer(createdCustomer);
            navigate("/clientes");
        }
    } catch (error) {
        console.error("Error sincronizando con el backend:", error);
    }
};
