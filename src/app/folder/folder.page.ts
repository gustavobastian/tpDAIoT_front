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
import { EChartsOption } from 'echarts';



import { interval } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';


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
  
   n:number = 20;
   

   //chart for visualization
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      min:0,
      max:40,
      type: 'value',
    },
    series: [
      {
        data: [20, 22, 21, 15, 17, 19, 20],
        type: 'line',//line
      },
    ],
  };
  


  constructor(private activatedRoute: ActivatedRoute,public dispositivoServ: DispositivoService,public MedicionesServ: MedicionesService) { // private fBuilder: FormBuilder
    
    example.subscribe(x =>this.upDate());
    
   }

  async llamoService(){
   // console.log("Estoy en el llamoServicec y llame al service");
    let listado= await this.dispositivoServ.getListadoDispositivos();    
    //console.log("listadodev"+listado);
    this.dispositivos=listado;    
  }
  async llamoMediciones(){
   // console.log("Estoy en el llamoMediciones y llame a las mediciones");
    let listado= await this.MedicionesServ.getListadoMediciones();    
    //console.log("llego");
    this.mediciones=listado;    
  }
  async llamoMedicionesLocal(id: number ){
   // console.log("Estoy en el llamoMediciones y llame a las mediciones");
    let listado= await this.MedicionesServ.getMedicion(id);    
   // console.log("llego");
  //  console.log("listadoMed"+listado);
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
    //console.log(this.dispositivos[id].nombre);
    //console.log(this.dispositivos[id].ubicacion);
    this.dispositivoServ.saveSensorModifications(this.dispositivos[id]); 
    this.sensor_editing= false;
  } 
  public salir(){    
    this.sensor_editing= false;
  } 
  public salir_visualizar(){        
    this.history_visualization=false;
    console.log(this.history_visualization);
  } 

  public async visualizar(){    
    //console.log("aqui");
    console.log("dispositivo:" + this.dispositivoLocalId);
    //console.log("parameter:" + this.parameterLocal);
    
    if (this.dispositivoLocalId>0){
      await this.llamoMedicionesLocal(this.dispositivoLocalId);
    
    //    
    
    let limit=0;
    if(this.n>this.mediciones.length){limit=this.mediciones.length;}
    else(limit=this.n);

    let series = new Array<number>(limit);     
    //let xData = new Array(limit).fill(null).map((_, i) => i + 1);
    let xData = new Array<string>(limit);
    let titleLocal =" Hola";
    if(this.parameterLocal=="Temperatura"){
      titleLocal="Temperatura";
    }else{
      titleLocal="Humedad";
    }

    for(let i=0;i<limit;i++){
     
      let date = new Date(this.mediciones[i].ts);      

      if(this.parameterLocal=="Temperatura"){
      series[limit-i-1]=this.mediciones[i].etemperatura;
      xData[limit-i-1]=date.getHours().toString()+":"+date.getMinutes().toString();
      
      }
      else{
        series[limit-i-1]=this.mediciones[i].ehumedad;
        
        xData[limit-i-1]=date.getHours().toString()+":"+date.getMinutes().toString();
      }     
     }
    this.chartOption  = {
      title:{
        text: titleLocal,
      },
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        min:Math.min.apply(Math,series)-5,
        max:Math.max.apply(Math,series)+5,
        type: 'value',        
      },
      series: [
        {
          data: series,
          type: 'line',//line
        }      
      ]
       
    };
    this.history_visualization=true;
  }
  else{
    this.history_visualization=false;
    console.log("nada que mostrar");
  }

    
    
    console.log(this.history_visualization);
  } 


}

