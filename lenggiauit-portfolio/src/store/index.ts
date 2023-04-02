import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { AccountService, UserService } from '../services/account';
import { AdminService } from '../services/admin';
import { BlogService } from '../services/blog';
import { ChatService } from '../services/chat'; 
import { FileService } from '../services/fileService'; 
import { HomeService } from '../services/home';
import { NotificationService } from '../services/notification';
import { RefService } from '../services/refService'; 
import userReducer from './userSlice';
import { PortfolioService } from '../services/portfolio';
export const store = configureStore({
    reducer: {
        currentUser: userReducer,
        // Add the generated reducer as a specific top-level slice 
        [AccountService.reducerPath]: AccountService.reducer,
        [UserService.reducerPath]: UserService.reducer,  
        [FileService.reducerPath]: FileService.reducer,
        [ChatService.reducerPath]: ChatService.reducer,
        [RefService.reducerPath]: RefService.reducer, 
        [BlogService.reducerPath]: BlogService.reducer, 
        [AdminService.reducerPath]: AdminService.reducer, 
        [HomeService.reducerPath]: HomeService.reducer,  
        [NotificationService.reducerPath]: NotificationService.reducer,
        [PortfolioService.reducerPath]: PortfolioService.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false })
            .concat(AccountService.middleware)
            .concat(UserService.middleware)  
            .concat(FileService.middleware)
            .concat(ChatService.middleware)
            .concat(RefService.middleware) 
            .concat(BlogService.middleware)
            .concat(AdminService.middleware)
            .concat(HomeService.middleware) 
            .concat(NotificationService.middleware)
            .concat(PortfolioService.middleware);
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
setupListeners(store.dispatch)
