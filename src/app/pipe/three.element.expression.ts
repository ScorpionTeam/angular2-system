import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'threeElementExpression'})
export class ThreeElementExpression implements PipeTransform {
  /**
   * 自定义三元运算符  管道
   * @param value
   * @param expectValue
   * @returns {string}
   */
  transform(value: boolean, expectValue: string): string {
    let params: Array<string> = expectValue.split(";");
    let result = value == true ? params[0] : params[1];
    return result;
  }
}