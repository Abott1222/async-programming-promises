import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {

    axios.get('/orders/1')
    //when promise succeeds
    .then( (data) => setText(JSON.stringify(data)));
}

export function getCatch() {
    axios.get('/orders/123')
    //when promise succeeds
    .then( (result) => {
        setText(JSON.stringify(data))
    })
    .catch( e => setText(JSON.stringify(e)));
}

export function chain() {
    axios.get('/orders/1')
    //when promise succeeds
    .then( ({data}) => {
        axios.get(`/addresses/${data.shippingAddress}`);
    })
    .then( ({data}) => setText(JSON.stringify(data.city)))
    .catch(e => setText(e));
}

export function chainCatch() {
    axios.get('/orders/1')
    //when promise succeeds
    .then( ({data}) => {
        return axios.get(`/addresses/${data.shippingAddress}`);
    })
    .then( ({data}) => setText(data.city))
    .catch(e => setText(e));
}

export function final() {
    showWaiting();
    axios.get('/orders/1')
    //when promise succeeds
    .then( ({data}) => {
        return axios.get(`/addresses/${data.shippingAddress}`);
    })
    .then( ({data}) => setText(data.city))
    .catch(e => setText(e));
}