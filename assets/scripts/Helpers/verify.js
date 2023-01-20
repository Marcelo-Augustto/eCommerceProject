import { setCookie, getCookie, eraseCookie, request } from "./utils.js";

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
    login: async function(data2) {
        if (data2.logged){
            const resp = await request(`verify-session`);
            setCookie("user", JSON.stringify({
                email: resp.email, 
            }), 7);
            window.location.href = 'home';
        } else if (data2.error && data2.error== "User Not Found") {
            document.getElementById('error-l').classList.remove('hidden');
        }
    },
    index_session: async function() {
        try {
            const resp = await request(`verify-session`);
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            profileName.innerHTML = resp.name;
            profileName.classList.remove('hidden');
            document.getElementById('open').classList.remove('hidden'); 
        } catch (error) {
            //pass
        }
    },
    cart_session: async function() {
        try {
            const resp = await request(`verify-session`);
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            profileName.innerHTML = resp.name;
            profileName.classList.remove('hidden');
        } catch (error) {
            window.location.href = 'sign-in';
        }
    },
    about_session: async function() {
        try {
            const resp = await request(`verify-session`);
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            profileName.innerHTML = resp.name;
            profileName.classList.remove('hidden');
        } catch (error) {
            //pass
        }
    },
    profile_session: async function() {
        try {
            const resp = await request(`verify-session`);
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            profileName.innerHTML = resp.name;
            profileName.classList.remove('hidden');
        } catch (error) {
            window.location.href = 'sign-in';
        }
    },
    product_session: async function() {
        try {
            const resp = await request(`verify-session`);
            document.getElementById('to-change').classList.add('hidden');
            document.getElementById('logout').classList.remove('hidden');
            let profileName = document.getElementById('profile-name');
            profileName.innerHTML = resp.name;
            profileName.classList.remove('hidden');
        } catch (error) {
            //pass
        }
    }
};

export { Verify };