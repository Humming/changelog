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
var core_1 = require("@angular/core");
require("./rxjs-operators");
var changelog_service_1 = require("./changelog.service");
var model_1 = require("./model");
var AppComponent = (function () {
    function AppComponent(changelogService) {
        this.changelogService = changelogService;
        this.mode = "observable";
        this.hero = {
            name: "test hero",
            id: 1
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        this.model = new model_1.MyModel();
        this.settings = new SiteSettings();
        this.title = this.settings.getTitle();
        this.getList();
    };
    AppComponent.prototype.getCompiler = function () {
        return this.model.compiler;
    };
    AppComponent.prototype.getList = function () {
        var _this = this;
        this.changelogService.getChangeLogs()
            .subscribe(function (changelogs) { return _this.changelogs = changelogs; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.postChangeLog = function (changelog) {
        var _this = this;
        if (!changelog) {
            return;
        }
        this.changelogService.postChangeLog(changelog)
            .subscribe(function (changelog) { return _this.changelogs.push(changelog); }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n        <h1>{{title}} hello</h1>\n        <h2>Mr {{hero.name}} is the hero of the day!</h2>\n        <div>\n            <label>id: {{hero.id}}</label>\n        </div>\n        <div>\n            <label>name: </label>\n            <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n        </div>\n        <br/>\n        <br/>\n        <br/>\n        \n        <changelog-form></changelog-form>        \n        <h3>ChangeLogs</h3>\n        <div>\n            <table class=\"table table-striped\">\n                <thead>\n                    <th>Id</th>\n                    <th>version</th>\n                    <th>message</th>\n                    <th>username</th>\n                    <th>createdon</th>\n                    <th>updatedon</th>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let changelog of changelogs\">\n                        <td>{{changelog.id}}</td><td>{{changelog.version}}</td><td>{{changelog.message}}</td><td>{{changelog.username}}</td><td>{{changelog.createdon}}</td><td>{{changelog.updatedon}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n  ", providers: [changelog_service_1.ChangeLogService]
        }), 
        __metadata('design:paramtypes', [changelog_service_1.ChangeLogService])
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
    SiteSettings.prototype.getTitle = function () {
        return this.title;
    };
    return SiteSettings;
}());
exports.SiteSettings = SiteSettings;
//# sourceMappingURL=app.js.map