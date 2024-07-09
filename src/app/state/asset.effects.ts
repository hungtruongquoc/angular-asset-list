import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AssetService } from '../services/asset.service';
import {loadAssets, loadAssetsSuccess, loadAssetsFailure, PageInfo} from './asset.actions';

@Injectable()
export class AssetEffects {
  loadAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssets),
      mergeMap(({data}) =>
        this.assetService.getData(data.start, data.length, data.searchText).pipe(
          map(data => loadAssetsSuccess({data: data.data})),
          catchError(error => of(loadAssetsFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private assetService: AssetService
  ) {}
}
