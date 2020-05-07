export class Barrowedbook {
      public remainingDays: number;
      constructor(
          public isbn:string,
          public userName:string,
          public bookName:string,
          public returningDate:Date,
           ) {}
}
