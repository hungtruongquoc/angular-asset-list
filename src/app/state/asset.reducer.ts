import {createReducer, on} from '@ngrx/store';
import {loadAssets, loadAssetsFailure, loadAssetsSuccess} from "./asset.actions";

export interface AssetState {
  data: any;
}

export const initialState: AssetState = {
  data: null
};

export const assetReducer = createReducer(
  initialState,
  on(loadAssets, (state, {data}) => ({...state, ...data})),
  on(loadAssetsSuccess, (state, {data}) => {
    debugger;
    return {
      ...state,
      ...data,
      loading: false,
      error: null
    }
  }),
  on(loadAssetsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),
);
