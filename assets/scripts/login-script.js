import { request, setCookie, getCookie } from "./utils.js";

document.getElementById('register').addEventListener('click', async () => {
    let iptn_name = document.getElementById('register-name').value;        
    let iptn_email = document.getElementById('register-email').value;    
    let iptn_password = document.getElementById('register-password').value;
    let msg = document.getElementById('error-r');

    if (iptn_name != "" && iptn_email != "" && iptn_password != "") {
        // const data1 = await post('../../Source/App/insert-user.php', {
        //     name: iptn_name,
        //     email: iptn_email,
        //     password: iptn_password
        // })
        const data1 = await request(`register`, {
            method: 'POST',
            body: {
                name: iptn_name,
                email: iptn_email,
                password: iptn_password
            }
        })
        //console.log(data1);
        if (data1.status && data1.status == "Error") {
            msg.innerHTML = '<span style="color: rgb(202, 39, 39); margin-bottom: 1vh;" id="error-r"><b>Invalid email.</b></span>';
            msg.classList.remove('hidden');
        } else {
            msg.innerHTML = '<span style="margin-bottom: 1vh;"><b>The user has been registered successfully.</b></span>';
            msg.classList.remove('hidden');
        }
    }    
});

document.getElementById('login').addEventListener('click', async () => {
    let iptn_email = document.getElementById('login-email').value;    
    let iptn_password = document.getElementById('login-password').value;
    
    if (iptn_email != "" && iptn_password != "") {

        const data2 = await request(`login`, {
            method: 'POST',
            body: {
                email: iptn_email,
                password: iptn_password
            },
        })

        if (data2.status && data2.status == "success"){
            console.log(data2);
            setCookie("user", JSON.stringify({
                id: data2.user.id,
                username: data2.user.name, 
                email: data2.user.email
            }), 7);
            window.location.href = 'home';
        } else if (data2.status && data2.status == "User Not Found") {
            document.getElementById('error-l').classList.remove('hidden');
            //console.log(data2);
        }
    } else {
        document.getElementById('error-l').classList.remove('hidden');
    }
});
