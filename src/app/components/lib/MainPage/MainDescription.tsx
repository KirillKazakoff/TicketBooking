import React from 'react';
import SvgOfice from '../Svg/Skills/SvgOfice';
import SvgOrder from '../Svg/Skills/SvgOrder';
import SvgNet from '../Svg/Skills/SvgNet';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { setInfo } from '../../../redux/slices/infoSlice';

export default function MainDescription() {
    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(
            setInfo({
                status: 'note',
                msg: {
                    title: 'Ну и что вы узнать-то хотите? Ммм? Не слышу...',
                    desc: 'Кнопка здесь чисто по фану... Да это вообще дизайнерская кнопка! \n Я кролик 🐇...',
                },
            }),
        );
    };
    return (
        <section className='description framed' id='description'>
            <header className='description-header'>
                <h2 className='section-title ddescription-title'>Как это работает</h2>
                <button
                    className='btn btn-main btn-know-more'
                    type='button'
                    onClick={onClick}
                >
                    Узнать больше
                </button>
            </header>
            <ul className='skills'>
                <li className='skill'>
                    <SvgOrder />
                    <div className='skill-desc'>Удобный заказ на сайте</div>
                </li>
                <li className='skill'>
                    <SvgOfice />
                    <div className='skill-desc'>Нет необходимости ехать в офис</div>
                </li>
                <li className='skill'>
                    <SvgNet />
                    <div className='skill-desc'>Огромный выбор направлений</div>
                </li>
            </ul>
        </section>
    );
}
