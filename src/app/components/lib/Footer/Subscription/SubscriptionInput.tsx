import React, { HTMLProps, useEffect, useRef } from 'react';
import InputWrapper from '../../Common/Form/InputWrapper';
import { ValidateInputT } from '../../../../types/typesForms';
import { useAppSelector, useAppDispatch } from '../../../../redux/reduxHooks';
import Feedback from '../../Common/Feedback/Feedback';
import SpinLoader from '../../Common/SpinLoader/SpinLoader';
import SuccessCheck from '../../Common/SuccessCheck/SuccessCheck';
import { setFetchStatus } from '../../../../redux/slices/subscribeSlice';

type Props = { validate: ValidateInputT } & HTMLProps<HTMLInputElement>;

export default function SubscriptionInput(props: Props) {
    const {
        validate, onChange, onBlur, onFocus,
    } = props;

    const dispatch = useAppDispatch();
    const inputEl = useRef<HTMLInputElement>(null);
    const { status, subscribe } = useAppSelector((state) => state.subscribe);
    const { value, error, wasFocused } = subscribe;

    useEffect(() => {
        if (!inputEl.current) return;
        const input = inputEl.current;

        validate(input);
    }, [value]);

    useEffect(() => {
        if (status === 'loaded') {
            setTimeout(() => dispatch(setFetchStatus('idle')), 2500);
        }
    }, [status, value, dispatch]);

    return (
        <InputWrapper cls='subscription-input-wrapper'>
            <input
                ref={inputEl}
                name='subscribe'
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                value={value}
                id='subscribe'
                className='input subscription-input'
                type='email'
                placeholder='e-mail'
                autoComplete='off'
            />
            {status === 'loading' ? <SpinLoader cls='subscribe-loader' /> : null}
            {status === 'loaded' ? <SuccessCheck /> : null}
            <Feedback error={error} wasFocused={wasFocused} />
        </InputWrapper>
    );
}
