import { servicesProducts } from "../services/product-services.js";

const productContainer=document.querySelector("[data-product]");
const form=document.querySelector("[data-form]");

function createCard({nombre,precio,imagen,id}){
    const card=document.createElement("div");
    card.classList.add("card-container");
    card.innerHTML=`
                    <div class="img-container">
                        <img src="${imagen}" alt="imagen producto" />
                    </div>
                    <div class="card-container--info">
                        <p>${nombre}r</p>
                        <div class="card-container--value">
                            <p>${precio}</p>
                            <button class="delete-button" data-id="${id}">
                                <img src="./assets/icontrash.png" alt="Eliminar" />
                            </button>
                        </div>
                    </div>
    `;
    return card;
}

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

renderProducts();

