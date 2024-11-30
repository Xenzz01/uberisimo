import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fire:AngularFireAuth) { }

  async login(email:string, contrasena:string){
    //const request = await this.fire.signInWithEmailAndPassword(email,contrasena);
    //return request;
    try {
      return await this.fire.signInWithEmailAndPassword(email,contrasena); 
    } catch (error: any) {
      throw error;
    }
  }

  async registro(email:string, contrasena:string){
    try {
      return await this.fire.createUserWithEmailAndPassword(email,contrasena);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<firebase.User | null> {
    return this.fire.currentUser;
  }
}

