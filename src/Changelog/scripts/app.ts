import {Component} from "angular2/core"
import {MyModel} from "./model"

@Component({
    selector: `my-app`,
    template: `
        <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  `
})
export class AppComponent {
    model = new MyModel();
    getCompiler() {
        return this.model.compiler;
    }
    hero: Hero = {
        name: "Eric",
        id: 1
    };
    settings: SiteSettings = { title: "Changelog" };

    title = this.settings.title;
}

export class Hero {
    name: string;
    id: number;
}

export class SiteSettings {
    title: string;

}