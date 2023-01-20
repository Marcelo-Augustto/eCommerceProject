import { Verify } from "./Helpers/verify.js";
import { request } from "./Helpers/utils.js";
import { User } from "./Models/user.js";
import { Product } from "./Models/product.js";

document.getElementById('logout').addEventListener('click', async () => {
    request(`logout`, { method: 'DELETE'} );
    document.location.reload(true);
});

document.querySelector('.btn-save').addEventListener('click', async () => {
    const user = await request(`verify-session`);
    const sample = new User();

    let newUsername = document.querySelector('.input-username').value;
    let newPassword = document.querySelector('.input-password').value;
    let password = document.querySelector('.input-password-old').value;

    let resp = await sample.update(user.email, password, newUsername, newPassword);
    
    if (resp == "success") {
        alert("User was updated");
        request(`logout`, { method: 'DELETE'} );   
        document.location.reload(true);
    } else {
        alert("You need to type in your current password");
    }
});

document.querySelector('.btn-add-product').addEventListener('click', async () => {
    const user = await request(`verify-session`);
    let product_name = document.querySelector('.input-product-name').value;
    let price = document.querySelector('.input-product-price').value;
    let img = document.querySelector('.input-product-image').value;
    let description = document.querySelector('.input-product-description').value;

    if (!img == "" && !product_name == "" && !price == "" && !description == "") {
        const product = new Product(
            null,
            img,
            product_name,
            price,
            description,
            user.email
        );
        product.insert();
        alert("product added");
        document.location.reload(true);
    }
});

async function getProducts() {
    const data = await Product.getAll();
    console.log(data);

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
                    <h5 class="fw-bolder">${p.name}</h5>
                    <!-- Product price-->
                    R$ ${p.price}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent d-flex flex-column">
                <button type="button" class="btn btn-dark delete">Delete</button>
            </div>
        </div>
      </div>
            `);
    });

    document.querySelectorAll('.delete').forEach((e,i) => {
        e.addEventListener('click', () => {
            data.reverse();
            data.forEach(async (j,k) => {
                if (i == k) {
                    let sample = new Product();
                    console.log(await sample.delete(j.name));
                    document.location.reload(true);
                }
            })
        })
      })
}

async function getInfo() {
    const user = await request(`verify-session`);
    document.querySelector('.span-username').innerHTML = user.name;
    document.querySelector('.span-email').innerHTML = user.email;
}

Verify.profile_session();
getInfo();
getProducts();
