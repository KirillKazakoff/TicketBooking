type Params = {
    [key: string]: string | number;
};

function getUrl(params: Params, query: string) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach((param) => {
        const [key, value] = param;
        if (value || typeof value === 'number') {
            searchParams.append(key, value.toString());
        }
    });

    let url = query;
    if (searchParams) url += `?${searchParams.toString()}`;
    return url;
}

type GetCitiesParams = { name: string };
export function getCitiesUrl(params: GetCitiesParams) {
    const url = getUrl(params, 'routes/cities');
    return url;
}

type GetRouteParams = any;
export function getRoutesUrl(params: GetRouteParams) {
    const url = getUrl(params, 'routes');
    return url;
}

type GetSeatsParams = any;
export function getSeatsUrl(params: GetSeatsParams) {
    const url = getUrl(params, `routes/${params.id}/seats`);
    return url;
}

export function getSubscribeUrl(params: any) {
    const url = getUrl(params, 'subscribe');
    return url;
}
