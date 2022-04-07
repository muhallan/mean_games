import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})
export class StarsRatingComponent implements OnInit {

  _rating: number = 0;
  stars: number[] = [];
  constructor() { }

  @Input()
  set rating(value: number) {
    this._rating = value;
    this.stars = new Array<number>(this._rating);
  }

  ngOnInit(): void {
  }

}
