import { getCookie } from "./utils.js";

function verifySession() {
    if (getCookie("user")){
        document.getElementById('to-change').classList.add('hidden');
        document.getElementById('logout').classList.remove('hidden');
        let profileName = document.getElementById('profile-name');
        let cookie = JSON.parse(getCookie('user'));
        profileName.innerHTML = cookie.username;
        profileName.classList.remove('hidden');
    }
}

verifySession();