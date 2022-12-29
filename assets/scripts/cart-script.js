import { getCookie, request } from "./Helpers/utils.js";
import { Verify } from "./Helpers/verify.js";
import { Cart } from "./Web/cart.js";


async function main() {
    Verify.cart_session();
    const res = await Cart.get();
    Cart.get_price(res);

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

    document.querySelectorAll('.minus').forEach((e,i) => {
        e.addEventListener('click', () => {
            res.forEach( async (j,k) =>{
                if (i == k) {
                    if (j.quantity < 1) {
                        Cart.delete(j.name);
                    } else {
                        Cart.decrease(j.name);
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
                    Cart.increase(j.name);
                    document.location.reload(true);
                }
            })
        })
    })

    document.getElementById('logout').addEventListener('click', async () => {
        request(`logout`, { method: 'DELETE'} );
        document.location.reload(true);
    })
}
main();
