const redux = require('redux')
const { combineReducers } = require("redux")
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger();
const applyMiddleWear = redux.applyMiddleware


const createStore = redux.createStore

const initialCakeState ={
    numberOfCake: 10
}

const initialIceCreamState ={
    numberOfIceCream: 20
}

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake(){
    return{
        type:BUY_CAKE
    }
}

function buyIceCream(){
    return{
        type:BUY_ICECREAM
    }
}

const cakeReducer = (state = initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numberOfCake : initialCakeState.numberOfCake - 1
        }
        default: return initialCakeState
    }
   
}

const iceCreamReducer = (state = initialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numberOfIcecream : initialIceCreamState.numberOfIceCream - 1
        }
        default: return initialIceCreamState
    }
   
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer,applyMiddleWear(logger))
console.log ('Initial State', store.getState())
// const unsubscribe = store.subscribe(()=>{console.log('Updated State', store.getState())})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())