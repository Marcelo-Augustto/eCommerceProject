import { User } from "./Models/user.js";
import { Verify } from "./Helpers/verify.js";

document.getElementById('register').addEventListener('click', async () => {
    let iptn_name = document.getElementById('register-name').value;        
    let iptn_email = document.getElementById('register-email').value;    
    let iptn_password = document.getElementById('register-password').value;
    let msg = document.getElementById('error-r');

    if (iptn_name != "" && iptn_email != "" && iptn_password != "") {
        const user = new User(
            null,
            iptn_name,
            iptn_email,
            iptn_password
        );

        Verify.register(user.insert(), msg);
    }    
});

document.getElementById('login').addEventListener('click', async () => {
    let iptn_email = document.getElementById('login-email').value;    
    let iptn_password = document.getElementById('login-password').value;
    
    if (iptn_email != "" && iptn_password != "") {
        const user = new User(
            null,
            null,
            iptn_email,
            iptn_password,
        );
        
        Verify.login(await user.login());

    } else {
        document.getElementById('error-l').classList.remove('hidden');
    }
});
