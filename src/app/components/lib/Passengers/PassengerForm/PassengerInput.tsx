/* eslint-disable react/default-props-match-prop-types */
import React, { HTMLProps } from 'react';
import Feedback from '../../Common/Feedback/Feedback';
import InputWrapper from '../../Common/InputWrapper';
import {
    selectMsgHidden,
    setActive,
    setBlured,
    setInput,
} from '../../../../redux/slices/passengersSlice';
import { InputState } from '../../../../redux/slices/utils/reduxInputUtils';
import useChange from '../../../../form/useChange';
import useSelect from '../../../../form/useSelect';
import { RefT } from '../../../../types/typesReact';
import { getValidityCls } from '../../../../form/getValidityCls';
import { useAppSelector } from '../../../../redux/reduxHooks';

type Props = {
    name: string;
    id: string;
    state: InputState;
    parrentRef: RefT<HTMLInputElement>;
    wrapperCls?: string;
} & HTMLProps<HTMLInputElement>;

export default function PassengerInput(props: Props) {
    const {
        state,
        name,
        id,
        required,
        pattern,
        parrentRef,
        className,
        placeholder,
        wrapperCls,
    } = props;

    const {
        value, formError, error, wasFocused,
    } = state;

    const onChange = useChange(setInput, id);
    const { onFocus, onBlur } = useSelect(setActive, setBlured, id);
    const validityCls = getValidityCls(state);
    const isFormMsgHidden = useAppSelector(selectMsgHidden(id));

    return (
        <InputWrapper cls={`${wrapperCls} passenger-input-wrapper input-${validityCls}`}>
            <input
                placeholder={placeholder}
                autoComplete='off'
                pattern={pattern}
                required={required}
                value={value}
                ref={parrentRef}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                id={name}
                className={`input ${className}`}
                name={name}
            />
            <Feedback
                error={error}
                formError={formError}
                wasFocused={wasFocused}
                isFormMsgHidden={isFormMsgHidden}
            />
        </InputWrapper>
    );
}

PassengerInput.defaultProps = {
    className: '',
    wrapperCls: '',
};
