import {Component, Inject, Injectable, makeStateKey, OnInit, Optional, PLATFORM_ID, TransferState} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SERVER_DATA} from "./tokens/server-data";
import {HttpClient} from "@angular/common/http";
import {isPlatformBrowser} from "@angular/common";
import {Store} from "@ngrx/store";
import {UserState} from "./state/user.reducer";
import {loadUser} from "./state/user.actions";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzIconDirective} from "ng-zorro-antd/icon";
import { NzMenuModule } from 'ng-zorro-antd/menu';

const BEETRACK_USER = makeStateKey<string>('user-info');

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, NzIconDirective, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  isCollapsed: boolean = false;
  constructor(@Optional() @Inject(SERVER_DATA) private serverData: any, private httpClient: HttpClient,
              private transferState: TransferState, private store: Store<{ user: UserState }>,
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (serverData) {
      console.log({serverData});
      this.httpClient.post("https://combuilding.beetrack.vn/api/v2/login", {username: this.serverData["beetrackUsername"], password: this.serverData["beetrackPassword"]})
        .subscribe((data: any) => {
          this.transferState.set(BEETRACK_USER, data["data"]);
        })
    } else {
      console.log('Server Data is not available');
    }
  }

  public ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.transferState.get(BEETRACK_USER, null);
      this.store.dispatch(loadUser({user}))
    }
  }

  title = 'Angular Asset List';
}
