import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UserState} from "../state/user.reducer";
import {Store} from "@ngrx/store";
import {selectUser} from "../state/user.selector";
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
  private $user: Observable<any>;
  private $data: Observable<any>;

  constructor( private store: Store<{ user: UserState }>, private assetService: AssetService) {
    this.$user = this.store.select(selectUser);
    this.$data = this.assetService.getData();
  }

  ngOnInit(): void {
    const userDataSubscription: Subscription = this.$user.subscribe((user) => {
      console.log({user});
    });
    userDataSubscription.unsubscribe();
    const dataSubscription: Subscription = this.$data.subscribe((data) => {
      console.log({data});
    });
  }

  ngOnDestroy(): void {
  }
}
