import { request, setCookie, getCookie, eraseCookie  } from "./Helpers/utils.js";
import { Verify } from "./Helpers/verify.js";
import { Product } from "./Models/product.js";


// const btnOpen = document.getElementById('open');
// const menu = document.getElementById('add-menu');
// const btnClose = document.getElementById('close');

// btnOpen.addEventListener('click', () => {
//     menu.classList.remove("hidden");
//     btnClose.classList.remove("hidden");
//     btnOpen.classList.add("hidden");
// })

// btnClose.addEventListener('click', () => {
//     menu.classList.add("hidden");
//     btnClose.classList.add("hidden");
//     btnOpen.classList.remove("hidden");
// })

// document.getElementById('add').addEventListener('click', async () => {
//     let img = document.getElementById('img').value;
//     let product_name = document.getElementById('name').value;
//     let price = document.getElementById('price').value;

//     if (!img == "" && !product_name == "" && !price == ""){
//         const product = new Product(
//             null,
//             img, 
//             product_name, 
//             price
//         );
//         product.insert();

//         menu.classList.add("hidden");
//         btnClose.classList.add("hidden");
//         btnOpen.classList.remove("hidden");
//         location.reload(true);
//     }
// })

const iptnSearch = document.getElementById('search-bar');

iptnSearch.addEventListener('input', async () => {
    document.querySelector('.info-section').innerHTML = '';
    document.querySelector('.main-container').innerHTML = '';
    document.querySelector('.section-products').innerHTML = '';
    document.querySelector('.h2-div').innerHTML = '';

    document.querySelector('.h1-deals-div').innerHTML = `<h1>Results for "${iptnSearch.value}"</h1>`;

    const data = await Product.search(iptnSearch.value);
    console.log(data);

    if (data) {
        data.forEach(p => {
                document.querySelector(".main-container").insertAdjacentHTML("afterbegin", `
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
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent buy">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto btn-show-product" href="#">View Product</a></div>
                    </div>
                </div>
              </div>
            `);
        }) 
    }
    if (iptnSearch.value == "") {
        document.location.reload(true);
    }
})



document.getElementById('logout').addEventListener('click', async () => {
    request(`logout`, { method: 'DELETE'} );
    document.location.reload(true);
})

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
                <button type="button" class="btn btn-dark buy">Add to cart</button>
                <button type="button" class="btn btn-outline-dark mt-2">View product</button>
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
}

async function main() {
    Verify.index_session();
    getProducts();
};
main();
