import { createReducer, on } from '@ngrx/store';
import {loadAsset} from "./asset.actions";

export interface AssetState {
  data: any;
}

export const initialState: AssetState = {
  data: null
};

export const userReducer = createReducer(
  initialState,
  on(loadAsset, (state, { data }) => ({ ...state, ...data }))
);
