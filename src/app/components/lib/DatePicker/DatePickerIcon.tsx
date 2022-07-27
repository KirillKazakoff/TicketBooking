import React, { useEffect } from 'react';
import SvgCalendar from '../Svg/SvgCalendar';
import { SetPickerActiveT } from '../../../types/typesSearch';

type Props = {
    height: number;
    setActive: SetPickerActiveT;
};

export default function DatePickerIcon({ height, setActive }: Props) {
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
