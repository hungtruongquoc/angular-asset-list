import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  standalone: true,
  name: 'asset_status',
})
export class AssetStatusPipe implements PipeTransform {
  transform(value: number): string {
    const statusList: Record<number, string> = {
      0: 'lost',
      1: 'active',
      2: 'not in use',
      3: 'waiting for repair',
      4: 'not fixable',
      5: 'in repair',
      6: 'in maintenance',
      7: 'decommissioned',
      8: 'waiting for disposal',
      120: 'waiting for approval',
      20: 'active',
      21: 'inactive',
      22: 'discontinued',
      23: 'partial decommissioned',
      24: 'awaiting disposal',
      25: 'waiting for repair',
      119: 'waiting for approval',
    }
    return statusList[value] || 'unknown';
  }
}
