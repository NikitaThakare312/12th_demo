// Function to initialize the UI with stored user details
function initUI() {
    var existingDetails = localStorage.getItem('userDetails');
    var userDetailsArray = existingDetails ? JSON.parse(existingDetails) : [];

    // Display user details in the UI
    var userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear previous entries

    userDetailsArray.forEach(function(userDetails, index) {
        var listItem = document.createElement('li');
        listItem.textContent = `
            Name: ${userDetails.firstName} ${userDetails.lastName},
            Email: ${userDetails.email},
            Phone: ${userDetails.phone}
        `;

        // Create an Edit button for each user
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editUser(index);
        };

        // Create a Delete button for each user
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteUser(index);
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        userList.appendChild(listItem);
    });
}

// Function to edit a user by index
function editUser(index) {
    var existingDetails = localStorage.getItem('userDetails');
    var userDetailsArray = existingDetails ? JSON.parse(existingDetails) : [];

    // Get the user details at the specified index
    var userToEdit = userDetailsArray[index];

    // Populate the form with the user details
    document.getElementById('firstName').value = userToEdit.firstName;
    document.getElementById('lastName').value = userToEdit.lastName;
    document.getElementById('email').value = userToEdit.email;
    document.getElementById('phone').value = userToEdit.phone;

    // Remove the user from the array
    userDetailsArray.splice(index, 1);

    // Update local storage with the modified array
    localStorage.setItem('userDetails', JSON.stringify(userDetailsArray));

    // Reinitialize the UI
    initUI();
}

// Function to handle form submission
function submitForm() {
    // Get user input
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Create an object to store user details
    var userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
    };

    // Retrieve existing user details from local storage (if any)
    var existingDetails = localStorage.getItem('userDetails');
    var userDetailsArray = existingDetails ? JSON.parse(existingDetails) : [];

    // Add the new user details to the array
    userDetailsArray.push(userDetails);

    // Convert the array to a JSON string
    var userDetailsString = JSON.stringify(userDetailsArray);

    // Store the JSON string in local storage
    localStorage.setItem('userDetails', userDetailsString);

    // Reinitialize the UI
    initUI();
}
