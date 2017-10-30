import { ADD_TIMER, REMOVE_TIMER, START_NEW_TIMER, END_NEW_TIMER } from '../constants/actions';


const initialState = {
    items: JSON.parse(localStorage.getItem('timers')).filter((item) => {
        item.timeStart = new Date(item.timeStart);
        item.timeEnd = new Date(item.timeEnd);
        item.timeSpend = new Date(item.timeSpend);
        return true;
    }) || [],
    timeStart: JSON.parse(localStorage.getItem('newTimer')) || 0
};

export default function timers(state = initialState, action) {
    let newTimersList;
    switch (action.type) {
        case ADD_TIMER:
            newTimersList = [...state.items,{id: state.items.length, ...action.payload}];
            localStorage.setItem('timers',JSON.stringify(newTimersList));
            return {...state,...{items: newTimersList}};
        case REMOVE_TIMER:
            newTimersList = [...state.items.slice(0,action.id),...state.items.slice(action.id+1).filter((item) => item.id--)];
            localStorage.setItem('timers',JSON.stringify(newTimersList));
            return {...state,...{items: newTimersList}};
        case START_NEW_TIMER:
            localStorage.setItem('newTimer',JSON.stringify(action.time));
            return {...state,timeStart: action.time};
        case END_NEW_TIMER:
            localStorage.removeItem('newTimer');
            return {...state,timeStart: 0};
        default:
            return state;
    }
}