export class Sesion{
    _id?: number;
    aproxTotalDuration: number;
    actualTotalDuration: number;
    heartbeats: Array<any>;
    emotions: Array<any>;
    moans: Object;
    comments: string;
    exerciseToDo: string;
    date: Date;

    constructor(aproxTotalDuration: number, actualTotalDuration: number, heartbeats: Array<any>, emotions: Array<any>, moans: Object, comments: string, exerciseToDo: string, date: Date){
        this.aproxTotalDuration = aproxTotalDuration;
        this.actualTotalDuration = actualTotalDuration;
        this.heartbeats = heartbeats;
        this.emotions = emotions;
        this.moans = moans;
        this.comments = comments;
        this.exerciseToDo = exerciseToDo;
        this.date = date;
    }
}