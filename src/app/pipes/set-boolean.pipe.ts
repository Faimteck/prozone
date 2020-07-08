import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setBoolean'
})
export class SetBooleanPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value){
      return 'Yes';
    }
    return 'No';
  }

}
