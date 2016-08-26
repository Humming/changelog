import { Component, OnInit } from "@angular/core";
import { ChangeLog } from "./changelog";
import { ChangeLogService } from "./changelog.service";

@Component({
    selector: "changelog-list",
    templateUrl: "changelog-list.component.html",
    providers: [ChangeLogService]
})
export class ChangeLogListComponent implements OnInit {
    errorMessage: string;
    changelogs: ChangeLog[];
    mode = "observable";

    constructor(private changelogService: ChangeLogService) {}


    ngOnInit() {
        this.getList();
    }

    getList() {
        this.changelogService.getChangeLogs()
            .subscribe(changelogs => this.changelogs = changelogs, error => this.errorMessage = <any>error);
    }
}