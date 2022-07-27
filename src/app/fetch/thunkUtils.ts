import { setPageStatus } from '../redux/slices/loaderSlice';
import { RequestType } from '../types/typesRequest';

const baseUrl = 'https://netology-trainbooking.netoservices.ru';

export function timeoutMock(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), timeout);
    });
}

export const request: RequestType = (reqObj, setStatus) => async (dispatch) => {
    // await timeoutMock(500);
    try {
        const res = await fetch(`${baseUrl}/${reqObj.url}`, reqObj.settings);
        if (!res.ok) throw new Error(res.statusText);

        const resData = await res.json();
        if (resData.error) throw new Error(resData.error);
        return resData;
    } catch (e) {
        if (e.name !== 'AbortError') {
            dispatch(setPageStatus('failed'));
        }

        console.log(e);
        dispatch(setStatus('failed'));
        return false;
    }
};
