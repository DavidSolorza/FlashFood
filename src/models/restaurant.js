export function createRestaurant({ id, name, address, phone, email }) {
    return {
        id: id || null,
        name: name || "",
        address: address || "",
        phone: phone || "",
        email: email || ""
    };
}

