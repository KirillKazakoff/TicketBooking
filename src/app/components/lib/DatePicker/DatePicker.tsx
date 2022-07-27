/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import DatePickerHeader from './DatePickerHeader/DatePickerHeader';
import { useAppDispatch, useAppSelector } from '../../../redux/reduxHooks';
import {
    setInput,
    setActiveDate,
    setDateTime,
} from '../../../redux/slices/searchDateSlice';
import UnavailableList from './DatePickerList/UnavailableList';
import AvailableList from './DatePickerList/AvailableList';
import { DatePickerProps } from '../../../types/typesSearch';

export default function DatePicker(props: DatePickerProps) {
    const {
        time, name, isPickerActive, cls,
    } = props;
    const dispatch = useAppDispatch();
    const activeDate = useAppSelector((state) => state.searchDate[name].activeDate);
    const pickerState = useAppSelector((state) => state.searchDate[name].pickerState);

    if (!isPickerActive) return null;

    const { year, month } = pickerState.date;

    const onClick = (day: string) => () => {
        const dayNumber = +day;
        const formatedDate = time.getDateString(dayNumber);

        dispatch(setInput({ name, value: formatedDate }));
        dispatch(setActiveDate({ name, date: { day, year, month } }));

        if (name === 'dateTo') {
            dispatch(
                setDateTime({
                    name: 'dateFrom',
                    dateTime: time.getDateString(dayNumber).toString(),
                }),
            );
        }
    };

    const {
        pastMonthDays, pastDays, availableDays, newMonthDays,
    } = pickerState.days;

    const pastMonthDaysList = <UnavailableList days={pastMonthDays} cls='non-month' />;
    const newMonthDaysList = <UnavailableList days={newMonthDays} cls='non-month' />;
    const pastDaysList = <UnavailableList days={pastDays} cls='past' />;
    const availableDaysList = (
        <AvailableList
            activeDate={activeDate}
            days={availableDays}
            onClick={onClick}
            dateCurrent={pickerState.date}
        />
    );

    return (
        <div className={`date-picker-container date-picker-container-${cls}`}>
            <div className='date-picker-arrow-decor' />
            <div className='date-picker'>
                <DatePickerHeader dateCurrent={pickerState.date} time={time} />
                <div className='date-picker-header-bottom' />
                <ul className='date-picker-content'>
                    {pastMonthDaysList}
                    {pastDaysList}
                    {availableDaysList}
                    {newMonthDaysList}
                </ul>
            </div>
        </div>
    );
}
