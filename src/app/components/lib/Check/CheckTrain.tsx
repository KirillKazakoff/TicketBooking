import React from 'react';
import { useAppSelector } from '../../../redux/reduxHooks';
import { selectActiveTicket } from '../../../redux/slices/placesSlice';
import TicketCenter from '../Tickets/Ticket/TicketCenter';
import TicketLeft from '../Tickets/Ticket/TicketLeft';
import TicketRight from '../Tickets/Ticket/TicketRight';
import CheckChangeNavBtn from './CheckChangeNavBtn';

export default function CheckTrain() {
    const activeTicket = useAppSelector(selectActiveTicket);
    const { departure, arrival } = activeTicket.ticketRoute;
    const routes = { departure, arrival };

    return (
        <section className='confirmation-section shadowed'>
            <header className='passenger-header confirmation-passenger-header framed-passengers'>
                <span className='passenger-desc'>Поезд</span>
            </header>
            <li className='ticket confirmation-ticket'>
                <TicketLeft departure={routes.departure} />
                <TicketCenter routes={routes} />
                <TicketRight routes={routes} seatsInfoAux={activeTicket.seatsInfoAux}>
                    <CheckChangeNavBtn to='/tickets' desc='Изменить' />
                </TicketRight>
            </li>
        </section>
    );
}
