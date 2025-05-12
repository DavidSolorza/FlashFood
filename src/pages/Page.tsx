import ListRestaurants from "../Restaurant/List.tsx";
import Breadcrumb from "../../components/Breadcrumb";
const List = () => {
    return (
        <>
            <Breadcrumb pageName="Usuarios" />
            <Restaurants />
        </>
    );
};
export default List;