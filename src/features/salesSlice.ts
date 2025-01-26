import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface SalesState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: SalesState = {
    data: [],
    status: 'idle',
};

// Fetch data using a stubbed-out API call (mocked as per the requirement)
export const fetchSalesData = createAsyncThunk('sales/fetchSalesData', async () => {
    const response = await fetch('/mock-data/sales-data.json');
    if (!response.ok) {
        throw new Error('Failed to fetch sales data');
    }
    const data = await response.json();
    return data;
});

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSalesData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSalesData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSalesData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default salesSlice.reducer;
