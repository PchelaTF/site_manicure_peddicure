import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

export const sendFormData = (props) => {
    const form = document.querySelector(props.formSelector);
    const telSelector = form.querySelector(props.telSelector);
    const inputTelMask = new Inputmask('+38 (999) 999-99-99');
    inputTelMask.mask(telSelector);
    form.addEventListener('submit', sendForm);

    async function sendForm(e) {
        e.preventDefault();

        let error = formValidate();

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert("Помилка");
                form.classList.remove('_sending');
            }
        } else {
            // alert('Заполните необходимые поля');
        }
    }

    function formValidate() {
        let error = 0;
        let formRequiredFilds = document.querySelectorAll(props.requiredInputsSelector);

        for (let i = 0; i < formRequiredFilds.length; i++) {
            const input = formRequiredFilds[i];
            formRemoveError(input);

            if (input.classList.contains('_phone')) {
                if (!telTest()) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function telTest() {
        const phone = telSelector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
    }

};