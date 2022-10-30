class User{
    constructor (username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = "offline";
    }
}

let registers = [];

document.getElementById('register').addEventListener('click', () => {
    let iptn_name = document.getElementById('register-name').value;        
    let iptn_email = document.getElementById('register-email').value;    
    let iptn_password = document.getElementById('register-password').value;
    let error_msg = document.getElementById('error-r');
    error_msg.classList.remove('hidden');

    if(validateEmail(iptn_email) == -2 || validateEmail(iptn_email) == -1 && iptn_name != "" & iptn_email != "" & iptn_password != ""){
        let newUser = new User(iptn_name, iptn_email, iptn_password);
        registers.push(newUser);
        if (!window.localStorage.getItem('user')) {
            window.localStorage.setItem('user', JSON.stringify(registers));
        }else {
            let json = JSON.parse(window.localStorage.getItem('user'));
            json.push(newUser);
            window.localStorage.setItem('user', JSON.stringify(json));
        }
        error_msg.innerHTML = '<span style="margin-bottom: 1vh;"><b>The user has been registered successfully.</b></span>';
    } else{
        error_msg.innerHTML = '<span style="color: rgb(202, 39, 39); margin-bottom: 1vh;" id="error-r"><b>Invalid credentials.</b></span>';
    }
})

function validateEmail(iptn_email){
    if (window.localStorage.getItem('user')) {
        let json = JSON.parse(window.localStorage.getItem('user'));
        let i_email = json.findIndex(e => e.email === iptn_email);
        return i_email;
    } else{
        return -2;
    }
}

document.getElementById('login').addEventListener('click', () => {
    let iptn_email = document.getElementById('login-email').value;
    let iptn_password = document.getElementById('login-password').value;

    if (window.localStorage.getItem('user')) {
        let json = JSON.parse(window.localStorage.getItem('user'));
        let i_user = json.findIndex(e => e.email === iptn_email);
        let i_pass = json.findIndex(e => e.password === iptn_password);

        if (i_user != -1 && i_pass != -1 && i_user == i_pass) {
            json.forEach(u => {
                if (u.email == iptn_email) {
                    u.status = "online";
                    window.localStorage.setItem('user', JSON.stringify(json));
                    window.open("./index.html", "_blank");
                } else{
                    u.status = "offline";
                    window.localStorage.setItem('user', JSON.stringify(json));
                }
            });
        } else {
            document.getElementById('error-l').classList.remove('hidden');
        }
    } else {
        document.getElementById('error-l').classList.remove('hidden');
    }
})

function verifySession() {
    if (window.localStorage.getItem('user')){
        let json = JSON.parse(window.localStorage.getItem('user'));
        json.forEach(u => {
            if (u.status == "online") {
                window.open("./index.html", "_self");
            }
        });
    }
}

verifySession();