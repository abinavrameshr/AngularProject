import { Component } from "@angular/core";
import { cfg } from "../adminShared/cfg";
import { cfgService } from "../adminShared/cfg.service";
import { Router } from "@angular/router";

@Component({
    selector: 'create-incident',
    templateUrl: './cfg-create.component.html',
    styleUrls: ['./cfg-create.component.css']
})

export class cfgCreateComponent {
    incidentTitle: string;
    incidentContent: string;
    incident: cfg;

    constructor(
        private incidentSVC: cfgService, 
        private router: Router
    ){}

   createIncident() {
       this.incident = new cfg (
           this.incidentTitle,
           this.incidentContent 
       );
       this.incidentSVC.createIncident(this.incident);
       alert(`${this.incidentTitle} added to posts`);
       this.router.navigate(['/admin/Configuration']);
   }

   cancel(){
       this.router.navigate(['/admin/Configuration']);
   }
}