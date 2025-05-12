import React,{ useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { restaurantService } from "../../services/restaurantService";
import Swal from "sweetalert2";

import RestaurantFormValidator from '../../components/Restaurants/RestaurantsFormValidator'
import Breadcrumb from "../../components/Breadcrumb";

const UpdateRestaurantPage = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null); // Ya no usamos <User | null>

  // Cargar datos del usuario después del montaje
  useEffect(() => {
    const fetchRestaurant= async () => {
      if (!id) return;
      const restaurantData = await restaurantService.getRestaurantById(parseInt(id));
      setRestaurant(restaurantData);
    };

    fetchRestaurant();
  }, [id]);

  const handleUpdateRestaurant = async (theRestaurant) => {
    try {
      const updatedRestaurant = await restaurantService.updateRestaurant(theRestaurant.id || 0, theRestaurant);
      if (updatedRestaurant) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        navigate("/restaurants");
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de actualizar el registro",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de actualizar el registro",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (!restaurant) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Actualizar Usuario" />
      <RestaurantFormValidator
        handleUpdate={handleUpdateRestaurant}
        mode={2} // 2 significa actualización
        restaurant={restaurant}
      />
    </>
  );
};


export default UpdateRestaurantPage; 
