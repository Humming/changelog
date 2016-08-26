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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var ChangeLogService = (function () {
    function ChangeLogService(http) {
        this.http = http;
        this.apiUrl = "http://development.changelog.no:54004/api/ChangeLogs"; // uRL to web API
        this.changelog = [
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
    }
    ChangeLogService.prototype.get = function (id) {
        return this.changelog[id];
    };
    ChangeLogService.prototype.getChangeLogs = function () {
        return this.http.get(this.apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ChangeLogService.prototype.postChangeLog = function (changelog) {
        changelog.createdOn = new Date;
        changelog.updatedOn = changelog.createdOn;
        var body = JSON.stringify(changelog);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl, body, options).map(this.extractData).catch(this.handleError);
    };
    ChangeLogService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ChangeLogService.prototype.handleError = function (error) {
        var errorMessage = (error.message)
            ? error.message : error.status
            ? error.status + " - " + error.statusText : "Server error";
        console.error(errorMessage);
        return Observable_1.Observable.throw(errorMessage);
    };
    ChangeLogService.prototype.post = function (object) {
        return false;
    };
    ChangeLogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChangeLogService);
    return ChangeLogService;
}());
exports.ChangeLogService = ChangeLogService;
//# sourceMappingURL=changelog.service.js.map