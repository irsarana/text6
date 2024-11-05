import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component'; // Make sure this import path is correct

@NgModule({
  declarations: [
    AppComponent,
    GameComponent // Ensure GameComponent is listed here
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }