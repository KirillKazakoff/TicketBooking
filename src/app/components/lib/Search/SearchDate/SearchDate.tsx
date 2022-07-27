import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import SearchRowTitle from '../SearchRowTitle';
import SearchFormRow from '../SearchFormRow';
import SearchDateFrom from './SearchDateFrom';
import SearchDateTo from './SearchDateTo';

import {
    setInput,
    setDateTime,
    setError,
    setActive,
    setBlured,
} from '../../../../redux/slices/searchDateSlice';

import { useAppDispatch } from '../../../../redux/reduxHooks';
import { SearchSectionProps } from '../../../../types/typesSearch';
import useChange from '../../Common/Form/useChange';
import useSelect from '../../Common/Form/useSelect';
import useValidateInput from '../../Common/Form/useValidateInput';

export default function SearchDate({ cls = '' }: SearchSectionProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            setDateTime({ name: 'dateTo', dateTime: DateTime.now().toFormat('dd/LL/yy') }),
        );
        dispatch(
            setDateTime({
                name: 'dateFrom',
                dateTime: DateTime.now().toFormat('dd/LL/yy'),
            }),
        );
    }, [dispatch]);

    const onChange = useChange(setInput);
    const validate = useValidateInput(setError);
    const { onBlur, onFocus } = useSelect(setActive, setBlured);

    return (
        <SearchFormRow cls={cls}>
            <SearchRowTitle>Дата</SearchRowTitle>
            <SearchDateTo
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                validate={validate}
            />

            <span className='space25' />

            <SearchDateFrom
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                validate={validate}
            />
        </SearchFormRow>
    );
}
