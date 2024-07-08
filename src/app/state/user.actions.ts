import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load User',
  props<{ user: any }>()
);
