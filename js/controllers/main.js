import { servicesProducts } from "../services/product-services.js";

const productContainer=document.querySelector("[data-product]");
const form=document.querySelector("[data-form]");

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
                            <button class="delete-button" data-id="${id}">
                                <img src="./assets/icontrash.png" alt="Eliminar" />
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
    event.preventDefault();
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
    
})
renderProducts();

