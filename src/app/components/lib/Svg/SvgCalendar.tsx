import React from 'react';
import SvgType from './svgType';
import Svg from './Svg';

export default function SvgCalendar({ height }: SvgType) {
    return (
        <Svg
            src='./svg/calendar.svg'
            height={height}
            alt='Calendar'
            className='date-picker-img'
        />
    );
}
