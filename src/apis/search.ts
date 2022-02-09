import { fetch } from '../utils/axios.ts';

export function getSearchResult(params) {
    return fetch('/v1', params, 'GET')
}
