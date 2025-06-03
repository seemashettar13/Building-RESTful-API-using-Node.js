console.log("hello");

import express from 'express';
import { PORT } from './serverConfig.js';
import usersArray from './seed.js';
import { requestLogger, validateUpdateFields, validateUserFields } from './middleware.js';

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// custom middlewares
// Using logging middleware for all routes
app.use(requestLogger);

// Using  validation only on routes that might modify data (POST & PUT)
app.use(validateUserFields);

// using validation only on put routes 
app.use(validateUpdateFields);


app.listen(PORT , ()=>{
    console.log("server is running on port number ",PORT);
})

// to add a new userss
app.post('/user',(req,res)=>{
    try{
        if (!Array.isArray(usersArray)) {
            return res.status(404).json({
                sucess:false,
                message:"Array is empty add the data first"
            })
        }
        let { firstName: incomingFirstName, lastName: incomingLastName, hobby: incomingHobby } = req.body;
        let id=usersArray.length;
        id=id.toString();
        const newData={
            id: id,
            firstName: incomingFirstName,
            lastName: incomingLastName,
            hobby: incomingHobby
        }
        usersArray.push(newData);
        console.log("usersArray is : ",usersArray);
        return res.status(200).json({
            sucess:true,
            message:"congrats new user is added to array || db..",
            data:{
                usersData:usersArray
            }
        })
    }catch(error){
        console.log("error occured in post request");
        if(error.status){
            res.status(error.status).json({
                sucess:false,
                message:error.message
            })
        }
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})

// to get all the user..
app.get('/users',(req,res)=>{
    try{
        if (!Array.isArray(usersArray)) {
            return res.status(404).json({
                sucess: false,
                message: "Array is empty add the data first"
            })
        }
        return res.status(200).json({
            success:true,
            message:"congrats user data fetched sucdessfuly",
            data:{
                usersData:usersArray
            }
        })
    }catch(error){
        console.log("error occured in get request");
        if (error.status) {
            res.status(error.status).json({
                sucess: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
})

// to get user by id..

app.get('/users/:id',(req,res)=>{
    try{
        let id=req.params.id;
        for(let i=0; i<usersArray.length; i++){
            if(id===usersArray[i].id){
                return res.status(200).json({
                    success:true,
                    message:"congrats user fetched sucessfully by id",
                    data:{
                        singleUserData:usersArray[i]
                    }
                })
            }
        }

        return res.status(404).json({
            success:false,
            message:"sorry no user found with given id"
        })

    }catch(error){
        console.log("error occured in get user by id");
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            });
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
})

// update data...

app.put('/user/:id',(req,res)=>{
    try{
        let id=req.params.id;
        console.log("id in parmas in put is : ",id);
        console.log("typeo of user id : ", typeof(usersArray[0].id));

        let {firstName : incomingFirstName ,lastName : incomingLastName ,hobby : incomingHobby}=req.body;
        let index=-1;
        for(let i=0; i<usersArray.length; i++){
            if(usersArray[i].id===id){
                index=i;
                break;
            }
        }
        console.log("idnex is : ",index);
        if (index !== -1) {
            if (incomingFirstName) {
                usersArray[index].firstName = incomingFirstName;
            }
            if (incomingLastName) {
                usersArray[index].lastName = incomingLastName;
            }
            if (incomingHobby) {
                usersArray[index].hobby = incomingHobby;
            }
            return res.status(200).json({
                success:true,
                message:"congrats user updated successfully",
                data:{
                    updatedUserData:usersArray[index]
                }
            })
        }
        return res.status(404).json({
            success:false,
            message:"sorry user not found with given id"
        })
    }catch(error){
        console.log("error occured in update user");
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            });
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
})

// deelte user..

app.delete('/user/:id',(req,res)=>{
    try{
        let id=req.params.id
        let index = -1;
        let preservedIndex=null;
        for (let i = 0; i < usersArray.length; i++) {
            if (usersArray[i].id === id) {
                index = i;
                preservedIndex=index;
                break;
            }
        }
        if(index !==-1){
            // shift the array data..
            for (let i = index; i < usersArray.length - 1; i++) {
                usersArray[i] = usersArray[i + 1];
            }
            console.log("length  of userArray is : ",usersArray.length);
            // pop

            return res.status(200).json({
                success:true,
                message:"user data deleted sucessfully",
                data:{
                    deletedUserData:usersArray[preservedIndex]
                }
            })
        }
        return res.status(404).json({
            success:false,
            message:"sorry user with id not found"
        })
    }catch(error){
        console.log("error occured in delte user");
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false
            });
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
})

app.get('/ping',(req,res)=>{
    return res.status(200).json({
        sucess:true,
        message:"sucessfully sent the request on /ping"
    })
})


// error handeling or showing valid reposne when url is invalid.
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found please use valid api url that start with /users`,
        expectedUrl: `http://localhost/users`
    });
});

// this middleware is for restricting the user to select the correct path of api that start with /users.

app.all("/users", (req, res) => {
    let message;

    switch (req.method) {
        case "POST":
            message = "POST /users is not allowed directly. Use POST /users and add some data";
            break;
        case "PUT":
            message = "PUT /users is not allowed. Use PUT /users/:id instead.";
            break;
        case "DELETE":
            message = "DELETE /users is not allowed. Use DELETE /users/:id to delete a specific user.";
            break;
        default:
            message = `${req.method} /users is not allowed.`;
    }

    return res.status(405).json({
        success: false,
        message: message,
    });
});