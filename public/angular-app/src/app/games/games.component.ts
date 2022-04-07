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
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  confirmDelete(game: Game) {
    if(confirm("Do you want to delete this game?")) {
      this.gameService.deleteGame(game._id).subscribe(result => {
        this.games = this.games.filter(notDeleted => notDeleted._id !== game._id);
      });
    }
  }

}
