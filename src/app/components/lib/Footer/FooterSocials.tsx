/* eslint-disable react/no-array-index-key */
import React from 'react';
import SocialLink from './SocialLink';
import SvgYoutube from '../Svg/Socials/SvgYoutube';
import SvgLinkedIn from '../Svg/Socials/SvgLinkedIn';
import SvgGoogle from '../Svg/Socials/SvgGoogle';
import SvgFacebook from '../Svg/Socials/SvgFacebook';
import SvgTwitter from '../Svg/Socials/SvgTwitter';
import { useAppDispatch } from '../../../redux/reduxHooks';
import { setInfo } from '../../../redux/slices/infoSlice';

export default function FooterSocials() {
    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(
            setInfo({
                status: 'note',
                msg: {
                    title: 'Кнопки не прожимаются...',
                    desc: 'Не прожимаются, вот и все... \n Скоро и так все заблокируют... Зачем вам это все... \n Я ezhik 🦔...',
                },
            }),
        );
    };

    const icons = [
        <SvgYoutube height={28} />,
        <SvgLinkedIn height={28} />,
        <SvgGoogle height={28} />,
        <SvgFacebook height={28} />,
        <SvgTwitter height={28} />,
    ].map((icon, index) => (
        <SocialLink key={index} onClick={onClick}>
            {icon}
        </SocialLink>
    ));

    return (
        <div className='socials'>
            <h2 className='footer-subtitle'>Подписывайтесь на нас</h2>

            <ul className='socials-list'>
                {icons}
                {/* <SocialLink href='/#'>
                    <SvgYoutube height={28} />
                </SocialLink>
                <SocialLink href='/#'>
                    <SvgLinkedIn height={28} />
                </SocialLink>
                <SocialLink href='/#'>
                    <SvgGoogle height={28} />
                </SocialLink>
                <SocialLink href='/#'>
                    <SvgFacebook height={28} />
                </SocialLink>
                <SocialLink href='/#'>
                    <SvgTwitter height={28} />
                </SocialLink> */}
            </ul>
        </div>
    );
}
