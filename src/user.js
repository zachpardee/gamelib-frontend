
fetch("http://localhost:3000/api/v1/users")
.then(res => res.json())
.then(users_data => generateUserList(users_data));

function generateUserList(user_data){
   let dropdownMenu  = document.querySelector(".dropdown-menu");
   user_data.forEach(user => {
       let dropdownItem = document.createElement("a");
       dropdownItem.setAttribute("class", "dropdown-item");
       dropdownItem.innerHTML = user.name;
       dropdownMenu.appendChild(dropdownItem);
   });
}

let currentUserButton = document.querySelectorAll("ul");
function changeCurrentUser(){
    let dropdownMenu = document.querySelector(".navbar-collapse")
    document.addEventListener("click", function(e){
        if(e.target.className === "dropdown-item"){
            console.log(e.target.parentNode.parentNode.parentNode.children[3].children[0].innerHTML);
            console.log(dropdownMenu);

            e.target.parentNode.parentNode.parentNode.children[3].children[0].innerHTML = e.target.innerHTML;
        }
    })
}
changeCurrentUser();

