import { getCookie, request } from "./Helpers/utils.js";
import { Verify } from "./Helpers/verify.js";
import { Cart } from "./Web/cart.js";


async function main() {
    Verify.cart_session();
    const res = await Cart.get();
    Cart.get_price(res);

    res.forEach(p => {
        document.querySelector('.cart').insertAdjacentHTML('beforeend', `
            <div class="row">
              <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <!-- Image -->
                <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src="${p.imgUrl}"
                    class="w-100"/>
                  <a href="#!">
                    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                  </a>
                </div>
                <!-- Image -->
              </div>

              <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                <!-- Data -->
                <p><strong>${p.name}</strong></p>
                <button type="button" class="btn btn-primary btn-sm me-1 mb-2 delete" data-mdb-toggle="tooltip"
                  title="Remove item">
                  <i class="fas fa-trash"></i>
                </button>
                <!-- Data -->
              </div>

              <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <!-- Quantity -->
                <div class="d-flex mb-4" style="max-width: 300px">
                  <button class="btn btn-primary px-3 me-2 minus">
                    <i class="fas fa-minus"></i>
                  </button>

                  <div class="form-outline">
                    <input id="form1" min="0" name="quantity" value="${p.quantity}" disabled="disabled" class="form-control" />
                    
                  </div>

                  <button class="btn btn-primary px-3 ms-2 plus">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <!-- Quantity -->

                <!-- Price -->
                <p class="text-start text-md-center">
                  <strong>$ ${p.price}</strong>
                </p>
                <!-- Price -->
              </div>
            </div>
            <hr class="my-4" />
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

    document.querySelectorAll('.delete').forEach((e,i) => {
      e.addEventListener('click', () => {
        res.forEach(async (j,k) => {
          if (i == k) {
            Cart.delete(j.name);
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

// <div class="product">
//     <div class="img">
//         <img src="${p.imgUrl}"></img>
//     </div>
//     <div class="product-name n">
//         <span>${p.name}</span>
//     </div>
//     <div class="quantity">
//         <button class="minus"><b> - </b></button>
//         <span class="s-quantity">${p.quantity}</span>
//         <button class="plus"><b> + </b></button>
//     </div>
//     <div class="price">
//         <span>$${p.price}</span>
//     </div>
// </div>