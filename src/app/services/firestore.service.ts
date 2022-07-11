import { InteractionService } from './interaction.service';
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

  constructor(private database: AngularFirestore, private toast: InteractionService) { }

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

  updateDoc(colections: string, id: string, email: string, movil: string){
    this.database.collection(colections).doc(id).update({email: email, movil: movil})
  }

  deleteDoc(colections: string, id: string){
    this.database.collection(colections).doc(id).delete();
  }

  updateDayStart(colections: string, id: string, entrada: string){
    this.database.collection(colections).doc(id).update({Entrada: entrada}).then(() => {
      this.toast.presentToast("Horario de entrada de "+ id + " modificado satisfactoriamente.")
    })
  }

  updateDayEnd(colections: string, id: string, salida: string){
    this.database.collection(colections).doc(id).update({Salida: salida}).then(() => {
      this.toast.presentToast("Horario de salida de "+ id + " modificado satisfactoriamente.")
    })
  }


}
