import { getCookie, request } from "./utils.js";

function verifySession() {
    if (getCookie("user")){
        document.getElementById('to-change').classList.add('hidden');
        document.getElementById('logout').classList.remove('hidden');
        let profileName = document.getElementById('profile-name');
        let cookie = JSON.parse(getCookie('user'));
        profileName.innerHTML = cookie.username;
        profileName.classList.remove('hidden');
    }
}

async function getCart () {
    let cookie = JSON.parse(getCookie('user'));
    const res = await request(`get-cart`, { 
        method: 'POST',
        body: {
            user: cookie.email 
        }
    });
    console.log(res);

    res.forEach(p => {
        document.querySelector('.cart').insertAdjacentHTML('beforeend', `
            <div class="product">
                <div class="img">
                    <img src="${p.imgUrl}"></img>
                </div>
                <div class="product-name n">
                    <span>${p.name}</span>
                </div>
                <div class="quantity">
                    <button class="minus"><b> - </b></button>
                    <span class="s-quantity">${p.quantity}</span>
                    <button class="plus"><b> + </b></button>
                </div>
                <div class="price">
                    <span>$${p.price}</span>
                </div>
            </div>
        `)
    });

    let totalPrice = 0;
    res.forEach(p => {
        let tempPrice = Number(p.price) * Number(p.quantity);
        totalPrice = totalPrice + tempPrice;
    });
    document.getElementById('total').innerHTML = `$ ${totalPrice.toFixed(2)}`;

    document.querySelectorAll('.minus').forEach((e,i) => {
        e.addEventListener('click', () => {
            res.forEach( async (j,k) =>{
                if (i == k) {
                    if (j.quantity < 1) {
                        const res = await request(`change-cart`, {
                            method: 'POST',
                            body: { 
                                user: JSON.parse(getCookie('user')).email, 
                                action: "delete",
                                productName: j.name
                            }
                        });
                    } else {
                        const res2 = await request(`change-cart`, {
                            method: 'POST',
                            body: { 
                                user: JSON.parse(getCookie('user')).email, 
                                action: "remove",
                                productName: j.name
                            }
                        });
                    }
                    document.location.reload(true);
                }
            })
        })
    })

    document.querySelectorAll('.plus').forEach((e,i) => {
        e.addEventListener('click', () => {
            res.forEach( async (j,k) =>{
                if (i == k) {
                    let product = j.name;
                    // console.log(product)
                    let cookie = JSON.parse(getCookie('user'));
                    const res = await request(`change-cart`, {
                        method: 'POST',
                        body: { 
                            user: cookie.email, 
                            action: "add",
                            productName: product
                        }
                    });
                    document.location.reload(true);
                    console.log(res);
                }
            })
        })
    })
}

verifySession();
getCart();