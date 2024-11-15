const BASE_URL="http://localhost:3001/productos";
//const BASE_URL="https://673614835995834c8a9559d1.mockapi.io/productos";

const productList = async () => {
    try {
        const response=await fetch(BASE_URL);
        const data=await response.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos: ",error);
    }
    
}

const createProduct=async (nombre, precio, imagen) =>{
    try {
        const response=await fetch(BASE_URL,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({nombre,precio,imagen})
        });
        const data =await response.json();
        return data;
    } catch (error) {
        console.log("Error al crear productos: ",error)
    }
}

const deleteProduct=async (id) =>{
    try {
        console.log(`${BASE_URL}/${id}`);
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        
        });
        const data = await response.json();
        return data;

        
    } catch (error) {
        console.log(error);
    }
    
}

export const servicesProducts={
    productList,
    createProduct,
    deleteProduct,

};