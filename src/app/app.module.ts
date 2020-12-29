import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AztecDiamondModule } from './aztec-diamond/aztec-diamond.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AztecDiamondModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
