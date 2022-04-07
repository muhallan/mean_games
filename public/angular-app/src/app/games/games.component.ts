import { Component, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';
import { Game } from '../_models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games!: Game[];

  constructor(private gameService: GamesDataService) { 
  }

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames() {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  confirmDelete(gameId: string) {
    if(confirm("Do you want to delete this game?")) {
      this.gameService.deleteGame(gameId).subscribe(result => {
        this.fetchGames();
      });
    }
  }

}
