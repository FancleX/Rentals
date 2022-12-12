import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const prefixUrl = '/user';

export const signup = createAsyncThunk('user/signup',
    async (payload, { dispatch }) => {
        try {
            const { data } = await axios.post(`${prefixUrl}/signup`, payload);
            dispatch(setUser(data));
            dispatch(setIsAuth(true));
            localStorage.setItem('token', data.token);
            return ({ status: true, msg: data.name });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const signin = createAsyncThunk('user/signin',
    async (payload, { dispatch }) => {
        try {
            const { data } = await axios.post(`${prefixUrl}/signin`, payload);
            dispatch(setUser(data));
            dispatch(setIsAuth(true));
            localStorage.setItem('token', data.token);
            return ({ status: true, msg: data.name });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const signinWithToken = createAsyncThunk('user/signintoken',
    async (_, { dispatch }) => {
        try {
            const { data } = await axios.get(`${prefixUrl}/loggin`);
            dispatch(setUser(data));
            dispatch(setIsAuth(true));
            localStorage.setItem('token', data.token);
            return ({ status: true, msg: data.name });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const uploadSearchHistory = createAsyncThunk('user/uploadHistory',
    async (payload, { dispatch }) => {
        try {
            const { location } = payload;
            const { data: { searchHistory } } = await axios.put(`${prefixUrl}/update/searchhistory`, {
                history: location
            });
            dispatch(upldateSearchHistory(searchHistory));
        } catch (error) {
            console.log(error);
        }
    }
);




const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        token: '',
        id: '',
        avatar: '',
        email: '',
        name: '',
        phone: '',
        saves: [],
        searchHistory: []
    },
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action) => {
            for (const key in action.payload) {
                state[key] = action.payload[key];
            }
        },
        clearUser: (state, action) => {
            const defaultValue = {
                isAuth: false,
                token: '',
                id: '',
                avatar: '',
                email: '',
                name: '',
                phone: '',
                saves: [],
                searchHistory: []
            };
            localStorage.removeItem('token');
            state = defaultValue;
        },
        upldateSearchHistory: (state, action) => {
            state.searchHistory = action.payload;
        }
    }
});

export const {
    setIsAuth,
    setUser,
    clearUser,
    upldateSearchHistory
} = userSlice.actions;

export default userSlice.reducer;
