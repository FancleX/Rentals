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
            localStorage.removeItem('token');
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
            dispatch(updateSearchHistory(searchHistory));
        } catch (error) {
            console.log(error);
        }
    }
);

export const addSaves = createAsyncThunk('user/addsaves',
    async (payload, { dispatch }) => {
        try {
            const { propertyId } = payload;
            const data = await axios.put(`${prefixUrl}/update/saves/add`, {
                propertyId
            });
            console.log(data)
            return ({ status: true, msg: data.message });
        } catch (error) {
            console.log(error)
            return ({ status: false, msg: error.message });
        }
    }
);

export const getSaves = createAsyncThunk('user/getsavesids', 
    async (_, { dispatch }) => {
        try {
            const { data: { saves } } = await axios.get(`${prefixUrl}/getsaveids`);
            dispatch(updateSaveList(saves));
            console.log(saves)
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteSaves = createAsyncThunk('user/deletesaves', 
    async (payload, { dispatch }) => {
        try {
            const { propertyId } = payload;
            const data = await axios.put(`${prefixUrl}/update/saves/delete`, {
                propertyId
            });
            console.log(data)
            return ({ status: true, msg: data.message });
        } catch (error) {
            console.log(error)
            return ({ status: false, msg: error.message });
        }
    }
);

export const getSavesEntity = createAsyncThunk('user/getsavesentity', 
    async (_, { dispatch }) => {
        try {
            const { data: { saves } } = await axios.get(`${prefixUrl}/getsaves`);
            dispatch(setUserSaves(saves));
            console.log(saves)
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
        userSaves: [],
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
                userSaves: [],
                searchHistory: []
            };
            localStorage.removeItem('token');
            for (const key in action.payload) {
                state[key] = defaultValue[key];
            }
        },
        updateSearchHistory: (state, action) => {
            state.searchHistory = action.payload;
        },
        updateSaveList: (state, action) => {
            state.saves = action.payload;
        },
        setUserSaves: (state, action) => {
            state.userSaves = action.payload;
        }
    }
});

export const {
    setIsAuth,
    setUser,
    clearUser,
    updateSearchHistory,
    updateSaveList,
    setUserSaves
} = userSlice.actions;

export default userSlice.reducer;
