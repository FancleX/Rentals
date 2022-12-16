import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosConfig';

const prefixUrl = '/user';

export const signup = createAsyncThunk('user/signup',
    async (payload, { dispatch }) => {
        try {
            const { data } = await axiosInstance.post(`${prefixUrl}/signup`, payload);
            localStorage.setItem('token', data.token);
            dispatch(setIsAuth(true));
            dispatch(setUser(data));
            return ({ status: true, msg: data.name });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const signin = createAsyncThunk('user/signin',
    async (payload, { dispatch }) => {
        try {
            const { data } = await axiosInstance.post(`${prefixUrl}/signin`, payload);
            localStorage.setItem('token', data.token);
            dispatch(setIsAuth(true));
            dispatch(setUser(data));
            return ({ status: true, msg: data.name });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const signinWithToken = createAsyncThunk('user/signintoken',
    async (_, { dispatch }) => {
        try {
            const { data } = await axiosInstance.get(`${prefixUrl}/loggin`);
            localStorage.setItem('token', data.token);
            dispatch(setIsAuth(true));
            dispatch(setUser(data));
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
            const { data: { searchHistory } } = await axiosInstance.put(`${prefixUrl}/update/searchhistory`, {
                history: location
            });
            dispatch(updateSearchHistory(searchHistory));
        } catch (error) {
            console.log(error);
        }
    }
);

export const addSaves = createAsyncThunk('user/addsaves',
    async (payload) => {
        try {
            const { propertyId } = payload;
            const data = await axiosInstance.put(`${prefixUrl}/update/saves/add`, {
                propertyId
            });
            return ({ status: true, msg: data.message });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const getSaves = createAsyncThunk('user/getsavesids',
    async (_, { dispatch }) => {
        try {
            const { data: { saves } } = await axiosInstance.get(`${prefixUrl}/getsaveids`);
            dispatch(updateSaveList(saves));
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteSaves = createAsyncThunk('user/deletesaves',
    async (payload) => {
        try {
            const { propertyId } = payload;
            const data = await axiosInstance.put(`${prefixUrl}/update/saves/delete`, {
                propertyId
            });
            return ({ status: true, msg: data.message });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const getSavesEntity = createAsyncThunk('user/getsavesentity',
    async (_, { dispatch }) => {
        try {
            const { data: { saves } } = await axiosInstance.get(`${prefixUrl}/getsaves`);
            dispatch(setUserSaves(saves));
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateUserAvatar = createAsyncThunk('user/updateavatar', 
    async (payload, { dispatch }) => {
        try {
            const { avatar } = payload;
            const data = await axiosInstance.put(`${prefixUrl}/update/avatar`, { avatar });
            dispatch(updateInfo({ type: 'avatar', content: data.data.avatar }));
            return ({ status: true, msg: 'Update Successfully' });
        } catch (error) {
            return ({ status: false, msg: 'Update failed' });
        }
    }
);

export const updateUserName = createAsyncThunk('user/updatename',
    async (payload, { dispatch }) => {
        try {
            const { name } = payload;
            const data = await axiosInstance.put(`${prefixUrl}/update/name`, { name });
            dispatch(updateInfo({ type: 'name', content: data.data.name }));
            return ({ status: true, msg: 'Update Successfully' });
        } catch (error) {
            return ({ status: false, msg: 'Update failed' });
        }
    }
);

export const updateUserPhone = createAsyncThunk('user/updatephone',
    async (payload, { dispatch }) => {
        try {
            const { phone } = payload;
            const data = await axiosInstance.put(`${prefixUrl}/update/phone`, { phone });
            dispatch(updateInfo({ type: 'phone', content: data.data.phone }));
            return ({ status: true, msg: 'Update Successfully' });
        } catch (error) {
            return ({ status: false, msg: 'Update failed' });
        }
    }
);

export const updateUserPassword = createAsyncThunk('user/updatepassword', 
    async (payload) => {
        try {
            const { oldPassword, newPassword } = payload;
            const data = await axiosInstance.put(`${prefixUrl}/update/password`, {
                oldPassword,
                newPassword
            });

            return ({ status: true, msg: data.message });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const deactivateAccount = createAsyncThunk('user/deactive', 
    async (_, { dispatch }) => {
        try {
            const data = await axiosInstance.put(`${prefixUrl}/delete/account`);
            
            dispatch(clearUser());
            return ({ status: true, msg: data.message });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

export const sendNotification = createAsyncThunk('user/notificaton', 
    async (payload) => {
        try {
            const { content, receiverId } = payload;

            const data = await axiosInstance.post('notification/send', {
                content,
                receiverId
            });

            return ({ status: true, msg: data.message });
        } catch (error) {
            return ({ status: false, msg: error.message });
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
        },
        updateInfo: (state, action) => {
            const { type, content } = action.payload;
            state[type] = content;
        }
    }
});

export const {
    setIsAuth,
    setUser,
    clearUser,
    updateSearchHistory,
    updateSaveList,
    setUserSaves,
    updateInfo
} = userSlice.actions;

export default userSlice.reducer;
