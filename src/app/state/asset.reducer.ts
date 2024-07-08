import {createReducer, on} from '@ngrx/store';
import {loadAssets, loadAssetsFailure, loadAssetsSuccess, setLoading} from "./asset.actions";

export interface AssetState {
  data: any;
  loading?: boolean;
  error?: any;
}

export const initialState: AssetState = {
  data: null,
  loading: false,
  error: null
};

export const assetReducer = createReducer(
  initialState,
  on(loadAssets, (state, {data}) => ({...state, ...data})),
  on(setLoading, (state, {value}) => ({...state, loading: value})),
  on(loadAssetsSuccess, (state, {data}) => ({
      ...state,
      ...data,
      loading: false,
      error: null
    })),
  on(loadAssetsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),
);
