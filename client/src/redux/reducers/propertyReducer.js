import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const prefixUrl = '/property';

export const searchPreview = createAsyncThunk('property/searchPreview',
    async (_, { dispatch }) => {
        try {
            const data = await axios.get(`${prefixUrl}/fetch`);
            dispatch(setSearchList(data));
        } catch (error) {
            console.log(error)
        }
    }
);

export const searchSpecific = createAsyncThunk('property/searchSpecific',
    async (payload, { dispatch }) => {
        try {
            const { lng, lat, boundary } = payload;
            const data = await axios.post(`${prefixUrl}/search`, {
                location: {
                    lng: Number(lng),
                    lat: Number(lat)
                },
                range: Number(boundary)
            });
            dispatch(setSearchList(data));
        } catch (error) {
            console.log(error)
        }
    }
);

export const searchDetail = createAsyncThunk('property/searchDetail', 
    async (payload, { dispatch }) => {
        try {
            const { id } = payload;
            const data = await axios.get(`${prefixUrl}/getdetail/${id}`);
            dispatch(setSearchDetail(data));
            return data.img;
        } catch (error) {
            console.log(error)
        }
    }
);

const propertySlice = createSlice({
    name: 'property',
    initialState: {
        searchList: [],
        searchDetail: {}
    },
    reducers: {
        setSearchList: (state, action) => {
            state.searchList = action.payload.data;
        },
        setSearchDetail: (state, action) => {
            state.searchDetail = action.payload;
        },
        
    }
});

export const {
    setSearchList,
    setSearchDetail
} = propertySlice.actions;

export default propertySlice.reducer;
