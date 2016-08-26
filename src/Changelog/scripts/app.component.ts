import { Component, OnInit } from "@angular/core";
import { ChangeLog } from "./changelog";


@Component({
    selector: `my-app`,
    template: `
    <div class="container">
        <h2>{{title}}</h2>
        
        <changelog-form></changelog-form>        
        <changelog-list></changelog-list>
    </div>
  `
})
export class AppComponent implements OnInit {
    settings: SiteSettings;
    title: string;


    ngOnInit() {

        this.settings = new SiteSettings();
        this.title = this.settings.getTitle();
    }
}

export class SiteSettings {
    title: string;
    constructor() {
        this.title = "On Kestrel";
    }

    getTitle() {
        return this.title;
    }
}

