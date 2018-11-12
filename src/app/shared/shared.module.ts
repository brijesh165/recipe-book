import {NgModule} from '@angular/core';
import {DropdownDirectives} from './dropdown.directives';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    DropdownDirectives
  ],
  exports: [
    CommonModule,
    DropdownDirectives]
})
export class SharedModule {

}
