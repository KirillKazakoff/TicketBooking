import { InputState } from '../../../../redux/slices/utils/reduxInputUtils';
import { WayStateT } from '../../../../types/typesSlices';

export const getValidityCls = (inputState: InputState) => {
    const { error, formError } = inputState;
    let validityCls = 'valid';

    if (error) validityCls = 'invalid';

    if (formError) {
        validityCls = 'invalid';
    }
    return validityCls;
};

export const getWayValidityCls = (wayState: WayStateT) => {
    let validityCls = getValidityCls(wayState);
    if (wayState.status === 'loading') validityCls = 'invalid';

    return validityCls;
};
