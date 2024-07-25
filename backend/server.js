import express from "express"
import {writeCustom,readCustom} from "./utils/functions.js"
import path from "path";
import cors from "cors"
import {PORT} from "./constants/constants.js"


const server = express();

server.use(
    cors({
      origin: "*",
    })
  );

server.use(express.json());
const filePath = path.join(process.cwd(),"data","users.json")
const allUsers = JSON.parse(readCustom(filePath))
server.get("/users",(req,res)=>{
    res.send({
        message: "ok",
        data: allUsers
    })
})
server.get("/users/:userId",(req,res)=>{
    const userID = req.params.userId;
    const foundedUser = allUsers.find((user) => user.id == userID)
    console.log(foundedUser)
    if(foundedUser === undefined){
        res.send({
            message: "Error",
            data: "User Not Found"
        })
    }
    res.send({
        message: "ok",
        data: foundedUser
    })
})

server.post("/users", (req, res) => {
    try {
        const allUsers = JSON.parse(readCustom(filePath))
        const newuser = req.body;
        allUsers.push({
            id: allUsers.at(-1)?.id + 1,
            ...newuser,
        });
        console.log(allUsers)
        writeCustom(filePath,JSON.stringify(allUsers,null,2))
      
        res.send({message: "User added successfully"});
    } catch (error) {
        res.send({
            message: "Error adding user",
        })
    }
  });

  server.put("/users/:id", (req, res) => {
    try {
        const allUsers = JSON.parse(readCustom(filePath));
        const userId = Number(req.params.id);
        const updatedUser = req.body;

        const userIndex = allUsers.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.send({ message: "User not found" });
        }

        allUsers[userIndex] = { 
            id: userId,
             ...updatedUser 
        };
        writeCustom(filePath, JSON.stringify(allUsers, null, 2));

        res.send({ message: "User updated successfully" });
    } catch (error) {
        res.send({ message: "Error updating user" });
    }
});

server.delete("/users/:id", (req, res) => {
    try {
        const allUsers = JSON.parse(readCustom(filePath));
        const userId = Number(req.params.id);

        const userIndex = allUsers.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.send({ message: "User not found" });
        }

        allUsers.splice(userIndex, 1);
        writeCustom(filePath, JSON.stringify(allUsers, null, 2));

        res.send({ message: "User deleted successfully" });
    } catch (error) {
        res.send({ message: "Error deleting user" });
    }
});


server.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`)
})
