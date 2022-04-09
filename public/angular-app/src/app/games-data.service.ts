import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/';

import { Game } from './_models/game';


@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private baseUrl: string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  public getGames(): Observable<Game[]> {
    const url: string = this.baseUrl + "games";
    return this.http.get<Game[]>(url);
  }

  public getGame(gameId: string): Observable<Game> {
    const url: string = this.baseUrl + "games/" + gameId;
    return this.http.get<Game>(url);
  }

  public deleteGame(gameId: string): Observable<any> {
    const url: string = this.baseUrl + "games/" + gameId;
    return this.http.delete(url);
  }

  public createGame(game: Object): Observable<Game> {
    const url: string = this.baseUrl + "games";
    return this.http.post<Game>(url, game, this.getHeaders());
  }

  private getHeaders() {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return options;
  }

}
