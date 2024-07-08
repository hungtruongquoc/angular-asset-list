import {afterNextRender, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UserState} from "../state/user.reducer";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NzButtonModule} from "ng-zorro-antd/button";
import {AssetService} from "../services/asset.service";

@Inject({providedIn: 'root'})
@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  imports: [FontAwesomeModule, NzButtonModule]
})
export class IndexComponent implements OnInit, OnDestroy{
  faCoffee = faCoffee;
  faSearch = faSearch;
  private $data: Observable<any>;

  constructor( private store: Store<{ user: UserState }>, private assetService: AssetService) {
    this.$data = this.assetService.getData();

    afterNextRender(() => {
      const dataSubscription: Subscription = this.$data.subscribe(this.updateAssetData);
    })
  }

  private updateAssetData(data: any) {
    console.log({data});
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
  }
}
