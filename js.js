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
    checkLength(username, 5, 25);
    checkLength(password, 8, 20);
    isValidEmail(email);
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

// Implementing Password matching
function checkPassword(input1, input2){
    if(input1.value === input2.value) showError(`Password must match ${input1.value}`);
}

// Implementing Email validation
function isValidEmail(input){
    const re = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/
    if(re.test(input.value)){
        showSuccess(input)
    } else {
        showError(input, `${input.value} is not a valid email`);
    }
}