const redux = require('redux');
const thunkRedux = require('redux-thunk').default
const axios  = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware

const initialState ={
    loading: false,
    posts: [],
    error:''
}

const FETCH_POSTS = 'FETCH_POSTS'
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

const fetchPosts = () => {
    return{
        type: FETCH_POSTS
    }
}

const fetchPostsSuccess = posts => {
    return{
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    }
}

const fetchPostsFailure = error => {
    return{
        type: FETCH_POSTS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_POSTS:
            return{
                ...state,
                loading: true
            }
        case FETCH_POSTS_SUCCESS:
            return{
                loading: false,
                posts: action.payload
            }
        case FETCH_POSTS_FAILURE: 
            return{
                loading:false,
                error: action.payload
            }
        default: return state
    }
}

// Action creator 
const fetchAllPosts = () => {
    return (dispatch)=> {
        dispatch(fetchPosts)
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response=>{
            const posts = response.data.map(({id, title})=> ({id,title}))
            dispatch(fetchPostsSuccess(posts))
        }) .catch(error=>{
            dispatch(fetchPostsFailure(error.message))
        })
    }
}

const store =createStore (reducer, applyMiddleware(thunkRedux))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchAllPosts())