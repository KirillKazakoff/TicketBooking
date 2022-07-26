import { FetchStatusT } from '../../../../types/typesPayload';

type ValidateCityT = (
    inputEl: HTMLInputElement,
    stateCity: string,
    status: FetchStatusT
) => void;

const validateCity: ValidateCityT = (inputEl, stateCity, status) => {
    const { value, validity } = inputEl;

    let customValidity = '';

    if (
        value
        && stateCity !== value.trim().toLowerCase()
        && validity.valid
        && status !== 'loading'
    ) {
        customValidity = 'noCity';
    }

    inputEl.setCustomValidity(customValidity);
};

export default validateCity;
