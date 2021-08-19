import { Dispatch } from 'redux'
import { authAPI } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Login/auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}


const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<string | null>) => { state.error = action.payload },
        setAppStatusAC: (state, action: PayloadAction<RequestStatusType>) => { state.status = action.payload },
        setAppInitializedAC: (state, action: PayloadAction<boolean>) => { state.isInitialized = action.payload },
    },
})

export const appReducer = slice.reducer
export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {

        }

        dispatch(setAppInitializedAC(true));
    })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

