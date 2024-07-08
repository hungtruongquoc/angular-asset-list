import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';
import {AssetState} from "./asset.reducer";

export const selectAssetState = createFeatureSelector<AssetState>('asset');

export const selectAssets = createSelector(
  selectAssetState,
  (state: AssetState) => state.data
);

export const selectLoading = createSelector(
  selectAssetState,
  (state: AssetState) => state.loading
);

export const selectTotalCount = createSelector(
  selectAssetState,
  (state: AssetState) => state.recordsTotal
);


