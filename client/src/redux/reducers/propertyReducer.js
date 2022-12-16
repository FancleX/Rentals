import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const prefixUrl = '/property';

export const searchPreview = createAsyncThunk('property/searchPreview',
    async (_, { dispatch }) => {
        try {
            const data = await axios.get(`${prefixUrl}/fetch`);
            dispatch(setSearchList(data));
            dispatch(setBackupList(data));
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
            dispatch(setBackupList(data));
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

export const sortByPriceRange = createAsyncThunk('property/sortbypricerange',
    async (payload, { getState, dispatch }) => {
        const { low, high } = payload;
        const { property: { backupList } } = getState();

        const result = [];
        for (let i = 0; i < backupList.length; i++) {
            let item = backupList[i];
            let { price } = item.entity;
            if (low <= price && price <= high) {
                result.push(item);
            }
        }

        dispatch(setSearchList({ data: result }));
    }
);


export const sortByBedsBaths = createAsyncThunk('property/sortbybb',
    async (payload, { getState, dispatch }) => {
        const { numberOfBedrooms, numberOfBathrooms } = payload;
        const { property: { backupList } } = getState();

        const result = [];
        for (let i = 0; i < backupList.length; i++) {
            let item = backupList[i];
            let { beds, baths } = item.entity;
            if (beds >= numberOfBedrooms && baths >= numberOfBathrooms) {
                result.push(item);
            }
        }

        dispatch(setSearchList({ data: result }));
    }
);

export const sortByHouseType = createAsyncThunk('property/sortbyhousetype',
    async (payload, { getState, dispatch }) => {
        const { property: { backupList } } = getState();

        const result = [];
        for (let i = 0; i < backupList.length; i++) {
            let item = backupList[i];
            let { type } = item.entity;

            for (const types in payload) {
                const key = types, value = payload[key];
                if (type === types && value) {
                    result.push(item);
                }
            }
        }

        dispatch(setSearchList({ data: result }));
    }
);

export const sortByPrice = createAsyncThunk('property/sortbyprice',
    async (payload, { getState, dispatch }) => {
        const { isAcending } = payload;
        const { property: { backupList } } = getState();

        const result = [...backupList];
        if (isAcending) {
            result.sort((item1, item2) => item1.entity.price - item2.entity.price);
        } else {
            result.sort((item1, item2) => item2.entity.price - item1.entity.price);
        }

        dispatch(setSearchList({ data: result }));
    }
);

export const sortByDatePost = createAsyncThunk('property/sortbydatepost',
    async (_, { getState, dispatch }) => {
        const { property: { backupList } } = getState();

        const result = [...backupList];
        result.sort((item1, item2) => {
            const date1 = dayjs(item1.meta.postDate);
            const date2 = dayjs(item2.meta.postDate);
            return date1.diff(date2);
        });

        dispatch(setSearchList({ data: result }));
    }
);

export const createPost = createAsyncThunk('property/create',
    async (payload, { getState }) => {
        try {
            const { img, video, location, entity, policies, utilites, description } = payload;
            const { user: { id } } = getState();

            const data = await axios.post(`${prefixUrl}/property/create`, {
                img,
                video,
                location,
                entity,
                policies,
                utilites,
                contact: { id },
                source: {
                    inNetwork: true
                },
                description
            });

            return ({ status: true, msg: data.message });
        } catch (error) {
            return ({ status: false, msg: error.message });
        }
    }
);

const propertySlice = createSlice({
    name: 'property',
    initialState: {
        searchList: [],
        backupList: [],
        searchDetail: {}
    },
    reducers: {
        setSearchList: (state, action) => {
            state.searchList = action.payload.data;
        },
        setSearchDetail: (state, action) => {
            state.searchDetail = action.payload;
        },
        setBackupList: (state, action) => {
            state.backupList = action.payload.data;
        }
    }
});

export const {
    setSearchList,
    setSearchDetail,
    setBackupList
} = propertySlice.actions;

export default propertySlice.reducer;
