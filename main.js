let users = [];
const apiLink = "https://next.json-generator.com/api/json/get/NJ-UoW2Xq"
async function bringProfiles() {
    let result = await fetch(apiLink);
    let apiUsers = await result.json();
    let allUsers = [...apiUsers, ...users];

    return allUsers;
}

let profiles;
async function showProfiles() {
    history.pushState('cards', 'cards', '/index.html')

    row.innerHTML = "";
    
    table.innerHTML="";

    profiles = await bringProfiles()
    profiles.forEach(profileObj => {
        row.innerHTML +=
            `<div class="col-lg-4 ">
        <div class="card mx-30">
        <img class="card-img-top"src="${profileObj.picture}" alt="Card image cap">
        <div class="card-body">
        <h6 class="card-title"> I'M ${profileObj.name.first}  ${profileObj.name.last} </h6>
   
        <p class="card-text">  ${profileObj.age} years old, you can in touch with me ${profileObj.email} or ${profileObj.phone} </p>
    
         <a href="/user.html?id=${profileObj._id}" class="btn btn-info">watch profile</a>
                </div>
                </div>
                 </div>
            `
    });
}



async function tableProfiles() {

    history.pushState('table', 'table', '/index.html?mode=table')

    row.innerHTML = "";
    table.innerHTML = "";


    profiles = await bringProfiles()
    profiles.forEach(profileObj => {
        table.innerHTML +=

            `  
            
            <tr class="table-active">
            
     
        <td>${profileObj.picture}</td>
                <td>${profileObj.name.first}</td>
                <td> ${profileObj.name.last}</td>
                <td>${profileObj.age}</td>
                <td>${profileObj.email}</td>
               <td> ${profileObj.phone}</td>
    
        </tr>`

    })



}



function addUser() {

    let user = {
        _id: `${users.length + 1}`,
        name: {
            first: firstNameInput.value,
            last: lastNameInput.value,
        },


        age: ageInput.value,
        picture: imgInput.value,
        phone: phoneNumberInput.value,

    };


    users.push(user);
    loadMode();


}



function loadMode() {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('mode')) {
        const mode = searchParams.get('mode');
        if (mode === 'table') {
            tableProfiles();
        }
    } else {
        showProfiles();
    }
}


document.addEventListener('DOMContentLoaded', loadMode, false)



