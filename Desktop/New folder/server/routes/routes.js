const Body = require("../controllers/Body")
const User = require("../controllers/user")

module.exports = (app)=>{
    app.post("/api/CreateBody", Body.createBody)
    app.get('/api/Body', Body.getAllBodies);
    app.get('/api/Body/:id', Body.getBody);
    app.put('/api/Body/:id', Body.updateBody);
    app.delete('/api/Body/:id', Body.deleteBody);
    app.post("/api/register" , User.registerUser);
    app.post("/api/login" , User.loginUser);
    app.get("/api/allUsers" , User.getAllUsers);
    app.get("/api/allUsers/:id" , User.getOneUser);
    app.delete("/api/allUsers/:id" , User.deleteUser);
}
