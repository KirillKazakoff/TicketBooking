import React from 'react';
import SvgMail from '../Svg/Contacts/SvgMail';
import SvgPhone from '../Svg/Contacts/SvgPhone';
import SvgSkype from '../Svg/Contacts/SvgSkype';
import SvgLocation from '../Svg/SvgLocation';
import FooterContact from './FooterContact';

export default function FooterContacts() {
    return (
        <div className='contacts' id='contacts'>
            <h2 className='footer-subtitle contacts-title'>Свяжитесь с нами</h2>
            <ul className='contacts-list'>
                <FooterContact
                    // href='tel:8 (914) 856 47 43'
                    // icon={<SvgPhone height={30} />}
                    href='https://t.me/Teahohotka'
                    icon={(
                        <img
                            src='./svg/socials/plane.svg'
                            className='ic-tg'
                            alt='telegram'
                            width='30px'
                        />
                    )}
                    desc='телеграм teahohotkи'
                />
                <FooterContact
                    href='mailto: kirillkazakovwork@gmail.com'
                    icon={<SvgMail height={25} />}
                    desc='kirillkazakovwork@gmail.com'
                />
                <FooterContact
                    href='live:kekazavr228'
                    icon={<SvgSkype height={30} />}
                    desc='Мой скайп - мой кайф'
                />
                <FooterContact
                    href='http://maps.google.com/?q=Руанда, Танзания'
                    icon={<SvgLocation height={30} />}
                    desc='gugl mep ruanda'
                />
            </ul>
        </div>
    );
}
