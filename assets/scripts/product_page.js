import { request, getCookie } from "./Helpers/utils.js";
import { Verify } from "./Helpers/verify.js";
import { Product } from "./Models/product.js";

async function getProducts() {
    
    const data = await Product.getAll();
    
    data.forEach( p => {
        document.getElementById('products').insertAdjacentHTML("afterbegin", `
        <div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="${p.imgUrl}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder prod-name">${p.name}</h5>
                    <!-- Product price-->
                    R$ ${p.price}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex flex-column">
                <button type="button" class="btn btn-dark buy">Add to cart</button>
                <button type="button" class="btn btn-outline-dark mt-2 btn-view-product">View product</button>
            </div>
        </div>
      </div>
            `);
    });

    document.querySelectorAll('.buy').forEach((e, i) => {
        e.addEventListener('click', () => {
            data.reverse();
            data.forEach( async (p,j) => {
                if (i == j) {
                    const res2 = await request(`add-to-cart`, {
                        method: 'POST',
                        body: {
                            img: p.imgUrl,
                            product_name: p.name,
                            price: p.price,
                            cartUser: JSON.parse(getCookie('user')).email
                        },
                    });

                    window.alert(`${p.name} was added to your shopping cart`);
                    document.location.reload(true); 
                }
            })
        })
    })

    document.querySelectorAll('.btn-view-product').forEach((e,i) => {
        e.addEventListener('click', () => {
            document.querySelectorAll('.prod-name').forEach((j,k) => {
                if(k == i){
                    localStorage.setItem('request', JSON.stringify(data[i].id));
                    window.location.href = "product";
                }
            })
        })
    })
}

async function getMainProduct() {
    let product_id = JSON.parse(localStorage.getItem('request'));
    const product = await Product.getById(product_id);

    console.log(product);

    document.querySelector('.product-img').setAttribute('src', `${product.imgUrl}`);
    document.querySelector('.p-name').innerHTML = product.name;
    document.querySelector('.p-price').innerHTML = `$${product.price}`;
    document.querySelector('.p-desc').innerHTML = product.description;
    
    document.querySelector('.btn-cart-add').addEventListener('click', async () => {
        const res2 = await request(`add-to-cart`, {
            method: 'POST',
            body: {
                img: product.imgUrl,
                product_name: product.name,
                price: product.price,
                cartUser: JSON.parse(getCookie('user')).email
            },
        });

        window.alert(`${product.name} was added to your shopping cart`);
        document.location.reload(true); 
    })
}

getMainProduct();
getProducts();
Verify.product_session();