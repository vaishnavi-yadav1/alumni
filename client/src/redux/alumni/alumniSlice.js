import {createSlice} from '@reduxjs/toolkit';

const initialState={
    currentAlumni:null,
    error: null,
    loading:false,
}


const alumniSlice=createSlice({
    name:'alumni',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentAlumni=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        }
    }
});

export const {signInFailure,signInStart,signInSuccess}=alumniSlice.actions;
export default alumniSlice.reducer;
