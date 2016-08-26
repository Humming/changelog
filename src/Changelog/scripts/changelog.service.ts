import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
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


    private apiUrl = "http://development.changelog.no:54004/api/ChangeLogs";  // uRL to web API

    changelog: ChangeLog[] = [
        {
            id: 1,
            version: "4.0.9",
            message: "Mailgun email tracking set to false",
            username: "Eric",
            createdOn: new Date("2016-07-29"),
            updatedOn: new Date("2016-07-29")
        },
        {
            id: 2,
            version: "4.0.10",
            message: "Fixed error message when client was expecting json but got html due to the statuscodehandler",
            username: "Eric",
            createdOn: new Date("2016-07-29"),
            updatedOn: new Date("2016-07-29")
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

    postChangeLog(changelog: ChangeLog): Observable<ChangeLog> {
        changelog.createdOn = new Date;
        changelog.updatedOn = changelog.createdOn;
        
        let body = JSON.stringify(changelog);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl, body, options).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body:any = res.json();
        return body || {};
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

