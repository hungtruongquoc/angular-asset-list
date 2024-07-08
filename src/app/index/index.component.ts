import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {faCoffee, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NzButtonModule} from "ng-zorro-antd/button";
import {AssetState} from "../state/asset.reducer";
import {loadAssets, setLoading} from "../state/asset.actions";
import {selectAssets, selectLoading} from "../state/asset.selector";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";
import {AsyncPipe, NgIf} from "@angular/common";

@Inject({providedIn: 'root'})
@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  imports: [FontAwesomeModule, NzButtonModule, AsyncPipe, NgIf]
})
export class IndexComponent implements OnInit, OnDestroy {
  faCoffee: IconDefinition = faCoffee;
  faSearch: IconDefinition = faSearch;
  assets$: Observable<any>;
  isLoading$: Observable<boolean|undefined>;

  constructor(private store: Store<{ asset: AssetState }>) {
    this.assets$ = this.store.select(selectAssets);
    this.isLoading$ = this.store.select(selectLoading);
  }

  public ngOnInit(): void {
    this.store.dispatch(setLoading({value: true}));
    this.store.dispatch(loadAssets({data: {}}));
  }

  public ngOnDestroy(): void {
  }
}
