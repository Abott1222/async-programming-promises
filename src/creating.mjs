import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("timeout!");
        }, 1500);
    });

    wait.then(text => setText(text));
}

export function interval(){
    let ix = 0;
    const wait = new Promise((resolve, reject) => {
        setInterval(() => {
            resolve("interval!" + String(ix++));
        }, 1500);
    });

    wait.then(text => setText(text))
    .finally( () => appendText(`done ------ ${ix}`));
}

export function clearIntervalChain(){
    let ix = 0;
    let interval;
    const wait = new Promise((resolve, reject) => {
        interval = setInterval(() => {
            resolve("interval!" + String(ix++));
        }, 1500);
    });

    wait.then(text => setText(text))
    .finally( () => clearInterval(interval));
}

export function xhr(){
    let request = new Promise((reject,resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject("error bummer");
        xhr.send();
    });

    request.then((data) => setText(data));
    request.catch((e) => {
        setText(e);
    })
}

export function allPromises(){
    let categories = axios.get('/itemCategories');
    let statuses = axios.get('/orderStatuses')
    let userTypes = axios.get('/userTypes')
    Promise.all([categories, statuses, userTypes])
    .then(([cat,stat,typ]) => {
        appendText(JSON.stringify(cat.data));
        appendText(JSON.stringify(stat.data))
        appendText(JSON.stringify(typ.data))
    })
    .catch(e => setText(e))
}

export function allSettled(){
}

export function race(){
}