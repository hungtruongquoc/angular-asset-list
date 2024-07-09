import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  standalone: true,
  name: 'capitalized_word',
})
export class CapitalizeWordPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    return value.replace(/\b\w/g, char => char.toUpperCase());
  }
}
