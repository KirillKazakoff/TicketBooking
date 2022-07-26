import React from 'react';
import { useNavigate } from 'react-router-dom';
import TicketLeft from './Ticket/TicketLeft';
import TicketCenter from './Ticket/TicketCenter';
import { TicketProps } from '../../../types/typesTicket';
import TicketRight from './Ticket/TicketRight';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { refreshPlaces, setActiveTicket } from '../../../redux/slices/placesSlice';
import TicketToPlaces from './Ticket/TicketToPlaces';
import { refreshPasPlaces } from '../../../redux/slices/pasPlacesSlice';

export default function Ticket({ ticket }: TicketProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { departure, arrival } = ticket.ticketRoute;
    const routes = { departure, arrival };

    const onClick = () => {
        dispatch(refreshPlaces());
        dispatch(refreshPasPlaces());
        dispatch(setActiveTicket(ticket));
        setTimeout(() => navigate('/places'), 1);
    };

    return (
        <li className='ticket shadowed'>
            <TicketLeft departure={routes.departure} />
            <TicketCenter routes={routes} />
            <TicketRight routes={routes} seatsInfoAux={ticket.seatsInfoAux}>
                <TicketToPlaces onClick={onClick} />
            </TicketRight>
        </li>
    );
}
