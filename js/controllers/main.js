import { servicesProducts } from "../services/product-services.js";

const productContainer=document.querySelector("[data-product]");
const form=document.querySelector("[data-form]");
// Seleccionamos el contenedor que contendrá las tarjetas que no esta puesto dinamicamente
const contenedor = document.querySelector('.products-container');


// Funcion para crear Card
function createCard({nombre,precio,imagen,id}){
    const card=document.createElement("div");
    card.classList.add("card-container");
    card.innerHTML=`
                    <div class="img-container">
                        <img src="${imagen}" alt="imagen producto" />
                    </div>
                    <div class="card-container--info">
                        <p>${nombre}</p>
                        <div class="card-container--value">
                            <p>$ ${precio}</p>
                            <p>ID: ${id}</p>
                            <button class="delete-button" >
                                <img src="./assets/icontrash.png" data-id="${id}" alt="Eliminar" />
                            </button>
                        </div>
                    </div>
    `;
    return card;
}

// Funcion para Renderizar todas las card (productos)
const renderProducts=async () => {
    try {
        const listProducts=await servicesProducts.productList();
        listProducts.forEach(product => {
            const productCard=createCard(product);
            productContainer.appendChild(productCard);
            
            
        });
    } catch (error) {
        console.log(error)
    }
    
};

// Ejecucion principal

//Captura del evento submit para crear card
form.addEventListener("submit",async (evento)=>{
    evento.preventDefault();
    const nombre=document.querySelector("[data-nombre]").value;
    const precio=document.querySelector("[data-precio]").value;
    const imagen=document.querySelector("[data-imagen]").value;
    //console.log(nombre," ",precio," ", imagen)
    try {
        const newProduct=await servicesProducts.createProduct(nombre,precio,imagen);
        const newCard=createCard(newProduct);
        productContainer.appendChild(newCard);
    } catch (error) {
        console.log(error)
    }
    form.reset();
    
});


// Evento para ver a qeu card se le hizo click 
// Agregamos un evento al contenedor que escucha los clics en sus hijos
contenedor.addEventListener('click', async (event) => { 
    // Verificamos si el elemento clickeado es una tarjeta
    
    if (event.target.tagName === 'IMG' && event.target.hasAttribute('data-id')){
        //console.log(event.target.getAttribute('data-id'));
        const id=event.target.getAttribute("data-id");
        try {
            
            if(confirm("¿Esta seguro de borrar el producto?")){
                const producto=await servicesProducts.deleteProduct(id);
            }
            
           
        } catch (error) {
            console.log(error)
        }
    }
   
});



renderProducts();



