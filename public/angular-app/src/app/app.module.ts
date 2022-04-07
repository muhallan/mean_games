import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    GamesComponent,
    GameComponent,
    StarsRatingComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'games',
        component: GamesComponent
      },
      {
        path: 'game/:gameId',
        component: GameComponent
      }, 
      {
        path: '**',
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
