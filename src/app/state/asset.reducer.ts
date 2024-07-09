import {createReducer, on} from '@ngrx/store';
import {loadAssets, loadAssetsFailure, loadAssetsSuccess, setLoading} from "./asset.actions";

export interface AssetState {
  data: any;
  loading?: boolean;
  error?: any;
  recordsTotal?: number;
}

export const initialState: AssetState = {
  data: null,
  loading: false,
  error: null,
  recordsTotal: 0
};

export const assetReducer = createReducer(
  initialState,
  on(loadAssets, (state, {data}) => ({...state, loading: true})),
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
