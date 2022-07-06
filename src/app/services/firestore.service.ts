import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  storageRef = firebase.app().storage().ref();

  constructor(private database: AngularFirestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  async createDocWithImage(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    await this.subirImagen(path, data.Foto).then(res => {
      data.image = res;
    })
    return collection.doc(id).set(data)
  }

  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

  getCollectionOrderByDate<tipo>(path: string){
    const collection = this.database.collection<tipo>(path, ref => ref.orderBy('date'));
    return collection.valueChanges();
  }

  getDocById<tipo>(colections: string, id: string){
    const collection = this.database.collection(colections).doc<tipo>(id);
    return collection.valueChanges();
  }

  async subirImagen(nombre: string, img: any){
    try {
      let respuesta = this.storageRef.child(nombre).putString(img, "data_url");
      console.log(respuesta);
      return (await respuesta).ref.getDownloadURL();
    } catch (err) {
      console.log(err);
    }
  }

  createId(){
    return this.database.createId();
  }

  getIds(colections: string, ids: string[]){
    this.database.collection(colections).get().subscribe(res => {
      res.forEach(doc => {
        ids.push(doc.id)
      })
    })
  }

  updateDoc(colections: string, id: string, valoraciones: number, valoracion: number, round: number){
    this.database.collection(colections).doc(id).update({Valoracion: valoracion, Valoraciones: valoraciones, round: round})
  }


}
