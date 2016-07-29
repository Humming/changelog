import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { ChangeLog } from "./changelog";
import { Observable } from "rxjs/Observable";


export interface IBaseService {
    get(id: number): any;
    post(object: any): any;
    // getChangeLogs(): Promise<ChangeLog[]>;
    getChangeLogs(): Observable<ChangeLog[]>;
    // list(): ChangeLog[];
}

@Injectable()
export class ChangeLogService implements IBaseService {
    constructor(private http: Http) { }


    private apiUrl = "http://localhost:54004/api/changelogs";  // uRL to web API

    changelog: ChangeLog[] = [
        {
            id: 1,
            version: "4.0.9",
            message: "Mailgun email tracking set to false",
            username: "Eric",
            createdon: new Date("2016-07-29"),
            updatedon: new Date("2016-07-29")
        },
        {
            id: 2,
            version: "4.0.10",
            message: "Fixed error message when client was expecting json but got html due to the statuscodehandler",
            username: "Eric",
            createdon: new Date("2016-07-29"),
            updatedon: new Date("2016-07-29")
        }
    ];

    get(id: number): any {
        return this.changelog[id];
    }

    getChangeLogs(): Observable<ChangeLog[]> {
        return this.http.get(this.apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body:any = res.json();
        return body.data || { };
    }

    private handleError(error: any) {
        let errorMessage:any = (error.message)
            ? error.message : error.status
                ? `${error.status} - ${error.statusText}` : "Server error";

        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }

    post(object: any): any {
        return false;
    }
}

