/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

import { nanoid } from 'nanoid';
import {
    TicketsResponseT,
    TicketInfoT,
    TrainInfoFullT,
} from '../../types/models/modelTickets';
import { setFetchStatus } from '../../redux/slices/searchFormSlice';
import { setTickets } from '../../redux/slices/ticketsSlice';
import { AppThunk } from '../../redux/store';
import { getRoutesUrl } from '../getUrl';
import { request } from '../thunkUtils';
import { fetchSeats } from './fetchSeats';
import getMinPrices from '../../components/lib/Tickets/getMinPrices';
import { SeatsTypesInfoT } from '../../types/models/modelSeats';
import { sumAvailable } from '../../components/lib/Tickets/getTrainInfo';
import { TrainRoutesT } from '../../types/typesTicket';

type FetchRoutesT = (settings: any) => AppThunk;

export const fetchRoutes: FetchRoutesT = (settings) => async (dispatch) => {
    dispatch(setFetchStatus('loading'));

    const url = getRoutesUrl(settings);
    const reqObj = { url };
    const resData: TicketsResponseT = await dispatch(request(reqObj, setFetchStatus));
    if (!resData) {
        console.log('uhhh');
        return false;
    }

    const ticketsInfo = [];
    for await (const item of resData.items) {
        const available: SeatsTypesInfoT = {};
        const { departure, arrival } = item;
        const routes: TrainRoutesT = { departure, arrival };

        const routeKeys = Object.keys(routes);

        const trainsInfo = [];
        for await (const key of routeKeys) {
            const id = routes[key]._id;
            const trainInfo = await dispatch(fetchSeats({ id }));
            if (!trainInfo) return false;

            const trainInfoFull: TrainInfoFullT = { routeName: key, trainInfo };
            trainsInfo.push(trainInfoFull);

            const { typesInfo } = trainInfo;
            Object.keys(typesInfo).forEach((type) => {
                sumAvailable(available, type, typesInfo[type]);
            });
        }

        const minPrices = getMinPrices(routes);
        const ticketId = nanoid();
        const ticketInfo: TicketInfoT = {
            id: ticketId,
            minPrices,
            available,
            trainsInfo,
            ticketRoute: item,
        };
        ticketsInfo.push(ticketInfo);
    }

    const tickets = {
        total_count: resData.total_count,
        tickets: ticketsInfo,
    };
    console.log(tickets);
    console.log(resData);

    dispatch(setTickets(resData));
    dispatch(setFetchStatus('loaded'));
    return true;
};