import { Verify } from "./Helpers/verify.js";
import { request } from "./Helpers/utils.js";

document.getElementById('logout').addEventListener('click', async () => {
    request(`logout`, { method: 'DELETE'} );
    document.location.reload(true);
})

Verify.about_session();