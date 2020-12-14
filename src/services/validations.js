import { regex } from 'vuelidate/lib/validators/common';
const alphaLetterValidation = regex('alpha', /^[A-Za-z]+$/);

export default alphaLetterValidation;
