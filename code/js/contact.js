const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", validateContactForm);

function validateContactForm(event) {
        event.preventDefault();
        
        // NAME
        const nameInput = document.querySelector("#input-name");
        const nameValue = nameInput.value;
        const nameRequired = document.querySelector("#name-required");
        const nameError = document.querySelector("#name-error");
        
        if (lengthCheck(nameValue, 2) === true) {
            nameError.style.display = "none";
            nameRequired.style.display = "none";
            nameInput.style.backgroundColor = "#ACE4E1";
        } else {
            nameError.style.display = "block";
            nameRequired.style.display = "none";
            nameInput.style.backgroundColor = "#FFCDD2";
        }

        // PHONE NUMBER
        const phoneInput = document.querySelector("#input-phone");
        const phoneValue = phoneInput.value;
        const phoneRequired = document.querySelector("#phone-required");

        if (lengthCheck(phoneValue, 0) === true) {
            phoneRequired.style.display = "none";
            phoneInput.style.backgroundColor = "#ACE4E1";
        } else {
            phoneRequired.style.display = "block";
        }

        // EMAIL
        const emailInput = document.querySelector("#input-email");
        const emailValue = emailInput.value;
        const emailRequired = document.querySelector("#email-required");
        const emailInvalid = document.querySelector("#invalid-email-error");

        if (lengthCheck(emailValue, 0) === true) {
            emailRequired.style.display = "none";
            emailInput.style.backgroundColor = "#ACE4E1";
        } else {
            emailRequired.style.display = "none";
            emailInput.style.backgroundColor = "#FFCDD2";
        }

        if (validateEmail(emailValue, 0) === true) {
            emailInvalid.style.display = "none";
            emailInput.style.backgroundColor = "#ACE4E1";
        } else {
            emailInvalid.style.display = "block";
            emailInput.style.backgroundColor = "#FFCDD2";
        }
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
}

function lengthCheck (value, check) {
    const valueLength = value.trim();

    if(valueLength.length > check) {
        return true
    } else {
        return false;
    }
}

function checkLengthValue(event) {
    const inputValue = event.target.value.trim();
    const valueInputLength = inputValue.length;
}