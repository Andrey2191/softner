import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, LoginData, RegistrationData, UserProfile } from './types';

const API_URL = process.env.REACT_APP_API_URL as string;

const initialState: AuthState = {
  id: null,
  name: null,
  email: null,
  language: null,
  timeZone: null,
  loading: false,
  error: null,
};

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
  try {
    const response = await axios.get<UserProfile>(`${API_URL}/getprofile`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
});

export const login = createAsyncThunk('auth/login', async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/signin`, loginData);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (registrationData: RegistrationData) => {
  const response = await axios.post(`${API_URL}/signup`, registrationData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.language = action.payload.language;
        state.timeZone = action.payload.time_zone;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.language = action.payload.language;
        state.timeZone = action.payload.timeZone;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      });
  },
});

export default authSlice.reducer;
