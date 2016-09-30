import { Component } from "@angular/core";
import { ChangeLog } from "./changelog";
import { ChangeLogService } from "./changelog.service";

@Component({
    selector: "changelog-form",
    templateUrl: "changelog-form.component.html",
    providers: [ChangeLogService]
})

export default class ChangeLogFormComponent {

    errorMessage: string;
    changelogs: ChangeLog[];
    mode = "observable";
    constructor(private changelogService: ChangeLogService) { }


    changelogFormModel = new ChangeLog("", "", "");
    
    submitted = false;
    
    onSubmit() {
        this.submitted = true; 
        this.postChangeLog(this.changelogFormModel);
    }

    completePost():void {
        //todo: add some success event
    }

    active = true;
    newChangeLog() {
        this.changelogFormModel = new ChangeLog("", "", "");
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    postChangeLog(changelog: ChangeLog) {
        if (!changelog) {
            return;
        }
        this.changelogs = new Array<ChangeLog>();
        this.changelogService.postChangeLog(changelog)
            .subscribe(changelog => this.changelogs.push(changelog), error => this.errorMessage = <any>error, () => this.completePost());
    }
}