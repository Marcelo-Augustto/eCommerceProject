import { Verify } from "./Helpers/verify.js";
import { request } from "./Helpers/utils.js";
import { User } from "./Models/user.js";

document.getElementById('logout').addEventListener('click', async () => {
    request(`logout`, { method: 'DELETE'} );
    document.location.reload(true);
});

document.querySelector('.btn-save').addEventListener('click', async () => {
    const user = await request(`verify-session`);
    const sample = new User();

    let newUsername = document.querySelector('.input-username').value;
    let newPassword = document.querySelector('.input-password').value;
    let password = document.querySelector('.input-password-old').value;

    let resp = await sample.update(user.email, password, newUsername, newPassword);
    
    if (resp = "success") {
        alert("User was updated");
        request(`logout`, { method: 'DELETE'} );   
        document.location.reload(true);
    } else {
        alert("You need to type in your current password");
    }
});

async function getInfo() {
    const user = await request(`verify-session`);
    document.querySelector('.span-username').innerHTML = user.name;
    document.querySelector('.span-email').innerHTML = user.email;
}

Verify.profile_session();
getInfo();
