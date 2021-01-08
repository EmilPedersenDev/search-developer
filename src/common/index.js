import vue from 'vue';

import Input from './Input.vue';
import SearchInput from './SearchInput.vue';
import Modal from './Modal.vue';
import Button from './Button.vue';
import Spinner from './Spinner.vue';
import Table from './Table.vue';
import ErrorComp from './Error.vue';
import FileUpload from './FileUpload.vue';
import DateSelect from './DatePicker/DateSelect.vue';
import TextArea from './TextArea.vue';

vue.component('d-input', Input);
vue.component('d-search-input', SearchInput);
vue.component('d-modal', Modal);
vue.component('d-button', Button);
vue.component('d-spinner', Spinner);
vue.component('d-table', Table);
vue.component('d-error', ErrorComp);
vue.component('d-file-upload', FileUpload);
vue.component('d-date-select', DateSelect);
vue.component('d-text-area', TextArea);
