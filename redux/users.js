import * as ActionTypes from './ActionTypes';

export const Users = (state = { isLoading: true,
    errMess: null,
    users:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USERS:
            return {...state, isLoading: false, errMess: null, users: action.payload};

        case ActionTypes.USERS_LOADING:
            return {...state, isLoading: true, errMess: null, users: []}

        case ActionTypes.USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.DELETE_USER:
            return {...state, isLoading: false, errMess: null, users: state.users.filter(user => user._id !== action.payload)};

        case ActionTypes.POST_USER:
            var user = action.payload.user;
            return {...state, users: state.users.concat(user) };
        
        default:
            return state;
    }
};