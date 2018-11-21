import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { cfg } from './cfg';


@Injectable()

export class cfgService {
    authUser: any;
    loggedInUser: string;

    createchange(change: cfg){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('Configuration/');
         let newchange = dbRef.push();
         newchange.set({
             title: change.title,
             type: change.type,
             resource: change.resource,
             content: change.content,
             userName: this.authUser.email,
             id: newchange.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }
    editchange ( update: cfg) {
        let dbRef = firebase.database().ref('changes/').child(update.id)
        .update({
            title: update.title,
            type: update.type,
            resource: update.resource,
            content: update.content
            
            
        });
        alert('change updated');
    }

    closechange (closechange: cfg){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let dbRef = firebase.database().ref('Configuration/').child(closechange.id)
        .update({
            status: "closed"
        });
        alert('change closed'); 
    }
    }

