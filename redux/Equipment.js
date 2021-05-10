import * as ActionTypes from './ActionTypes';

export const Equipment = (state = { isLoading: true,
    errMess: null,
    equipment:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EQUIPMENT:
            return {...state, isLoading: false, errMess: null, equipment: action.payload};

        case ActionTypes.EQUIPMENT_LOADING:
            return {...state, isLoading: true, errMess: null, equipment: []}

        case ActionTypes.EQUIPMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.UPDATE_EQUIPMENT:
            // console.log('payloadddd' + action.payload)
            for (let i = 0; i < state.equipment.length; i++) {
                if (state.equipment[i]._id.toString() === action.payload._id.toString()) {
                    state.equipment[i] = action.payload;
                }
            }
            return {...state, isLoading: false, errMess: null};

        default:
            return state;
    }
};