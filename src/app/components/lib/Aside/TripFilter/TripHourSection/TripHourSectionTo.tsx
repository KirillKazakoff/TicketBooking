import React from 'react';
import TripHourSection from './TripHourSection';
import HourSlider from './HourSlider';

export default function TripHourSectionTo() {
    const limits = { min: 0, max: 86400000 };

    return (
        <TripHourSection direction='to' desc='Туда'>
            <HourSlider
                dir='from'
                desc='Время отбытия'
                typeFrom='start_departure_hour_from'
                typeTo='end_departure_hour_from'
                limits={limits}
            />
            <HourSlider
                dir='to'
                desc='Время прибытия'
                typeFrom='start_departure_hour_to'
                typeTo='end_departure_hour_to'
                limits={limits}
            />
        </TripHourSection>
    );
}