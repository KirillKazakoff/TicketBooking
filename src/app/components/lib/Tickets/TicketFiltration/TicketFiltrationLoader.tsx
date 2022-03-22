import React from 'react';
import TicketsPaginationLoader from '../TicketsPagination/TicketsPaginationLoader';
import SpinLoader from '../../Common/SpinLoader';

export default function TicketFiltrationLoader() {
    return (
        <TicketsPaginationLoader>
            <div className='filtration-loader'>
                <div className='filtration-loader-desc'>идет поиск билетов:</div>
                <SpinLoader cls='loader-found' />
            </div>
        </TicketsPaginationLoader>
    );
}