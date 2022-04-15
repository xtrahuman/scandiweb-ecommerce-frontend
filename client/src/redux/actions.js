export const ADD = 'ADD/TEST'
export const DECREASE = 'SUB/TEST'

export const increment = () => {
    return {
        type: ADD
    };
}

export const decrement = () => {
    return {
        type: DECREASE
    };
};

