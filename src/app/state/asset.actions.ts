import { createAction, props } from '@ngrx/store';

export const loadAssets = createAction(
  '[Asset] Load Asset',
  props<{ data: any }>()
);

export const loadAssetsSuccess = createAction(
  '[Asset] Load Assets Success',
  props<{ data: any }>()
);

export const loadAssetsFailure = createAction(
  '[Asset] Load Assets Failure',
  props<{ error: any }>()
);
