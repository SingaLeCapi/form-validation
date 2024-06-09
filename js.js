// Getting form element
const form = document.getElementById('form');

// Getting inputs from the form
const email = document.getElementById('email');
const password = document.getElementById('password');
const username = document.getElementById('username');
// Defining array of inputs to perform necessary validation
const inputs = [ username, email, password ]
// Handling form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Checking form inputs for appropriate validation
    checkRequired(inputs)
});

// Refactoring the Code
function checkRequired(inputsArr){
    inputsArr.forEach(input => {
        if(input.id.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

function getFieldName(input) {
    // Getting the name property of the input field
    if(input.name){
        return input.name.charAt(0).toUpperCase() + input.name.slice(1);
    }
    // Using form property and element relationship
    const formElement = input.form
    if(formElement){
        for(const element of formElement.elements){
            if(element === input){
                return element.name.charAt(0).toUpperCase() + element.name.slice(1);
            }
        }
    }

    return "Not Found";
}

// Implementing Length validation
function checkLength(input, min, max){
    if(input.value.length < min || input.value.length > max){
        showError(`Length must be between ${min} and ${max}`);
    }else {
        showSuccess(input);
    }
}

function validateForm(){
    // Extracting error messages ids
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const emailError = document.getElementById('email-error');
    const confirmPasswordError = document.getElementById('confirmPassword-error');

    // Reseting Error messages
    usernameError.textContent = '';
    passwordError.textContent = '';
    emailError.textContent = '';
    confirmPasswordError.textContent = '';

    // Validating the username
    if(username === '' || username.length < 3 ){
        usernameError.textContent += 'Username must be at least 3 characters long';
        return;
    }

    // Validating inputted email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email)){
        emailError.textContent += 'Email not valid';
        return;
    }

    //Validating the password
    if(password === '' || password.length < 8){
        passwordError.textContent += 'Password must be at least 8 characters long';
    }
}