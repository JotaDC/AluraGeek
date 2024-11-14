const BASE_URL="http://localhost:3001/productos";

const productList = async () => {
    try {
        const response=await fetch(BASE_URL);
        const data=await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos: ",error);
    }
    
}

export const servicesProducts={
    productList,
};