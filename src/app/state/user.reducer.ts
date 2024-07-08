import { createReducer, on } from '@ngrx/store';
import { loadUser } from './user.actions';

export interface UserState {
  user: any;
  token: string;
}

export const initialState: UserState = {
  user: null,
  token: ''
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state, { user }) => ({ ...state, ...user }))
);
