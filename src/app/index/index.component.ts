import {Component, Inject, OnInit} from '@angular/core';
import {UserState} from "../state/user.reducer";
import {select, Store} from "@ngrx/store";
import {selectUser} from "../state/user.selector";

@Inject({providedIn: 'root'})
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  providers: []
})
export class IndexComponent implements OnInit{
  constructor( private store: Store<{ user: UserState }>,) {
  }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      console.log({user});
    });
  }

}
