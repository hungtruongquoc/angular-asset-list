import {Component, Input, OnChanges, OnInit, output, SimpleChanges} from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/pro-duotone-svg-icons";
import {faCircleX, faSearch} from "@fortawesome/pro-solid-svg-icons";
import {debounceTime} from "rxjs";
import {NgIf} from "@angular/common";

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
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit, OnChanges {
  faClear: IconDefinition = faCircleX;
  faSearch: IconDefinition = faSearch;
  inputValue: string | undefined = '';
  searchForm: FormGroup<{ searchText: FormControl<string> }> = this.fb.group({
    searchText: ['']
  })
  onTextChange = output<string|undefined>()
  @Input() initialText: string | undefined = '';
  initialSetupDone: boolean = false;

  constructor(private fb: NonNullableFormBuilder) {
  }

  public resetForm() {
    this.searchForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialSetupDone && changes['initialText'] && this.searchForm) {
      this.searchForm.get('searchText')?.setValue(this.initialText ? this.initialText : '');
      this.inputValue = this.initialText; // Update inputValue to reflect in the UI
      this.initialSetupDone = true;
    }
  }

  ngOnInit(): void {
    this.searchForm.get('searchText')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.onTextChange.emit(value);
    });
  }
}
