import React from 'react';
import { TicketLeftProps } from '../../../../types/typesTicket';
import SvgTrain from '../../Svg/SvgTrain';

export default function TicketLeft({ departure }: TicketLeftProps) {
    const { train, from, to } = departure;

    const trainName = train.name.includes('undefined') ? 'Брусника-123' : train.name;

    return (
        <aside className='ticket-aside-left'>
            <div className='train-wrapper train-wrapper-lg'>
                <SvgTrain />
            </div>
            <div className='train-number'>{trainName}</div>
            <ul className='train-stations'>
                <li className='train-station train-station-next'>
                    <span className='cap-first train-station-desc'>{from.city.name}</span>
                    <img src='./svg/arrows/arrow-station.svg' alt='arrow' />
                </li>
                <li className='train-station train-station-next'>
                    <span className='cap-first train-station-desc'>{to.city.name}</span>
                </li>
            </ul>
        </aside>
    );
}
