import React, { useRef, useEffect } from 'react';
import { SearchWayInputProps } from '../../../../types/typesSearch';
import InputWrapper from '../../Common/Form/InputWrapper';
import { getWayValidityCls } from './getValidityCls';
import SearchWayFeedback from './SearchWayFeedback';
import SearchWayTips from './SearchWayTips';
import validateCity from './validateCity';

export default function SearchWayInput(props: SearchWayInputProps) {
    const {
        onFocus,
        onBlur,
        onChange,
        wayState,
        children,
        placeholder,
        name,
        validate,
        checkCityMatch,
    } = props;

    const inputEl = useRef<HTMLInputElement>(null);
    const { status } = wayState;
    const validityCls = getWayValidityCls(wayState);
    const aborter = new AbortController();

    useEffect(() => {
        if (!inputEl.current) return;

        const input = inputEl.current;
        const cityCheck = wayState.cities[0]?.name;

        checkCityMatch(input, wayState.cities, aborter);
        validateCity(input, cityCheck, status);
        validate(input);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wayState.value, status]);

    return (
        <InputWrapper cls={`search-input-wrapper input-${validityCls}`}>
            <SearchWayTips
                cities={wayState.cities}
                isActive={wayState.isActive}
                inputRef={inputEl}
            />
            <input
                ref={inputEl}
                autoComplete='off'
                // pattern='[а-я]*[-]?[а-я]*[а-я]$'
                className='input search-input'
                placeholder={placeholder}
                name={name}
                value={wayState.value}
                onChange={onChange(aborter)}
                onFocus={onFocus}
                onBlur={onBlur}
                required
            />
            <SearchWayFeedback wayState={wayState} />
            {wayState.isActive ? null : children}
        </InputWrapper>
    );
}
