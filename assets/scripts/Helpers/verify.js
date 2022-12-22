import { setCookie, getCookie, eraseCookie } from "./utils.js";

const Verify = {
    register: function(data1, msg) {
        if (data1.status && data1.status == "Error") {
            msg.innerHTML = '<span style="color: rgb(202, 39, 39); margin-bottom: 1vh;" id="error-r"><b>Invalid email.</b></span>';
            msg.classList.remove('hidden');
        } else {
            msg.innerHTML = '<span style="margin-bottom: 1vh;"><b>The user has been registered successfully.</b></span>';
            msg.classList.remove('hidden');
        }
    },
    login: function(data2) {
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
        }
    },
    index_session: function() {
        if (getCookie("user")){
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            let cookie = JSON.parse(getCookie('user'));
            profileName.innerHTML = cookie.username;
            profileName.classList.remove('hidden');
            document.getElementById('open').classList.remove('hidden'); 
        }
    },
    cart_session: function() {
        if (getCookie("user")){
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            let cookie = JSON.parse(getCookie('user'));
            profileName.innerHTML = cookie.username;
            profileName.classList.remove('hidden');
        }
    },
    about_session: function() {
        if (getCookie("user")){
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            let cookie = JSON.parse(getCookie('user'));
            profileName.innerHTML = cookie.username;
            profileName.classList.remove('hidden');
        }
    }
};

export { Verify };