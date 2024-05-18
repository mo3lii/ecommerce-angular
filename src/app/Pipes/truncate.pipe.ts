import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(text: any, maxLenght: number): string {
    if (text.length <= maxLenght) {
      return text;
    }
    return text.substring(0, maxLenght) + '...';
  }
}
