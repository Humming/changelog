import {Component, OnInit} from "@angular/core";
import "./rxjs-operators";
import { ChangeLog } from "./changelog";
import {ChangeLogService} from "./changelog.service";
import {MyModel} from "./model";

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
        <br/>
        <br/>
        <br/>
        <h3>Add change log<h3/>
        <form>
            <div class="form-group"> 
                <label>version: </label>
                <input class="form-control" [ngModel]="changelog.version" placeholder="1.0.0">
            </div>
            <div class="form-group"> 
                <label>version: </label>
                <input class="form-control" [ngModel]="changelog.version" placeholder="1.0.0">
            </div>
            <div class="form-group"> 
                <label>version: </label>
                <input class="form-control" [ngModel]="changelog.version" placeholder="1.0.0">
            </div>
            <div class="form-group">
                <label>version: </label>
                <input class="form-control" [ngModel]="changelog.version" placeholder="1.0.0">
            </div>
        </form>
        <h3>ChangeLogs</h3>
        <div>
            <table class="table table-striped">
                <thead>
                    <th>Id</th>
                    <th>version</th>
                    <th>message</th>
                    <th>username</th>
                    <th>createdon</th>
                    <th>updatedon</th>
                </thead>
                <tbody>
                    <tr *ngFor="let changelog of changelogs">
                        <td>{{changelog.id}}</td><td>{{changelog.version}}</td><td>{{changelog.message}}</td><td>{{changelog.username}}</td><td>{{changelog.createdon}}</td><td>{{changelog.updatedon}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  `,providers: [ChangeLogService]
})
export class AppComponent implements OnInit {
    errorMessage: string;
    public changelogs: ChangeLog[];
    mode = "observable";
    constructor(private changelogService: ChangeLogService) { }

    ngOnInit() { this.getList(); }

    model = new MyModel();

    getCompiler() {
        return this.model.compiler;
    }

    hero: Hero = {
        name: "(?°?°??? ???",
        id: 1
    };

    settings = new SiteSettings();
    // service = new ChangeLogService();

    getList() {
        this.changelogService.getChangeLogs()
            .subscribe(changelogs => this.changelogs = changelogs
            , error => this.errorMessage = <any>error);
    }

    postChangeLog(changelog: ChangeLog) {
        if (!changelog) {
            return;
        }

        this.changelogService.postChangeLog(changelog)
            .subscribe(changelog => this.changelogs.push(changelog)
                        , error => this.errorMessage = <any>error);
    }

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

