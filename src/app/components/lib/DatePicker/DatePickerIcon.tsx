import React, { useEffect } from 'react';
import SvgCalendar from '../Svg/SvgCalendar';
import { SetPickerActiveT } from '../../../types/typesSearch';

type Props = {
    onClickCheck?: () => void | null;
    height: number;
    setActive: SetPickerActiveT;
};

export default function DatePickerIcon({ onClickCheck, height, setActive }: Props) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const { className } = target;

            if (className === 'date-picker-img') return;
            if (className.includes('date-picker')) return;
            setActive(false);
        };

        document.body.addEventListener('click', listener);
        return () => document.body.removeEventListener('click', listener);
    }, [setActive]);

    const onClick = () => {
        if (onClickCheck) onClickCheck();
        setActive((prev) => !prev);
    };

    return (
        <button
            type='button' className='date-picker-icon'
            onClick={onClick}
        >
            <SvgCalendar height={height} />
        </button>
    );
}

DatePickerIcon.defaultProps = {
    onClickCheck: null,
};
