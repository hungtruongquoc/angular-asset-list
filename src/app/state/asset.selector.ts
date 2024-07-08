import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import {AssetState} from "./asset.reducer";

export const selectAssetState = createFeatureSelector<AssetState>('user');

export const selectAssets = createSelector(
  selectAssetState,
  (state: AssetState) => state.data
);
