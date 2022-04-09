import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  addGameForm!: FormGroup;

  constructor(private gamesService: GamesDataService, private _router: Router) { 
    // this.addGameForm = formBuilder.group({
    //   title: '',
    //   price: '',
    //   minAge: '',
    //   minPlayers: '',
    //   maxPlayers: '',
    //   year: '',
    //   rate: ''
    // });
    
  }

  ngOnInit(): void {

    this.addGameForm = new FormGroup({
      title: new FormControl("", Validators.required),
      price: new FormControl("", [
        Validators.pattern("^[0-9]*$")
      ]),
      minAge: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(6),
        Validators.max(99)
      ]),
      minPlayers: new FormControl("", [
        Validators.required, 
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(11)
      ]),
      maxPlayers: new FormControl("", [
        Validators.required, 
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(11)
      ]),
      year: new FormControl("", Validators.pattern("^[0-9]*$")),
      rate: new FormControl("", [
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(5)
      ])
    });

  }

  get title() { return this.addGameForm.get('title'); }
  get price() { return this.addGameForm.get('price'); }
  get minAge() { return this.addGameForm.get('minAge'); }
  get minPlayers() { return this.addGameForm.get('minPlayers'); }
  get maxPlayers() { return this.addGameForm.get('maxPlayers'); }
  get year() { return this.addGameForm.get('year'); }
  get rate() { return this.addGameForm.get('rate'); }

  addGame(addGameForm: FormGroup): void {
    console.log("form submitted");
    console.log(this.addGameForm.value);
    console.log(this.title!.value);

    if (this.addGameForm.valid) {
      console.log('form submitted');
      this.gamesService.createGame(this.addGameForm.value).subscribe((game) => {
        console.log("result returned");
        this._router.navigate(['games']);
        console.log(game);
      });
    } else {
      this.validateAllFormFields(this.addGameForm);
    }

  }

  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {  
      const control = form.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty({ onlySelf: true });
    });
  }

  isFieldValid(field: AbstractControl | null) {
    return field && field.invalid && (field.dirty || field.touched);
  }
}
