import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config'
import {
    validate
} from './helpers/validate'

import {
    showInputError,
    removeInputError
} from './views/form'

import {
    login
} from './services/auth.service'
import {
    notify
} from './views/notification.js';
import {
    getNews
} from './services/new.service'



const {
    form,
    inputEmail,
    inputPassword
} = UI;

const inputs = [
    inputEmail, inputPassword
]
form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit()
})
inputs.forEach((el) => {
    el.addEventListener('focus', () => removeInputError(el))
})

async function onSubmit() {
    const isValidForm = inputs.every(el => {
        const isValueInput = validate(el);
        if (!isValueInput) {
            showInputError(el)
        }
        return isValueInput;
    });
    console.log(isValidForm);
    if (!isValidForm) return;

    try {
        await login(inputEmail.value, inputPassword.value)
        await getNews();
        form.reset()
        notify({
            msg: 'Login success',
            className: 'alert-success'
        })
    } catch (err) {
        notify({
            msg: 'Login faild',
            className: 'alert-danger'
        })
    }

}