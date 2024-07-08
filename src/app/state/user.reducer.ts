import { createReducer, on } from '@ngrx/store';
import { loadUser } from './user.actions';

export interface UserState {
  user: any;
}

export const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state, { user }) => ({ ...state, ...user }))
);
