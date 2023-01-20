import { request } from '../Helpers/utils.js';

class Product{
    #id = null;
    #img = null;
    #product_name = null;
    #price = null;
    #description = null;
    #owner = null;

    constructor(
        id = null,
        img = null, 
        product_name = null, 
        price = null,
        description = null,
        owner = null
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
            if (description && description != "") {
                this.#description = description;
            }
            if (owner && owner != "") {
                this.#owner = owner;
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
            description: this.#description,
            owner: this.#owner
        }

        const resp = await request(`register-product`, {
            method: 'POST',
            body: body,
        });

        return resp;
    }

    async delete(product_name) {
        const resp = await request(`delete-product/${product_name}`, { method: 'DELETE'});

        return resp;
    }

    static async search(name) {
        const resp = await request(`search`, {
            method: 'POST',
            body: {
                name: name
            }
        });

        return resp;
    }
}

export { Product };