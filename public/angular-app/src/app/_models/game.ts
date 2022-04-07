export class Game {

    #_id!: string;
    #title!: string;
    #price!: number;
    #minAge!: number;
    #year!: number;
    #rate!: number;
    #minPlayers!: number;
    #maxPlayers!: number;
  
    constructor(id: string, title: string, price: number) {
      this.#_id = id;
      this.#title = title;
      this.#price = price;
    }
    get _id(): string {
      return this.#_id;
    }
    set _id(value: string) {
      this.#_id = value;
    }
    get title(): string {
      return this.#title;
    }
    set title(value: string) {
      this.#title = value;
    }
    get price(): number {
      return this.#price;
    }
    set price(value: number) {
      this.#price = value;
    }
  
    get minAge(): number {
      return this.#minAge;
    }
    set minAge(value: number) {
      this.#minAge = value;
    }
  
    get year(): number {
      return this.#year;
    }
    set year(value: number) {
      this.#year = value;
    }
  
    get rate(): number {
      return this.#rate;
    }
    set rate(value: number) {
      this.#rate = value;
    }
  
    get minPlayers(): number {
      return this.#minPlayers;
    }
    set minPlayers(value: number) {
      this.#minPlayers = value;
    }
  
    get maxPlayers(): number {
      return this.#maxPlayers;
    }
    set maxPlayers(value: number) {
      this.#maxPlayers = value;
    }
  }
  