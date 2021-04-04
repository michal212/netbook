// let users = [];
const apiLink = "https://next.json-generator.com/api/json/get/NJ-UoW2Xq"
async function bringProfiles() {
    const result = await fetch(apiLink);
    const apiUsers = await result.json();
    return apiUsers;
}

async function getUserById(id) {
    const profiles = await bringProfiles();
    return profiles.find(profile => profile._id === id);

}

async function loadUser() {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('id')) {
        user.classList = 'hidden';
        error.classList = '';
        error.innerText = 'No ID provided';
        return;
    }

    const id = searchParams.get('id');
    const u = await getUserById(id);
    console.debug('user: ', u);
  

    user.innerHTML = `
    
    <h1> ${u.name.first}  ${u.name.last}</h1>
    <div class="card-body">
    <img class="card-img-top" src = "${u.picture}" alt="">
    <p class="card-text">ID: ${u._id}</p>

    <p>email: ${u.email}</p>
        <p>phone: ${u.phone}</p>

    `;
}


document.addEventListener('DOMContentLoaded', loadUser, false);