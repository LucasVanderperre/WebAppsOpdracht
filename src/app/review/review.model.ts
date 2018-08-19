
export class Review {
    private _id: string;
    private _likes: number;
    private _dislikes: number;
    private _time: Date;
    private _review: string[];
    private _username: string;

    static fromJSON(json): Review {
        const res = new Review(json.review,json.likes, json.dislikes, json.time, json.username);
        res._id = json._id;
        return res;
    }

    constructor(review: string[],likes?: number, dislikes?: number, time?: Date, username?:string) {
        this._likes = likes;
        this._dislikes = dislikes;
        this._time = time;
        this._review = review;
        this._username = username;
    }

    get id(): string {
        return this._id;
    }
    get likes(): number {
        return this._likes;
    }
    set likes(likes: number) {
        this._likes = likes;
    }
    get dislikes(): number {
        return this._dislikes;
    }
    set dislikes(dislikes: number) {
        this._dislikes = dislikes;
    }
    get time(): Date {
        return this._time;
    }

    set time(time: Date) {
        this._time = time;
    }

    get review(): string[] {
        return this._review;
    }

    set review(review: string[]) {
        this._review = review;
    }

    get username(): string {
        return this._username;
    }

    set username(username: string) {
        this._username = username;
    }

    toJSON() {
        return {
            _id: this._id,
            likes: this._likes,
            dislikes: this._dislikes,
            time: this._time,
            review: this._review,
            username: this._username
        };
    }

}
