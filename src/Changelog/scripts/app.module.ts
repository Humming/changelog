import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent }  from "./app.component";
import { ChangeLogFormComponent } from "./changelog-form.component";
import { ChangeLogListComponent } from "./changelog-list.component";
import "./rxjs-operators";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        ChangeLogFormComponent,
        ChangeLogListComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
