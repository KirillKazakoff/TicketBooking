import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { setInfo } from '../../../redux/slices/infoSlice';
import { DirTProp } from '../../../types/typesPlaces';
import { messagesInfo } from '../Common/Info/messagesInfo';

export default function PasPlaceAddBtn({ dir }: DirTProp) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const msg = messagesInfo.placesAdd;

    const onClick = () => {
        navigate('/places');
        dispatch(setInfo({ msg, status: 'note' }));
    };

    return (
        <div className='pas-places-add-passenger'>
            <img
                src={`./svg/arrows/arrow-subtle-rect-${dir}.svg`}
                alt='arrow-subtle'
                className='pas-places-add-icon'
            />

            <button
                className='btn btn-pas-places-add-passenger'
                type='button'
                onClick={onClick}
            >
                Изменить пассажиров
            </button>
        </div>
    );
}
