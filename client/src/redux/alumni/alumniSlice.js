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
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentAlumni=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteUserStart:(state)=>{
            state.loading=true;
        },
        deleteUserSuccess:(state)=>{
             state.currentAlumni=null;
             state.loading=false;
             state.error=null;
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signOutUserStart:(state)=>{
            state.loading=true;
        },
        signOutUserSuccess:(state)=>{
             state.currentAlumni=null;
             state.loading=false;
             state.error=null;
        },
        signOutUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
    },
});

export const {  signOutUserFailure,signOutUserStart,signOutUserSuccess ,deleteUserFailure,deleteUserStart,deleteUserSuccess,  updateUserFailure,updateUserStart,updateUserSuccess,signInFailure,signInStart,signInSuccess}=alumniSlice.actions;
export default alumniSlice.reducer;
