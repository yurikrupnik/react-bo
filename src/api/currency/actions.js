import request from 'axios';
import { convertUrl, currenciesUrl } from './config';

const types = {
    READ_CURRENCY_VALUE_SUCCESS: 'READ_CURRENCY_VALUE_SUCCESS',
    READ_CURRENCY_VALUE_PENDING: 'READ_CURRENCY_VALUE_PENDING',
    READ_CURRENCY_VALUE_FAIL: 'READ_CURRENCY_VALUE_FAIL',

    READ_CURRENCIES_PENDING: 'READ_CURRENCIES_PENDING',
    READ_CURRENCIES_SUCCESS: 'READ_CURRENCIES_SUCCESS',
    READ_CURRENCIES_FAIL: 'READ_CURRENCIES_FAIL'
};

const readConvertPending = payload => ({ type: types.READ_CURRENCY_VALUE_PENDING, payload });
const readConvertSuccess = payload => ({ type: types.READ_CURRENCY_VALUE_SUCCESS, payload });
const readConvert = params => (dispatch) => {
    dispatch(readConvertPending(params));
    return request.get(`${'/api'}${convertUrl}`, { params })
        .then(res => dispatch(readConvertSuccess(res.data)));
};

const readCurrenciesPending = payload => ({ type: types.READ_CURRENCIES_PENDING, payload });
const readCurrenciesSuccess = payload => ({ type: types.READ_CURRENCIES_SUCCESS, payload });
const readCurrencies = () => (dispatch) => {
    dispatch(readCurrenciesPending());
    return request.get(`${'/api'}${currenciesUrl}`)
        .then(res => dispatch(readCurrenciesSuccess(res.data)));
};


export {
    types,
    readConvert,
    readConvertPending,
    readConvertSuccess,
    readCurrencies,
    readCurrenciesPending,
    readCurrenciesSuccess
};
