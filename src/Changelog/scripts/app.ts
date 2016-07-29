import {Component, OnInit, Injectable} from "@angular/core"
import { ChangeLog } from "./changelog";
import {ChangeLogService} from "./changelog.service"
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
                    <tr *ngFor="let changelog of changelogs">
                        <td>{{changelog.id}}</td><td>{{changelog.version}}</td><td>{{changelog.message}}</td><td>{{changelog.username}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  `
})
export class AppComponent implements OnInit {
    errorMessage: string;
    changelogs: ChangeLog[];
    mode = 'observable';
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
    //service = new ChangeLogService();

    getList() {
        this.changelogService.getChangeLogs().subscribe(changelogs => this.changelogs = changelogs, error => this.errorMessage = <any>error);

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

