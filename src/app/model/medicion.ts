export class Medicion{
    private _medicionId: number;
    private _logId: number;
    private _medicionTemperatura: number;
    private _medicionHumedad: number;
    private _luz1: number;
    private _luz2: number;
    private _fecha: string;    
    private _dispositivoId: number;
    private _versionId: number;

    constructor(medIdDato: number,logIdDato: number,fechaDato: string, Luz1: number, Luz2: number,  medicionT :number, medicionH: number, dispositivoIdDato: number, versionIdDato: number){
        this._medicionId = medIdDato;
        this._logId = logIdDato;
        this._fecha= fechaDato;
        this._medicionHumedad = medicionH;
        this._medicionTemperatura = medicionT;
        this._luz1=Luz1;
        this._luz2=Luz2;
        this._dispositivoId= dispositivoIdDato;
        this._versionId= versionIdDato;
    }

    public get medicionId(){
        return this._medicionId;
    }
    public get fecha() {
        return this._fecha;
    }
    public get Temperatura() {
        return this._medicionTemperatura;
    }
    public get Humedad() {
        return this._medicionHumedad;
    }
    public get Luz1() {
        return this._luz1;
    }
    public get Luz2() {
        return this._luz2;
    }
    public get dispositivoId() {
        return this._dispositivoId;
    }
    public set medicionId(num: number){
        this._dispositivoId=num;
    }
    public set  fecha(fechadata: string){
        this._fecha=fechadata;
    }
    public set Temperatura(temperatura: number){
        this._medicionTemperatura=temperatura;
    }
    public set Humedad(humedad: number){
        this._medicionHumedad=humedad;
    }
    public set dispositivoId(num: number){
        this._dispositivoId= num;
    }
    public set Luz1(Luz1: number){
        this._luz1=Luz1;
    }
    public set Luz2(Luz2: number){
        this._luz2=Luz2;
    }

};


