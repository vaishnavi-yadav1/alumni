import { createSlice } from "@reduxjs/toolkit";

const  initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:'alumni',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error = null;
        },
        signInSuccess:(state,action)=>{
            state.currentUSer=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        }
    }
}); 

export const {signInFailure,signInStart,signInSuccess} =userSlice.actions;
export default userSlice.reducer;