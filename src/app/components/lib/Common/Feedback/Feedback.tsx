import React from 'react';
import './feedback.css';

type FeedbackProps = {
    error: string;
    wasFocused: boolean;
    formError?: string;
    isFormMsgHidden?: boolean;
    cls?: string;
};

export default function Feedback(props: FeedbackProps) {
    const {
        error, formError, wasFocused, isFormMsgHidden, cls,
    } = props;

    if (!error && !formError) return null;
    if (!wasFocused && isFormMsgHidden && !formError) return null;

    console.log(wasFocused, formError);
    return (
        <div className={`feedback feedback-${cls}`}>
            <div className={`feedback-arrow feedback-arrow-${cls}`} />
            <span className='feedback-content'>{formError || error}</span>
        </div>
    );
}

Feedback.defaultProps = {
    isFormMsgHidden: true,
    formError: '',
    cls: 'default',
};
