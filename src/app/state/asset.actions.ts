import {createAction, props} from '@ngrx/store';

export interface PageInfo {
  start: number;
  length: number;
  searchText?:string;
}

export const loadAssets = createAction(
  '[Asset] Load Asset',
  props<{ data: PageInfo }>()
);

export const loadAssetsSuccess = createAction(
  '[Asset] Load Assets Success',
  props<{ data: any }>()
);

export const loadAssetsFailure = createAction(
  '[Asset] Load Assets Failure',
  props<{ error: any }>()
);

export const setLoading = createAction('[Asset] Set Loading', props<{ value: boolean }>());
