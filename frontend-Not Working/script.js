import {getAllUsers,getOneUser} from "./utils.js"
// index.html
async function showUSers(){
const userList = document.getElementById("card-list");
const searchBtn = document.getElementById("searchBtn");
const id = document.getElementById("searchInput").value;
searchBtn.addEventListener("click", async function(e){
    console.log("45454")
    const dataOneUSer = await getOneUser(`http://localhost:8080/users/${id}`)
    const user = Object.values(dataOneUSer)
})

const dataAllUsers = await getAllUsers("http://localhost:8080/users")

const users = Object.values(dataAllUsers)[1]

console.log(dataAllUsers)


userList.innerHTML = "";

console.log(users)

    users.forEach((item)=>{
        console.log(item)
        const newUser = `
                    <li id="card">
                        <img src="./images/user.jpg" alt="image">
                        <div id="card-body">
                          <h3>ID: ${item.id}</h3>
                          <h3>Name: ${item.name}</h3>
                          <h3>Surname: ${item.surname}</h3>
                          <h3>Age: ${item.age}</h3>
                        </div>
                      </li>
        `
        userList.insertAdjacentHTML("beforeend",newUser);
    });
}


showUSers()