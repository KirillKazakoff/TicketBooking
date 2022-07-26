import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { setFormError } from '../../../redux/slices/searchDateSlice';
import { searchMessages } from './messages';
import { DateStateT } from '../../../types/typesSlices';

type UseValidateCompareT = (dateTo: DateStateT, dateFrom: DateStateT) => string;

const useValidateCompare: UseValidateCompareT = (dateTo, dateFrom) => {
    const dispatch = useAppDispatch();
    const [stateError, setStateError] = useState('');

    const setCompareError = (formError: string) => {
        if (dateTo.formError || dateFrom.formError) return;

        dispatch(setFormError({ name: 'dateTo', formError }));
        dispatch(setFormError({ name: 'dateFrom', formError }));
        setStateError(formError);
    };

    useEffect(() => {
        const dateTimeTo = DateTime.fromFormat(dateTo.value, 'dd/LL/yy');
        const dateTimeFrom = DateTime.fromFormat(dateFrom.value, 'dd/LL/yy');

        let formError = '';
        if (dateTimeTo.toMillis() > dateTimeFrom.toMillis()) {
            formError = searchMessages.dateMismatch;
        }

        setCompareError(formError);
    });

    return stateError;
};

export default useValidateCompare;
