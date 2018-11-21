import { Component } from "@angular/core";
import { cfg } from "../adminShared/cfg";
import { cfgService } from "../adminShared/cfg.service";
import { Router } from "@angular/router";

@Component({
    selector: 'create-change',
    templateUrl: './cfg-create.component.html',
    styleUrls: ['./cfg-create.component.css']
})

export class cfgCreateComponent {
    changeTitle: string;
    changetype: string;
    changeresource: string;
    changeContent: string;
    change: cfg;
    

    constructor(
        private changeSVC: cfgService, 
        private router: Router
    ){}

   createchange() {
       this.change = new cfg (
           this.changeTitle,
           this.changetype,
           this.changeresource,
           this.changeContent,
       );
       this.changeSVC.createchange(this.change);
       alert(`${this.changeTitle} added to posts`);
       this.router.navigate(['/admin/Configuration']);
   }

   cancel(){
       this.router.navigate(['/admin/Configuration']);
   }
}