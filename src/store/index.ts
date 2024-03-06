
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                // Instead of type the case directly, we should use constants to avoid typo. A typo mistake can already be seen in the MainApp component, where the action type is `REMOVE_TODOS` instead of `REMOVE_TODO`
                case 'ADD_TODO': {
                    // These directly mutate the state, which is not recommended in Redux. You should return a new state object. If you still want to mutate the state, you can use something like Immer
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        // Because we don't use the `t` parameter, we can replace it with underscore `_`
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        // This only returns the `todos` property, the rest of the state will be lost, should be `return {...state, todos: action.payload}` like the `REMOVE_TODO` case
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
