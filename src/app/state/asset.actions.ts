import { createAction, props } from '@ngrx/store';

export const loadAsset = createAction(
  '[Asset] Load Asset',
  props<{ data: any }>()
);
