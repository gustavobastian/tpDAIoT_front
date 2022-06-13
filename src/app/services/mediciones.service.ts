import { Injectable } from '@angular/core';
import { Medicion } from '../model/medicion';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MedicionesService {
  urlApi="http://localhost:8080";
  postId;
  constructor(private _http: HttpClient ) { }

  getListadoMediciones():Promise<Medicion[]>{   
    //console.log("here");  
    
    return this._http.get(this.urlApi+ "/logs").toPromise().then((listado:Medicion[])=>{            
      //console.log("here2");  
     // console.log(listado);
      return listado;
    });
  }
  getMedicion(id: number):Promise<Medicion[]>{   
    //console.log("here");  
    
    return this._http.get(this.urlApi+ "/logs/"+id).toPromise().then((listado:Medicion[])=>{            
      //console.log("here2");  
      //console.log(listado[1]);      
      return listado;
    });
  }
  getLastMedicion(id: number):Promise<string>{   
    //console.log("here");  
    
    return this._http.get(this.urlApi+ "/lastlogs/"+id).toPromise().then((listado:Medicion)=>{            
      console.log("here2");  
      console.log(listado); 
    let output=JSON.stringify(listado[0]);  
    console.log(output);      
      return output;
    });
  }
}
