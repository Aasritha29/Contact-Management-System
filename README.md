Contact Management System:Here I am using MERN stack to build the application.Here user can create,add,delete and update the contacts.

I have used VS Code to write code 
Front-End Technologies:React JS,Node.js

Back-End Technologies :MongoDB,Express.js

to start client side use 5he following commands: 
cd client
npm run dev

to start server side use 5he following commands: 
cd server
npm run start


API EndPoint :User Registration  

This documentation describes the API endpoint and frontend flow for the registration feature in a React application. The Register component allows users to create a new account by providing their name, email, and password. The application performs client-side validation, sends data to the backend, and displays any server-side validation errors. 

 API Endpoint: POST /contactmsyt/register 

Description: Registers a new user by accepting their name, email, and password. Upon successful registration, the user is redirected to the login page. 

Headers: Content-Type: application/json 

Request Parameters 

The registration API expects a JSON object in the request body with the fields name,email,password

Sample Request Body 
{ 
  "name": "John Doe", 
  "email": "johndoe@example.com", 
  "password": "securepassword123" 
} 
 
Response Format 

Success Response 

Status Code: 200 OK 

Body: 

{ 
  "success": true, 
  "message": "Account created successfully" 
} 
 

EXPLANATION:

success: Boolean confirming successful account creation. 

message: A confirmation message indicating the account was created. 

Error Responses 

Status Code: 400 Bad Request 

Condition: Missing or invalid fields (e.g., email already registered or weak password). 

Body: 

{ 
  "errors": [ 
    { 
      "msg": "Email already in use" 
    } 
  ] 
} 
 

Status Code: 500 Internal Server Error 

Condition: Server encountered an issue processing the registration. 

Body: 
  "errors": [ 
    { 
      "msg": "Server error occurred" 
    } 
  ] 
} 
 

 

Frontend Registration Component Overview 

The Register component handles user input for name, email, and password, validates this data on the client side, and sends a registration request to the backend. 

Code Walkthrough 

Dependencies: 

axios for making API requests. 

react-toastify to show success or error notifications to the user. 

react-router-dom to navigate the user to the login page on success. 

State Variables: 

values: Stores user input for name, email, and password. 

errors: Stores client-side validation errors returned from Validation. 

serverErrors: Stores errors received from the server in case of invalid input. 

Key Functions 

handleInput(event) 

Updates the values state when a user types into the form fields. 

handleSubmit(event) 

Prevents default form submission and validates input. 

If validation passes, sends a POST request to the registration API. 

On success, displays a success message, clears the form, and redirects to the login page. 

If the server returns validation errors, these are displayed in the form. 

Error Handling 

Client-side errors are displayed next to each relevant field based on the errors state. 

Server-side errors appear below the form, iterating over the serverErrors array to display each error. 

 

Security Considerations 

HTTPS: Always use HTTPS to protect sensitive data (e.g., passwords) in transit. 

Data Validation: Client-side validation ensures user experience, but server-side validation is critical for data integrity. 

This API and frontend flow provide a seamless experience for users signing up and allow clear error handling and notifications for both client and server validation cases. 

2.API Endpoint: Login User 

Endpoint: POST /contactmsyt/login 

Description: Authenticates a user by verifying their email and password credentials. If valid, a JWT token is issued to the client. 

Headers: Content-Type: application/json 

Request Parameters 

This endpoint expects a JSON object in the request body with the parameters email,password.

Sample Request Body 

{ 
  "email": "user@example.com", 
  "password": "yourpassword" 
} 
 Response Structure 

The API returns a JSON response based on the outcome of the authentication attempt. 

Success Response 

Status Code: 200 OK 

Body: 

{ 
  "success": true, 
  "token": "jwt-token-here", 
  "user": { 
    "id": "userId", 
    "name": "User Name", 
    "email": "user@example.com" 
  } 
} 
 

Description: 

success: Indicates that the login was successful. 

token: JWT token for the authenticated session, which can be used for subsequent requests. 

user: Object containing user details (ID, name, email). 

Error Responses 

Status Code: 400 Bad Request 

Conditions: Missing or invalid email/password. 

 

Frontend Implementation: Login Component 

The Login component handles the UI for the login page, including form validation, form submission, and error handling. 

Code Explanation 

Dependencies: 

axios for HTTP requests to the backend API. 

react-toastify for notifications. 

react-router-dom for navigation. 

UserContext from App.js to manage user state. 

State Variables: 

values: Stores the email and password entered by the user. 

errors: Holds client-side validation errors. 

serverErrors: Holds server-side validation errors from the API response. 

Key Functions: 

handleInput(event) 

Updates the values state when the user inputs data in the email or password fields. 

handleSubmit(event) 

Prevents form submission’s default behavior and performs client-side validation. 

On success, sends a POST request to the /login API endpoint with values. 

If the server responds with success, stores the JWT token in localStorage, updates the user context with authenticated user details, displays a success notification, and redirects the user to the dashboard. 

If there are server-side validation errors, displays them below the form. 

Error Handling: 

Client-side errors from the Validation function are stored in errors and displayed inline under relevant form fields. 

Server-side errors are stored in serverErrors and rendered below the form. 

 

 

3.Endpoint: Add Contact 

This API allows the addition of a new contact with specified details: name, email, phone number, and address. It requires a JSON Web Token (JWT) for user authentication to ensure only authorized users can create new contacts. 

URL: http://localhost:3000/contactmsyt/add-contact 

Method: POST 

Authentication: Bearer Token (JWT) 

Headers: 

Authorization: Bearer <JWT Token> 

The JWT token is fetched from local storage in the client application (localStorage.getItem('token')). 

Request Body Parameters: All fields should be provided in JSON format. (name,email,phone,address)

Request Example: 

{ 
  "name": "John Doe", 
  "email": "johndoe@example.com", 
  "phone": "1234567890",  

"address": "1234 Elm Street, Springfield" 
} 

 Response Structure: 

Success: 

Status Code: 200 OK 

Body: 

{ 
  "success": true, 
  "message": "Contact Added Successfully" 
} 
 

Error: 

Status Code: Varies based on the issue (e.g., 400 Bad Request, 401 Unauthorized) 

Body (example): 

{ 
  "success": false, 
  "error": "Invalid token"  // or "Validation error", etc. 
} 
 

Component Walkthrough 

The AddContact React component is a form interface that allows users to add a new contact by entering the name, email, phone number, and address. This form validates the inputs based on specific criteria and then submits the data via a POST request. 

1. Form Validation Rules: 

Name: Requires 5-20 characters. 

Email: Must be a valid email format. 

Phone Number: Must be exactly 10 digits. 

Address: Optional field without validation. 

2. State Management: 

values: An object holding all form input values, updated with each change in the input fields. 

3. Event Handlers: 

handleInput: Updates the values state with each change to an input field. 

handleSubmit: Validates and submits the form data. The axios.post method sends the form data to the server, and a success toast notification appears if the contact is added successfully. 

4. Toast Notification: 

A success toast notification is displayed upon successful addition of a contact 

 
  4.ENDPOINT: CONTACTS 

     URL:http://localhost:3000/contactmsyt 

     METHOD: GET 

     4.1. Fetch All Contacts 

     Endpoint 
       GET /contacts 
 Description 

Fetches all contacts for the authenticated user. 

Response 

Success (200 OK): 

Response Body: 

{ 
  "success": true, 
  "contacts": [ 
    { 
      "_id": "unique_contact_id", 
      "name": "John Doe", 
      "email": "john@example.com", 
      "phone": "1234567890", 
      "address": "1234 Elm Street" 
    }, 
    { 
      "_id": "another_contact_id", 
      "name": "Jane Doe", 
      "email": "jane@example.com", 
      "phone": "0987654321", 
      "address": "5678 Oak Avenue" 
    } 
  ] 
} 

Error (401 Unauthorized): 

Response Body: 

{ 
  "success": false, 
  "message": "Authentication failed. No token provided." 
} 


 Error Handling: 

Ensure a valid token is sent in the request header. Handle errors by logging them and optionally showing a relevant error message to the user. 

 

4.2 Delete a Contact 

Endpoint 
DELETE /contact/:id 

 Description 

Deletes a specific contact by its unique ID. 
Response 

Success (200 OK): 

Response Body: 

{ 
  "success": true, 
  "message": "Contact deleted successfully.", 
  "contacts": [ 
    { 
      "_id": "remaining_contact_id", 
      "name": "John Doe", 
      "email": "john@example.com", 
      "phone": "1234567890", 
      "address": "1234 Elm Street" 
    } 
  ] 
} 
 

On successful deletion, the updated list of contacts is returned. 

Error (401 Unauthorized or 404 Not Found): 

Response Body (401 Unauthorized): 

{ 
  "success": false, 
  "message": "Unauthorized access. Please provide a valid token." 
} 
 

Response Body (404 Not Found): 

{ 
  "success": false, 
  "message": "Contact not found." 
} 
 

Error Handling: 

Show an error message if deletion fails due to invalid ID or server issues. 

 

Example Workflow in Contacts Component 

Fetching Contacts: 

The useEffect hook in Contacts sends a GET request to the /contacts endpoint to load all contacts upon component mount. 

Upon success, it stores the retrieved contacts in the contacts state. 

If an error occurs, it sets loading to false and logs the error. 

Deleting a Contact: 

The deleteRecord function sends a DELETE request to /contact/:id after user confirmation via a SweetAlert popup. 

Upon success, the deleted contact is removed from the state. 

On failure, a SweetAlert error popup displays an error message. 

 

5.API End Point: EditContact  

Overview 

The EditContact component provides an interface for users to edit an existing contact's details, including name, email, phone number, and address. The component uses React state management, Axios for HTTP requests, and React-Toastify for notifications. It handles both fetching contact data (via GET) and updating the contact (via PUT). 

API Endpoints 

5.1. Get Contact by ID 

Endpoint: GET /contactmsyt/contact/{id} 

Description: Retrieves the details of a specific contact using its unique ID. 

URL Parameters: 

id (required): The ID of the contact to retrieve. 

Headers: 

Authorization: A JWT token passed in the header for user authentication. 

Example: Bearer {token} 

Response: 

Success: Returns the contact's details (name, email, phone, address). 

Failure: If the contact does not exist or there is an error, returns an error message. 

Response Example (Success): 

{ 
  "success": true, 
  "contact": { 
    "name": "John Doe", 
    "email": "john.doe@example.com", 
    "phone": "123-456-7890", 
    "address": "123 Main St, Anytown, USA" 
  } 
} 


 Response Example (Failure): 

{ 
  "success": false, 
  "message": "Contact not found" 
} 
 5.2. Update Contact 

Endpoint: PUT /contactmsyt/update-contact/{id} 

Description: Updates the details of an existing contact based on the provided contact ID and form data. 

URL Parameters: 

id (required): The ID of the contact to update. 

Request Body: 

{ 
  "name": "John Doe", 
  "email": "john.doe@example.com", 
  "phone": "1234567890", 
  "address": "123 Main St, Anytown, USA" 
} 
 Headers: 

Authorization: A JWT token passed in the header for user authentication. 

Example: Bearer {token} 

Response: 

Success: A success message indicating that the contact was updated. 

Failure: Returns an error message if the update operation fails. 

Response Example (Success): 

{ 
  "success": true, 
  "message": "Contact updated successfully" 
} 

 Response Example (Failure): 

{ 
  "success": false, 
  "message": "Error updating contact" 
} 
 
Component Behavior 
Component Structure 

The EditContact component is composed of the following key parts: 

State Management: 

values: Holds the current values of the contact's fields (name, email, phone, address). 

Event Handlers: 

handleInput: Updates the corresponding field in the values state as the user types. 

handleSubmit: Sends a PUT request to update the contact when the form is submitted. 

HTTP Requests: 

GET Request: Retrieves the contact information based on the id in the URL. 

PUT Request: Sends updated data to the backend for contact modification. 

Form: 

Displays input fields for name, email, phone, and address. 

Includes corresponding icons for each field (e.g., FaUserPlus, FaAt, FaPhoneFlip, FaRegAddressCard). 

The form submits with a button labeled "Update". 

Toast Notification: 

Displays a success message when the contact is successfully updated. 

The message automatically disappears after 5 seconds. 

 
 
