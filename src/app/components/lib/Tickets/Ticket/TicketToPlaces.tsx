import React from 'react';

type Props = { onClick: () => void };

export default function TicketToPlaces({ onClick }: Props) {
    return (
        <button
            type='button' className='btn btn-choose-places'
            onClick={onClick}
        >
            Выбрать места
        </button>
    );
}
