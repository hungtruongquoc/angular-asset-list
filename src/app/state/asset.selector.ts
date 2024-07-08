import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import {AssetState} from "./asset.reducer";

export const selectAssetState = createFeatureSelector<AssetState>('asset');

export const selectAssets = createSelector(
  selectAssetState,
  (state: AssetState) => {
    debugger;
    return state.data
  }
);
