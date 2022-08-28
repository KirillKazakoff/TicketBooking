import React from 'react';
import { nanoid } from 'nanoid';
import TicketTypeTip from './TicketTypeTip';
import { TicketTypeProps } from '../../../../types/typesTicket';
import { getCarriageName, getSeatName } from './ticketUtils';
import { getMinFromTypes } from '../getMinPrices';

export default function TicketType({ typeKey, typeInfo }: TicketTypeProps) {
    const typeName = getCarriageName(typeKey);
    const allAvailable = typeInfo.availableType.total;
    const minPrice = getMinFromTypes(typeInfo.minPriceType);

    let ticketTypeTips = null;
    if (typeKey === 'second' || typeKey === 'third') {
        ticketTypeTips = Object.keys(typeInfo.availableType).map((seatKey) => {
            const cost = typeInfo.minPriceType[`${seatKey}_price`];
            const amount = typeInfo.availableType[seatKey];
            const seatName = getSeatName(seatKey);

            if (!cost) return null;
            return (
                <TicketTypeTip
                    cost={cost} amount={amount}
                    key={nanoid()}
                >
                    {seatName}
                </TicketTypeTip>
            );
        });
    }
    if (typeInfo.availableType.total === 0) return null;
    return (
        <li className='ticket-type framed-ticket-right'>
            {ticketTypeTips ? (
                <ul className='ticket-type-tips framed-ticket-right'>
                    <div className='ticket-type-tips-arrow-decor' />
                    {ticketTypeTips}
                </ul>
            ) : null}

            <span className='ticket-type-desc'>{typeName}</span>
            <span className='ticket-amount-left'>{allAvailable}</span>
            <div className='cost main-cost'>
                <span className='cost-prefix'>от</span>
                <div className='cost-count-container main-cost-count-container'>
                    <span className='cost-count main-cost-count'>{minPrice}</span>
                    <span className='cost-money-symbol'>₽</span>
                </div>
            </div>
        </li>
    );
}
