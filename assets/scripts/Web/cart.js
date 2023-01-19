import { request, getCookie } from "../Helpers/utils.js";

const Cart = {
    get: async function() {
        const res = await request(`get-cart`, { 
        method: 'POST',
        body: {
            user: JSON.parse(getCookie('user')).email,
        }
    })
        return res;
    },
    delete: async function(product_name) {
        const res = await request(`change-cart`, {
            method: 'POST',
            body: { 
                user: JSON.parse(getCookie('user')).email, 
                action: "delete",
                productName: product_name
            }
        });
    },
    decrease: async function(product_name) {
        const res2 = await request(`change-cart`, {
            method: 'POST',
            body: { 
                user: JSON.parse(getCookie('user')).email, 
                action: "remove",
                productName: product_name
            }
        });
    },
    increase: async function(product_name) {
        const res = await request(`change-cart`, {
            method: 'POST',
            body: { 
                user: JSON.parse(getCookie('user')).email, 
                action: "add",
                productName: product_name
            }
        });
    },
    get_price: function(data) {
        let totalPrice = 0;
        data.forEach(p => {
            let tempPrice = Number(p.price) * Number(p.quantity);
            totalPrice = totalPrice + tempPrice;
        });
            document.querySelector('.total').innerHTML = `$ ${totalPrice.toFixed(2)}`;
            document.querySelector('.total1').innerHTML = `$ ${totalPrice.toFixed(2)}`;
    },
};

export { Cart };