
// Three core concepts in Redux
// Store --> Holds the state of your application
// Action --> Describes what happened and the changes in the state of the application
// Reducer --> Ties the store and action together by carrying out the state transition depending on the action 

// Three core Principles
// * The state of the whole application is stored in an object tree within a single store
// * The only way to change the state is to emit an action, which is an object describing what happened we must not directly update the state object
// * To specify how the state tree is transformed by actions, we use pure reducers

const redux = require('redux')
const createStore = redux.createStore

// Creating an Action
const BUY_CAKE = 'BUY_CAKE'

// {
//     --> we can have any number of properties in an action
//     type: BUY_CAKE,
//     info: 'First redux action'
// }

function buyCake (){
    return {
        // we can have any number of properties in an action
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

// Creating a reducer 
// (previousState,action) => newState

const initialState ={
    numberOfCakes: 10
}

// Creating a reducer 
const reducer  = (state= initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numberOfCakes: state.numberOfCakes - 1
        }
        // here we are not mutation the object but we are returning a new object
        default: return state
    }
}

//Creating a store 

const store = createStore(reducer)
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(()=> console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
unsubscribe()