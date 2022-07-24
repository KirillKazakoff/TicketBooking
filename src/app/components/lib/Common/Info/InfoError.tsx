import React from 'react';
import SvgExclamation from '../../Svg/Actions/SvgExclamation';
import Info from './Info';
import { InfoMsgT } from './messagesInfo';

type Props = { msg: InfoMsgT; cls: string };

export default function InfoError({ msg, cls }: Props) {
    return (
        <Info
            cls='error' icon={<SvgExclamation />}
            msg={msg} containerCls={cls}
        />
    );
}
