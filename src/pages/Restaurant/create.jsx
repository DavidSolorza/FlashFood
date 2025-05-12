import React from 'react';
import RestaurantsFormValidator from '../../components/Restaurants/RestaurantsFormValidator';

import Swal from 'sweetalert2';
import { restaurantService } from "../../services/restaurantService";
import Breadcrumb from '../../components/Breadcrumb';
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  // Lógica de creación
  const handleCreateRestaurant = async (restaurant) => {
    try {
      const createdRestaurant = await restaurantService.createRestaurant(restaurant);
      if (createdRestaurant) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el registro",
          icon: "success",
          timer: 3000
        });
        console.log("Usuario creado con éxito:", createdRestaurant);
        navigate("/restaurants");
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de crear el registro",
          icon: "error",
          timer: 3000
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de crear el registro",
        icon: "error",
        timer: 3000
      });
    }
  };

  return (
    <div>
      {/* Formulario para crear un nuevo usuario */}
      <h2>Create Restaurantr</h2>
      <Breadcrumb pageName="Crear Restaurante" />
      <RestaurantsFormValidator
        handleCreate={handleCreateRestaurant}
        mode={1} // 1 significa creación
      />
    </div>
  );
};

export default App;
