import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { Medicion } from '../model/medicion';
import {DispositivoService} from '../services/dispositivo.service';
import {MedicionesService} from '../services/mediciones.service';
import { Observable } from 'rxjs/Observable';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';


import { interval } from 'rxjs';
import { repeat, take } from 'rxjs/operators';

//every 30 seconds refresh values
const source = interval(30000);
const example = source.pipe(take(1), repeat());



@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  data:any;
  dispositivos: Array <Dispositivo> = new Array<Dispositivo>();
  mediciones: Array <Medicion> = new Array<Medicion>();
  sensor_editing: boolean = false;
  history_visualization: boolean = false;
  index: number=0; 

  dispositivoLocalId: number=0;
  parameterLocal: string="Temperatura";


  


  constructor(private activatedRoute: ActivatedRoute,public dispositivoServ: DispositivoService,public MedicionesServ: MedicionesService) { // private fBuilder: FormBuilder
    
    example.subscribe(x =>this.upDate());
    
   }

  async llamoService(){
    console.log("Estoy en el llamoServicec y llame al service");
    let listado= await this.dispositivoServ.getListadoDispositivos();    
    console.log("llego");
    this.dispositivos=listado;    
  }
  async llamoMediciones(){
    console.log("Estoy en el llamoMediciones y llame a las mediciones");
    let listado= await this.MedicionesServ.getListadoMediciones();    
    console.log("llego");
    this.mediciones=listado;    
  }
  async llamoMedicionesLocal(id: number ){
    console.log("Estoy en el llamoMediciones y llame a las mediciones");
    let listado= await this.MedicionesServ.getMedicion(id);    
    console.log("llego");
    this.mediciones=listado;    
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.llamoService();
    console.log(this.dispositivos);
  }
  private upDate(){
    this.data = Observable
    .interval(1000)
    .mergeMapTo(this.llamoService())    
   }
  public onClickLight1(id:number){    
    if(this.dispositivos[id].luz1==1){
      this.dispositivos[id].luz1=0;
    }
    else this.dispositivos[id].luz1=1;
    this.dispositivoServ.saveLighModifications(this.dispositivos[id]); 
  }  
  public onClickLight2(id:number){    
    if(this.dispositivos[id].luz2==1){
      this.dispositivos[id].luz2=0;
    }
    else this.dispositivos[id].luz2=1;

    this.dispositivoServ.saveLighModifications(this.dispositivos[id]); 
  } 
  public editar(id:number){    
  /*  this.formDispositivo=this.fBuilder.group({
      nombre:['',Validators.required],
      ubicacion:['',Validators.required]
    }
    );*/
    this.index=id;
    this.sensor_editing= true;
  } 
  public enviar(id:number){    
 //   console.log(this.formDispositivo.get("nombre")?.value); 
 //   console.log(this.formDispositivo.get("ubicacion")?.value);
    console.log(this.dispositivos[id].nombre);
    console.log(this.dispositivos[id].ubicacion);
    this.dispositivoServ.saveSensorModifications(this.dispositivos[id]); 
    this.sensor_editing= false;
  } 
  public salir(){    
    this.sensor_editing= false;
  } 
  public salir_visualizar(){        
    this.history_visualization=false;
  } 

  public visualizar(){    
    console.log("aqui");
    console.log("dispositivo:" + this.dispositivoLocalId);
    console.log("parameter:" + this.parameterLocal);
    if(this.dispositivoLocalId>0){
      this.llamoMedicionesLocal(this.dispositivoLocalId);
    }
    else{
      this.llamoMediciones();
    }
    //
    //console.log(this.mediciones);
    this.history_visualization=true;
  } 
}

