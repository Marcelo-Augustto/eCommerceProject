import { request, setCookie, getCookie, eraseCookie  } from "./utils.js";

class Product{
    constructor(img, product_name, price){
        this.img = img;
        this.product_name = product_name;
        this.price = price;
    }
}

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
        document.getElementById('products').insertAdjacentHTML("afterbegin", `
        <div class="product">
            <div class="img-test">
                <img src="${img}">
            </div>
            <a href="#" class="product-name">${product_name}</a>
            <span class="price">$ ${price}</span>
            <button class="button-2" role="button"><b>Buy</b></button>
        </div>
    `);
        let newProduct = new Product(img, product_name, price);
        const data = await request(`register-product`, {
            method: 'POST',
            body: newProduct,
        })
        console.log(data);

        menu.classList.add("hidden");
        btnClose.classList.add("hidden");
        btnOpen.classList.remove("hidden");
        document.location.reload(true);
    }
})

let input = document.getElementById('search');

input.addEventListener('input', async () => {
    document.querySelector('.info-section').innerHTML = '';
    document.querySelector('main').innerHTML = '';
    document.getElementById('products').innerHTML = '';

    document.querySelector('.h1-deals-div').innerHTML = `<h1>Results for "${input.value}"</h1>`;

    const data = await request(`get-all-products`);
    //console.log(data);
    if (data) {
        data.forEach(e => {
            if (e.name == input.value) {
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
    if (input.value == "") {
        document.location.reload(true);
    }
})

document.getElementById('logout').addEventListener('click', () => {
    if (getCookie('user')){
        // eraseCookie('user');
        // document.location.reload(true);
        setCookie("user", "", 0);
        console.log(getCookie("user"));
        document.location.reload(true);
    }
})

async function getProducts() {
    const data = await request(`get-all-products`);
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
                    let cookie = JSON.parse(getCookie('user')); 
                    const res2 = await request(`add-to-cart`, {
                        method: 'POST',
                        body: {
                            img: p.imgUrl,
                            product_name: p.name,
                            price: p.price,
                            cartUser: cookie.email
                        },
                    });
                    window.alert(`${p.name} was added to your shopping cart`);
                    document.location.reload(true); 
                }
            })
        })
    })
}

function verifySession() {
    if (getCookie("user")){
        document.getElementById('to-change').classList.add('hidden');
        document.getElementById('logout').classList.remove('hidden');
        let profileName = document.getElementById('profile-name');
        let cookie = JSON.parse(getCookie('user'));
        profileName.innerHTML = cookie.username;
        profileName.classList.remove('hidden');
        btnOpen.classList.remove('hidden'); 
    }
}

verifySession();

getProducts();