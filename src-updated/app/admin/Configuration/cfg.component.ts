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
    changes: cfg[];
    formDisplay: boolean = true;
    singlechange: cfg;
    authUser: any;
    loggedInUser: string;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private changesVC: cfgService
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
            this.changes = Object.keys(tmp).map(key => tmp[key])
        });
    }
    editchange(thechange: cfg){
        this.singlechange = thechange;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updatechange(single: cfg) {
        this.changesVC.editchange(single);
        this.formDisplay = true;
    }

    closechange(single: cfg){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let verify = confirm('Are you sure you want to close this change?')
        if(verify == true) {
            this.changesVC.closechange(single);
            this.router.navigate(['/admin/']);
        }
        else {
            alert("change not closed ! Please try again !");
        }
    }
    }




