import { useAppDispatch } from '../../../../redux/reduxHooks';
import { setFormError } from '../../../../redux/slices/searchDateSlice';
import { searchMessages } from '../messages';

export type OnClickCheckT = (disabled: boolean, name: string) => () => void;

const useCheckDisabled = () => {
    const dispatch = useAppDispatch();
    let timer: any;

    const onClickCheck: OnClickCheckT = (disabled, name) => () => {
        if (timer) clearTimeout(timer);
        if (!disabled) return;

        dispatch(setFormError({ name, formError: searchMessages.noDateTo }));
        timer = setTimeout(() => {
            dispatch(setFormError({ name, formError: '' }));
        }, 1000);
    };

    return { onClickCheck };
};

export default useCheckDisabled;
