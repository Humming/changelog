import {Component} from "angular2/core"
import {MyModel} from "./model"

@Component({
    selector: `my-app`,
    template: `
        <h1>{{title}} hello</h1>
        <h2>Mr {{hero.name}} is the hero of the day!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name">
        </div>
        <h3>ChangeLogs</h3>
        <div>
            <table class="table table-striped">
                <thead>
                    <th>Id</th>
                    <th>version</th>
                    <th>message</th>
                    <th>username</th>
                </thead>
                <tbody>
                    <tr *ngFor="#changelog of changelogs">
                        <td>{{changelog.id}}</td><td>{{changelog.version}}</td><td>{{changelog.message}}</td><td>{{changelog.username}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  `
})
export class AppComponent {
    
    model = new MyModel();
    getCompiler() {
        return this.model.compiler;
    }
    hero: Hero = {
        name: "(?°?°??? ???",
        id: 1
    };
    settings = new SiteSettings();
    service = new ChangeLogService();
    public changelogs = this.service.list();
    title = this.settings.title;
}

export class Hero {
    name: string;
    id: number;
}

export class SiteSettings {
    title: string;
    constructor() {
        this.title = "On Kestrel";
    }
}

export interface IBaseService {
    get(id:number): any;
    post(object: any): any;
    //list(): Promise<ChangeLog[]>;
    list(): ChangeLog[];
}

export class ChangeLogService implements IBaseService {

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

    list(): ChangeLog[] {
        return this.changelog;
    }

    post(object: any): any {
        return false;
    }
}

export class ChangeLog {
    id:number;
    version: string;
    message: string;
    username: string;
    createdon: Date;
    updatedon: Date;
}