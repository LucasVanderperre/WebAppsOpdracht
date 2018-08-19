
export class Reservation {
  private _id: string;
  private _amount: number;
  private _time: Date;
  private _message: string[];

  static fromJSON(json): Reservation {
    const res = new Reservation(json.amount, json.time, json.message);
    res._id = json._id;
    return res;
  }

  constructor(amount: number, time?: Date, message?: string[]) {
    this._amount = amount;
    this._time = time;
    this._message = message || new Array<string>();
  }

  get id(): string {
    return this._id;
  }
  get amount(): number {
    return this._amount;
  }
  set amount(amount: number) {
    this._amount = amount;
  }

  get time(): Date {
    return this._time;
  }

  set time(time: Date) {
    this._time = time;
  }

  get message(): string[] {
    return this._message;
  }

  set message(message: string[]) {
    this._message = message;
  }



  toJSON() {
    return {
      _id: this._id,
      amount: this._amount,
      time: this._time,
      message: this._message
    };
  }

}
