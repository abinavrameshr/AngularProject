import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { cfg } from './cfg';


@Injectable()

export class cfgService {
    authUser: any;
    loggedInUser: string;

    createIncident(incident: cfg){
         this.authUser = firebase.auth().currentUser;
         let dbRef = firebase.database().ref('Configuration/');
         let newIncident = dbRef.push();
         newIncident.set({
             title: incident.title,
             content: incident.content,
             userName: this.authUser.email,
             id: newIncident.key ,
             status: "open"
         })
         .catch ((error) =>{
              alert(`failed upload: ${error}`);
        });
    }
    editIncident ( update: cfg) {
        let dbRef = firebase.database().ref('incidents/').child(update.id)
        .update({
            title: update.title,
            content: update.content
        });
        alert('incident updated');
    }

    closeIncident (closeIncident: cfg){
        this.authUser = firebase.auth().currentUser;
        this.loggedInUser = this.authUser.email;
        
        
        let dbRef = firebase.database().ref('Configuration/').child(closeIncident.id)
        .update({
            status: "closed"
        });
        alert('Change closed'); 
    }
    }

