import React from 'react';
import { numberToArray } from '../../Common/utils/numberToArray';

type Props = { active: number; length: number };

export default function ReviewSlider({ active, length }: Props) {
    const sliders = numberToArray(length).map((index) => {
        let cls = 'slider-item';
        cls = index + 1 === active ? `${cls} ${cls}-active` : cls;

        return <li key={index} className={cls} />;
    });

    return <ul className='slider'>{sliders}</ul>;
}
