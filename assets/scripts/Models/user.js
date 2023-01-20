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

        this.#name = name != "" ? name : null;

        this.#email = email != "" ? email : null;
        
        this.#password = password != "" ? password : null;
        
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

    async update(email, password, newUsername, newPassword) {
        const body = {
            email: email,
            password: password,
            newUsername: newUsername,
            newPassword: newPassword
        }

        const resp = await request(`update-user`, { 
            method: 'POST',
            body: body, 
        });

        return resp;
    }
}

export { User };