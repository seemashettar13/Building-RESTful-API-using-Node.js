# User Management API

A simple **User Management REST API** built with **Node.js** and **Express.js**, using an in-memory array (`usersArray`) for data storage. It supports full CRUD operations via HTTP methods.

---

## 📦 Tech Stack

- Node.js  
- Express.js  
- JavaScript (ES6)  
- In-Memory Storage (Array)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation & Run

```bash
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
npm install
node server.js

📁 Project Structure

src/
├── server.js            # Entry point
├── seed.js              # In-memory usersArray
├── serverConfig.js      # Exports PORT value
├── middleware.js        # Request logger and validation middleware

📬 API Endpoints
✅ Ping
GET /ping
Check if the server is running.

👤 Create a User
POST /user

RequestBody:
{
  "firstName": "John",
  "lastName": "Doe",
  "hobby": "Reading"
}

Response:

{
  "success": true,
  "message": "congrats new user is added to array || db..",
  "data": {
    "usersData": [...]
  }

  📋 Get All Users
GET /users
Returns a list of all users.

🔍 Get User by ID
GET /users/:id
Fetch a single user by their ID.

✏️ Update User
PUT /user/:id

RequestBody:
{
  "firstName": "Jane",
  "lastName": "Smith",
  "hobby": "Cycling"
}

❌ Delete User
DELETE /user/:id
Remove a user by their ID.

🧰 Middleware
requestLogger: Logs HTTP method and route

validateUserFields: Ensures required fields exist in POST/PUT

validateUpdateFields: Validates allowed fields during update

❗ Error Handling
Custom 404 for undefined routes

Blocks POST, PUT, DELETE on /users directly

⚠️ Notes
Data is not persistent — resets on every server restart

Ensure at least one user exists before using GET/PUT/DELETE


✅ **Now you're good to paste this into your `README.md` file directly.** Let me know if you want to add badges, deployment steps (like using Render or Railway), or link your API to a frontend project.


