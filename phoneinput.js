document.addEventListener("DOMContentLoaded", function () {
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');

    let getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, '');
    }

    let onPhonePaste = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        let pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                input.style.borderColor = '#ccc';
                return;
            }
        }
    }

    let onPhoneInput = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            input.style.borderColor = '#ccc';
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            input.style.borderColor = '#ccc';
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.style.borderColor = '#ccc';
        input.value = formattedInputValue;
    }
    let onPhoneKeyDown = function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
        e.target.style.borderColor = '#ccc';
    }

    for (let phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('input').focus();
})

function addError(error, nameError){
    error.innerText = nameError;
    error.style.border = '2px solid red';
    setTimeout(() => {
        error.innerText = '';
        error.style.border = 'none';
        document.querySelector('.error_container').classList.remove('active')
    }, 5000)
}

function isValidPhoneNumber() {

    const telElement = document.querySelectorAll('input[data-tel-input]')[0],
          tel = telElement.value.replace(/\D/gi, ''),
          phoneNumberMask = /^(?:7|8)\d{10}$/,
          errorItem = document.getElementById('error_content');
    
    if(!tel){
        addError(errorItem, 'Please enter phone number');
        telElement.style.borderColor = 'red';
        errorItem.classList.add('active');
        return;
    } 
    
    if(tel.length < 11){
        addError(errorItem, 'Please enter full phone number');
        telElement.style.borderColor = 'red';
        errorItem.classList.add('active');
        return;
    }


    if(phoneNumberMask.test(tel)){
        addError(errorItem, 'valid phone number');
        telElement.style.borderColor = '#ccc';
        return;
    }else{
        addError(errorItem, 'invalid phone number');
        telElement.style.borderColor = 'red';
        errorItem.classList.add('active');
        return;
    }
}