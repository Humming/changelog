"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var model_1 = require("./model");
var AppComponent = (function () {
    function AppComponent() {
        this.model = new model_1.MyModel();
        this.hero = {
            name: "(?�?�??? ???",
            id: 1
        };
        this.settings = new SiteSettings();
        this.service = new ChangeLogService();
        this.changelogs = this.service.list();
        this.title = this.settings.title;
    }
    AppComponent.prototype.getCompiler = function () {
        return this.model.compiler;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n        <h1>{{title}}</h1>\n        <h2>Mr {{hero.name}} is the hero of the day!</h2>\n        <div><label>id: </label>{{hero.id}}</div>\n        <div>\n            <label>name: </label>\n            <input [(ngModel)]=\"hero.name\" placeholder=\"name\">\n        </div>\n        <h3>ChangeLogs</h3>\n        <div>\n            <table class=\"table table-striped\">\n                <thead>\n                    <th>Id</th>\n                    <th>version</th>\n                    <th>message</th>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"#changelog of changelogs\">\n                        <td>{{changelog.id}}</td><td>{{changelog.version}}</td><td>{{changelog.message}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());
exports.Hero = Hero;
var SiteSettings = (function () {
    function SiteSettings() {
        this.title = "On Kestrel";
    }
    return SiteSettings;
}());
exports.SiteSettings = SiteSettings;
var ChangeLogService = (function () {
    function ChangeLogService() {
        this.changelog = [
            { id: 1, version: "4.0.9", message: "Mailgun email tracking set to false - Eric" },
            { id: 2, version: "4.0.10", message: "Fixed error message when client was expecting json but got html due to the statuscodehandler - Eric" }
        ];
    }
    ChangeLogService.prototype.get = function (id) {
        return this.changelog[id];
    };
    ChangeLogService.prototype.list = function () {
        return this.changelog;
    };
    ChangeLogService.prototype.post = function (object) {
        return false;
    };
    return ChangeLogService;
}());
exports.ChangeLogService = ChangeLogService;
var ChangeLog = (function () {
    function ChangeLog() {
    }
    return ChangeLog;
}());
exports.ChangeLog = ChangeLog;
//# sourceMappingURL=app.js.map