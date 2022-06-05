import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import {DispositivoService} from '../services/dispositivo.service';
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
  public formDispositivo:FormGroup;
  public folder: string;
  data:any;
  dispositivos: Array <Dispositivo> = new Array<Dispositivo>();
  sensor_editing: boolean = false;
  index: number=0; 

  


  


  constructor(private activatedRoute: ActivatedRoute,public dispositivoServ: DispositivoService,) { // private fBuilder: FormBuilder
    
    example.subscribe(x =>this.upDate());
    
   }

  async llamoService(){
    console.log("Estoy en el llamoServicec y llame al service");
    let listado= await this.dispositivoServ.getListadoDispositivos();    
    console.log("llego");
    this.dispositivos=listado;    
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
  }  
  public onClickLight2(id:number){    
    if(this.dispositivos[id].luz2==1){
      this.dispositivos[id].luz2=0;
    }
    else this.dispositivos[id].luz2=1;
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

}
