import React from 'react';
import SearchDateInput from './SearchDateInput';

import { useTime } from '../../DatePicker/utils/useTime';
import { SearchDateDir } from '../../../../types/typesSearch';

export default function SearchDateTo({
    onChange,
    onBlur,
    onFocus,
    validate,
}: SearchDateDir) {
    const name = 'dateTo';
    const timeObj = useTime(name);

    return (
        <SearchDateInput
            validate={validate}
            time={timeObj}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder='ДД/ММ/ГГ (Туда)'
            required
        />
    );
}
