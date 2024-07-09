import { Component } from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";
import {faCircleX, faSearch} from "@fortawesome/pro-solid-svg-icons";

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzRowDirective,
    FormsModule,
    FontAwesomeModule,
    NzInputGroupComponent,
    ReactiveFormsModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  faClear: IconDefinition = faCircleX;
  faSearch: IconDefinition = faSearch;
  inputValue: string = '';
  searchForm: FormGroup<{searchText: FormControl<string>}> = this.fb.group({
    searchText: ['']
  })

  constructor(private fb: NonNullableFormBuilder) {}

  public resetForm() {
    this.searchForm.reset();
  }
}
