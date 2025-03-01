// src/redux/workoutSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Workout } from "../types";



const API_URL = "http://localhost:4000/workout";

// Fetch workouts
export const fetchWorkouts = createAsyncThunk("workouts/fetch", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a workout
export const addWorkout = createAsyncThunk(
  "workouts/add",
  async (newWorkout: { name: string; duration: number; day: string; startTime: string; }) => {
    const response = await axios.post(API_URL, newWorkout);
    return response.data;
  }
);

// Update a workout
export const updateWorkout = createAsyncThunk(
  "workouts/update",
  async ({ id, updatedWorkout }: { id: number; updatedWorkout: { name: string; duration: number; day: string; startTime: string; } }) => {
    const response = await axios.patch(`${API_URL}/${id}`, updatedWorkout);
    return response.data;
  }
);

// Delete a workout
export const deleteWorkout = createAsyncThunk("workouts/delete", async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workouts: [] as { id: number; name: string; duration: number; day: string; startTime: string; }[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
      })
      .addCase(addWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        const index = state.workouts.findIndex((w) => w.id === action.payload.id);
        if (index !== -1) state.workouts[index] = action.payload;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter((w) => w.id !== action.payload);
      });
  },
});

export default workoutSlice.reducer;
