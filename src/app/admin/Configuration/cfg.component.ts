import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { cfgService } from '../adminShared/cfg.service';
import { cfg } from '../adminShared/cfg';

@Component({
    templateUrl: './cfg.component.html',
    styleUrls: ['./cfg.component.css']
})

export class cfgComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    incidents: cfg[];
    formDisplay: boolean = true;
    singleIncident: cfg;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private incidentSVC: cfgService
    ){}
    
    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;

    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    getPosts(){
        let dbRef = firebase.database().ref('Configuration/');
        dbRef.once('value')
        .then((snapshot)=> {
            let tmp: string[] = snapshot.val();
            this.incidents = Object.keys(tmp).map(key => tmp[key])
        });
    }
    editIncident(theIncident: cfg){
        this.singleIncident = theIncident;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updateIncident(single: cfg) {
        this.incidentSVC.editIncident(single);
        this.formDisplay = true;
    }

    closeIncident(single: cfg){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let verify = confirm('Are you sure you want to close this change?')
        if(verify == true) {
            this.incidentSVC.closeIncident(single);
            this.router.navigate(['/admin/']);
        }
        else {
            alert("Change not closed ! Please try again !");
        }
    }
    }




