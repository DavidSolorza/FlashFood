import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteRestaurant, getRestaurants } from "../../services/restaurantService";

const ListRestaurants = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const restaurants = await getRestaurants();
    setData(restaurants);
  };

  const handleView = (id) => {
    console.log(`Ver registro con ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editar registro con ID: ${id}`);
  };

  const handleDelete = async (id) => {
    console.log(`Intentando eliminar usuario con ID: ${id}`);
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro de querer eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteRestaurant(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El registro se ha eliminado",
            icon: "success"
          });
        }
        fetchData();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Listado
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Dirección</th>
                    <th className="px-6 py-3">Teléfono</th>
                    <th className="px-6 py-3">Correo</th>
                    <th className="px-6 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleView(item.id ?? 0)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleEdit(item.id)}
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => item.id !== undefined && handleDelete(item.id)}
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRestaurants;
