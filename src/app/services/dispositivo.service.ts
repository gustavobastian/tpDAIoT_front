import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/dispositivo';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  urlApi="http://localhost:8080";
  postId;

  constructor(private _http: HttpClient ) { }

  getListadoDispositivos():Promise<Dispositivo[]>{   
    //console.log("here");  
    
    return this._http.get(this.urlApi+ "/dispositivos").toPromise().then((listado:Dispositivo[])=>{            
      //console.log("here2");  
      console.log(listado);
      return listado;
    });
  }
  getListadoDispositivo(id: number):Promise<Dispositivo>{   
    //console.log("here");  
    
    return this._http.get(this.urlApi+ "/dispositivos/"+id).toPromise().then((listado:Dispositivo)=>{            
      //console.log("here2");  
      console.log(listado);
      return listado;
    });
  }
  saveSensorModifications(disp: Dispositivo) {
    //return this.mediciones.filter(medicion=> medicion.dispositivoId==id)[0];      
    console.log("guardando:"+disp.dispositivoId);
    let output = (disp);
    this._http.post<any>(this.urlApi+"/dispositivos/"+disp.dispositivoId,output).subscribe(data => {this.postId = data.id;});
    }; 

}
