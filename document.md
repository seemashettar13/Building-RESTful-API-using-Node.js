# API Test Results Document

## [API Test Results Document Link](./src/assets/document%20node_js.pdf)

## GET Request: Fetching All Users

### (1) When API URL is `http://localhost:port/users`

- **Scenario:** API URL is valid and starts with `/users`.
- **Expected:** Returns the list of all users.
- **Actual:** Successful response with user data.
- **HTTP Status:** 200 OK  
- ![Valid URL](./src/assets/Get-%20fetching%20all%20users.png)

---

## GET Request: Fetching Single User Data

### (1) When API URL is `http://localhost:port/users/validId`

- **Scenario:** The user ID is valid.
- **Expected:** Returns the user data corresponding to the valid ID.
- **Actual:** Successful response with user data.
- **HTTP Status:** 200 OK  
- ![Valid ID](./src/assets/Get%20-%20Fetching%20Single%20User.png)

---

## POST Request: Creating a User

### (1) When API URL is `http://localhost:port/users` — No request body provided

- **Scenario:** No request body sent.
- **Expected:** Server throws an error indicating missing request body.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![No Request Body Provided](./src/assets/Post%20-%20No%20body%20%20Req.png)

---

### (2) When API URL is `http://localhost:port/users` — Some fields in the request body are empty

- **Scenario:** Request body is provided but some required fields are empty.
- **Expected:** Server returns an error indicating validation failure.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Empty Fields](./src/assets/Post%20-%20soem%20feilds%20are%20empty.png)

---

### (3) When API URL is `http://localhost:port/users` — Correct fields passed

- **Scenario:** Request body contains all required fields correctly.
- **Expected:** User is created successfully.
- **Actual:** Success response.
- **HTTP Status:** 201 Created  
- ![Correct Fields](./src/assets/Post%20-%20correct%20feilds%20passed.png);

---

## DELETE Request: Deleting a User

### (1) When API URL is `http://localhost:port/users/id` — Valid ID passed

- **Scenario:** Valid user ID provided.
- **Expected:** User is deleted successfully.
- **Actual:** Success response.
- **HTTP Status:** 200 OK  
- ![Valid ID Delete](./src/assets/Delete%20-%20delete%20user.png)

---

## PUT Request: Updating Existing User

### (1) When API URL is `http://localhost:port/users/id` — Valid ID but no request body passed

- **Scenario:** No request body sent with the update.
- **Expected:** Server returns error for missing update data.
- **Actual:** Error thrown.
- **HTTP Status:** 400 Bad Request  
- ![Empty Body PUT](./src/assets/Put%20-%20valid%20id%20but%20no%20req%20body.png)

---

### (2) When API URL is `http://localhost:port/users/id` — Valid ID and valid request body

- **Scenario:** All fields are valid and allowed.
- **Expected:** User updated successfully.
- **Actual:** Success response.
- **HTTP Status:** 200 OK  
- ![Update Successful](./src/assets/Put%20-%20valid%20id%20and%20valid%20req%20body.png)
