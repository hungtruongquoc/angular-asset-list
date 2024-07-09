import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {faCoffee, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NzButtonModule} from "ng-zorro-antd/button";
import {AssetState} from "../state/asset.reducer";
import {loadAssets, setLoading} from "../state/asset.actions";
import {selectAssets, selectLoading, selectTotalCount} from "../state/asset.selector";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {AssetStatusPipe} from "../pipes/asset-status.pipe";
import {SearchFormComponent} from "../forms/search-form/search-form.component";
import {CapitalizeWordPipe} from "../pipes/capitalize-word.pipe";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Inject({providedIn: 'root'})
@Component({
  selector: 'app-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  imports: [FontAwesomeModule, NzButtonModule, AsyncPipe, NgIf, NzProgressModule, NzSkeletonModule, NzLayoutModule,
    NzTableModule, NgForOf, NzTypographyModule, NzPaginationModule, AssetStatusPipe, SearchFormComponent,
    CapitalizeWordPipe]
})
export class IndexComponent implements OnInit, OnDestroy {
  faCoffee: IconDefinition = faCoffee;
  faSearch: IconDefinition = faSearch;
  assets$: Observable<any>;
  totalRecord$: Observable<any>;
  isLoading$: Observable<boolean | undefined>;
  currentPageIndex: number = 1;
  currentPageSize: number = 10;
  searchTextFromUrl: string | undefined = '';

  constructor(private store: Store<{ asset: AssetState }>,  private router: Router, private route: ActivatedRoute) {
    this.assets$ = this.store.select(selectAssets);
    this.isLoading$ = this.store.select(selectLoading);
    this.totalRecord$ = this.store.select(selectTotalCount);
  }

  private refreshData(): void {
    this.store.dispatch(loadAssets({data: {start: this.currentPageIndex, length: this.currentPageSize}}));
  }

  public ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      const searchText = params['searchText'];
      if (searchText !== undefined) {
        // Assuming SearchFormComponent has a method to set the searchText value
        // You might need to adjust this part based on your actual implementation
        this.searchTextFromUrl = searchText;
      }
      this.refreshData();
    });
  }

  public ngOnDestroy(): void {
  }

  public onPageIndexChange(pageIndex: number): void {
    this.refreshData();
  }

  public onPageSizeChange(pageSize: number): void {
    this.currentPageIndex = 1;
    this.refreshData();
  }

  public updateSearchText(searchText: string|undefined): void {
    let queryParams: any = { ...this.route.snapshot.queryParams };

    if (searchText) {
      queryParams.searchText = searchText;
    } else {
      const { searchText, ...rest } = queryParams;
      queryParams = rest;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }
}
