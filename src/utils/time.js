export const convertDateToTime = (time) => {
    return time.toLocaleString('ru',{hour: 'numeric', minute: 'numeric', second: 'numeric'});
};