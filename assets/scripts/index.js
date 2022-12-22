import { request, setCookie, getCookie, eraseCookie  } from "./Helpers/utils.js";
import { Verify } from "./Helpers/verify.js";
import { Product } from "./Models/product.js";


const btnOpen = document.getElementById('open');
const menu = document.getElementById('add-menu');
const btnClose = document.getElementById('close');

btnOpen.addEventListener('click', () => {
    menu.classList.remove("hidden");
    btnClose.classList.remove("hidden");
    btnOpen.classList.add("hidden");
})

btnClose.addEventListener('click', () => {
    menu.classList.add("hidden");
    btnClose.classList.add("hidden");
    btnOpen.classList.remove("hidden");
})

document.getElementById('add').addEventListener('click', async () => {
    let img = document.getElementById('img').value;
    let product_name = document.getElementById('name').value;
    let price = document.getElementById('price').value;

    if (!img == "" && !product_name == "" && !price == ""){
        const product = new Product(
            null,
            img, 
            product_name, 
            price
        );
        product.insert();

        menu.classList.add("hidden");
        btnClose.classList.add("hidden");
        btnOpen.classList.remove("hidden");
        location.reload(true);
    }
})

const iptnSearch = document.getElementById('search');

iptnSearch.addEventListener('input', async () => {
    document.querySelector('.info-section').innerHTML = '';
    document.querySelector('main').innerHTML = '';
    document.getElementById('products').innerHTML = '';

    document.querySelector('.h1-deals-div').innerHTML = `<h1>Results for "${iptnSearch.value}"</h1>`;

    const data = await Product.getAll();

    if (data) {
        data.forEach(e => {
            if (e.name == iptnSearch.value) {
                document.getElementById('products').insertAdjacentHTML("afterbegin", `
                <div class="product">
                    <div class="img-test">
                        <img src="${e.imgUrl}">
                    </div>
                    <a href="#" class="product-name">${e.name}</a>
                    <span class="price">$ ${e.price}</span>
                    <button class="button-2" role="button"><b>Buy</b></button>
                </div>
        `);
            }
        }) 
    }
    if (iptnSearch.value == "") {
        document.location.reload(true);
    }
})

document.getElementById('logout').addEventListener('click', () => {
    if (getCookie('user')){
        setCookie("user", "", 0);
        console.log(getCookie("user"));
        document.location.reload(true);
    }
})

async function getProducts() {
    const data = await Product.getAll();
    console.log(data);

    data.forEach( p => {
        document.getElementById('products').insertAdjacentHTML("afterbegin", `
                <div class="product">
                    <div class="img-test">
                        <img src="${p.imgUrl}" class="product-img">
                    </div>
                    <a href="#" class="product-name">${p.name}</a>
                    <span class="price">$ ${p.price}</span>
                    <button class="button-2 buy" role="button"><b>Buy</b></button>
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
}

async function main() {
    Verify.index_session();
    getProducts();
};
main();
