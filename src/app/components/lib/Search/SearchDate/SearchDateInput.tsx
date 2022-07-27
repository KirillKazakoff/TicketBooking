import React, { useEffect, useRef, useState } from 'react';

import InputWrapper from '../../Common/Form/InputWrapper';
import DatePicker from '../../DatePicker/DatePicker';
import DatePickerIcon from '../../DatePicker/DatePickerIcon';

import { useAppSelector } from '../../../../redux/reduxHooks';
import { SearchDateInputProps } from '../../../../types/typesSearch';
import Feedback from '../../Common/Feedback/Feedback';

import useValidateDate from './useValidateDate';
import { getValidityCls } from '../../Common/Form/getValidityCls';

export default function SearchDateInput(props: SearchDateInputProps) {
    const {
        time,
        name,
        onChange,
        onFocus,
        onBlur,
        validate,
        required,
        // onClickCheck,
        placeholder,
    } = props;

    const disabled = !time?.dateInit.month;
    const dateState = useAppSelector((state) => state.searchDate[name]);
    const inputEl = useRef<HTMLInputElement>(null);
    const validityCls = getValidityCls(dateState);
    // const onClick = onClickCheck ? onClickCheck(disabled, name) : null;
    const [isPickerActive, setPickerActive] = useState(false);
    const validateDate = useValidateDate();

    useEffect(() => {
        if (!inputEl.current) return;
        const input = inputEl.current;

        validateDate(input);
        validate(input);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateState.value, disabled]);

    return (
        <InputWrapper cls={`search-input-wrapper input-${validityCls}`}>
            <DatePicker
                time={time}
                name={name}
                isPickerActive={isPickerActive}
                cls='form'
            />

            <input
                pattern='^\d{2}\/\d{2}\/\d{2}$'
                ref={inputEl}
                className='input search-input'
                placeholder={placeholder}
                autoComplete='off'
                name={name}
                value={dateState.value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required={required}
            />
            <DatePickerIcon
                // onClickCheck={onClick}
                height={32}
                setActive={setPickerActive}
            />
            <Feedback
                formError={dateState.formError}
                error={dateState.error}
                wasFocused={dateState.wasFocused}
                cls='top'
            />
        </InputWrapper>
    );
}
