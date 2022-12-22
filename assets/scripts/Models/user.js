import { request } from '../Helpers/utils.js';

class User{
    #id = null;
    #name = null;
    #email = null;
    #password = null;

    constructor(
        id = null,
        name = null,
        email = null,
        password = null
    ) {
        this.#id = id;

        if (name && name != "") {
            this.#name = name;
        }
        if (email && email != "") {
            this.#email = email;
        }
        if (password && password != "") {
            this.#password = password;
        }
    }

    async insert() {
        const body = {
            name: this.#name,
            email: this.#email,
            password: this.#password
        }

        const resp = await request(`register`, { 
            method: 'POST',
            body: body, 
        });

        return resp;
    }

    async login() {
        const body = {
            email: this.#email,
            password: this.#password
        }

        const resp = await request(`login`, { 
            method: 'POST',
            body: body, 
        });

        return resp;
    }
}

export { User };