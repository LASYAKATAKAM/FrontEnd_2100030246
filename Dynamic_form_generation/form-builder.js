var survey_options = document.getElementById('survey_options');
var add_more_fields = document.getElementById('add_more_fields');
var remove_fields = document.getElementById('remove_fields');
var submit_button = document.getElementById('submit_button');
var field_type = document.getElementById('field_type');
var error_message = document.getElementById('error_message');

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleSubmit(event) {
    event.preventDefault();

    var form_fields = survey_options.getElementsByClassName('form-field');
    var isValidForm = true;
    var formData = {};

    for (var i = 0; i < form_fields.length; i++) {
        var input = form_fields[i].querySelector('input, select');
        if (input) {
            var fieldValue = input.value.trim();
            if (fieldValue === '') {
                isValidForm = false;
                window.alert('Please fill out all fields.');
                return;
            }
            if (input.type === 'email' && !isValidEmail(fieldValue)) {
                isValidForm = false;
                window.alert('Email is not correct.');
                return;
            }
            formData[input.name] = fieldValue;
        }
    }

    if (!isValidForm) {
        return;
    }

    console.log(formData);

    window.alert('Form submitted successfully.');
}

add_more_fields.onclick = function() {
    var selectedFieldType = field_type.value;
    var newField;
    var wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('form-field');

    switch (selectedFieldType) {
        case 'text':
            newField = document.createElement('input');
            newField.setAttribute('type', 'text');
            newField.setAttribute('placeholder', 'Text Field');
            break;
        case 'checkbox':
            newField = document.createElement('input');
            newField.setAttribute('type', 'checkbox');
            newField.setAttribute('class', 'checkbox');
            wrapperDiv.appendChild(document.createTextNode(' Checkbox'));
            break;
        case 'radio':
            var labelText = prompt("Enter label text for radio button:");
            newField = document.createElement('input');
            newField.setAttribute('type', 'radio');
            newField.setAttribute('class', 'radio');
            newField.setAttribute('name', 'radio_group');
            var label = document.createElement('label');
            label.appendChild(document.createTextNode(labelText));
            wrapperDiv.appendChild(label);
            break;
        case 'select':
            newField = document.createElement('select');
            newField.innerHTML = `
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            `;
            break;
        case 'date':
            newField = document.createElement('input');
            newField.setAttribute('type', 'date');
            break;
        case 'number':
            newField = document.createElement('input');
            newField.setAttribute('type', 'number');
            newField.setAttribute('placeholder', 'Number Field');
            break;
        default:
            newField = document.createElement('input');
            newField.setAttribute('type', 'text');
            newField.setAttribute('placeholder', 'Another Field');
    }

    newField.setAttribute('name', 'survey_options[]');
    newField.setAttribute('class', 'survey_options');
    wrapperDiv.appendChild(newField);
    survey_options.appendChild(wrapperDiv);
}

remove_fields.onclick = function() {
    var form_fields = survey_options.getElementsByClassName('form-field');
    if (form_fields.length > 2) {
        survey_options.removeChild(form_fields[form_fields.length - 1]);
    }
}

submit_button.addEventListener('click', handleSubmit);
