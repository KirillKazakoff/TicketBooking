import { useAppDispatch } from '../../../../redux/reduxHooks';
import { setFormError } from '../../../../redux/slices/searchDateSlice';
import { searchMessages } from '../messages';

export type OnClickCheckT = (disabled: boolean, name: string) => () => void;

const useCheckDisabled = () => {
    const dispatch = useAppDispatch();

    const onClickCheck: OnClickCheckT = (disabled, name) => () => {
        if (!disabled) return;

        dispatch(setFormError({ name, formError: searchMessages.noDateTo }));
        setTimeout(() => {
            // dispatch(setFormError({ name, formError: '' }));
        }, 3000);
    };

    return { onClickCheck };
};

export default useCheckDisabled;
