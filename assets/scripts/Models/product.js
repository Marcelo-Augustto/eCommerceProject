import { request } from '../Helpers/utils.js';

class Product{
    #id = null;
    #img = null;
    #product_name = null;
    #price = null;

    constructor(
        id = null,
        img = null, 
        product_name = null, 
        price = null
        ) {
            this.#id = id
            
            if (img && img != "") {
                this.#img = img;
            }
            if (product_name && product_name != "") {
                this.#product_name = product_name;
            }
            if (price && price != "") {
                this.#price = price;
            }
    }

    static async getAll() {
        return request(`get-all-products`);
    }

    async insert() {
        const body = {
            product_name: this.#product_name,
            price: this.#price,
            img: this.#img,
        }

        const resp = await request(`register-product`, {
            method: 'POST',
            body: body,
        });

        return resp;
    }
}

export { Product };