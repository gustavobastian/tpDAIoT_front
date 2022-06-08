export class Medicion{
    private _logId: number;
    private _etemperatura: number;
    private _ehumedad: number;
    private _eluz1: number;
    private _eluz2: number;
    private _ts: string;    
    private _dispositivoId: number;
    private _versionId: number;

    constructor(logIdDato: number,fechaDato: string, Luz1: number, Luz2: number,  medicionT :number, medicionH: number, dispositivoIdDato: number, versionIdDato: number){        
        this._logId = logIdDato;
        this._ts= fechaDato;
        this._ehumedad = medicionH;
        this._etemperatura = medicionT;
        this._eluz1=Luz1;
        this._eluz2=Luz2;
        this._dispositivoId= dispositivoIdDato;
        this._versionId= versionIdDato;
    }

    public get logId(){
        return this._logId;
    }
    public get ts() {
        return this._ts;
    }
    public get etemperatura() {
        return this._etemperatura;
    }
    public get ehumedad() {
        return this._ehumedad;
    }
    public get Luz1() {
        return this._eluz1;
    }
    public get Luz2() {
        return this._eluz2;
    }
    public get dispositivoId() {
        return this._dispositivoId;
    }
    public set medicionId(num: number){
        this._dispositivoId=num;
    }
    public set logId(num: number){
        this._logId=num;
    }
    public set  fecha(fechadata: string){
        this._ts=fechadata;
    }
    
    public set Temperatura(temperatura: number){
        this._etemperatura=temperatura;
    }
    public set Humedad(humedad: number){
        this._ehumedad=humedad;
    }
    public set dispositivoId(num: number){
        this._dispositivoId= num;
    }
    public set Luz1(Luz1: number){
        this._eluz1=Luz1;
    }
    public set Luz2(Luz2: number){
        this._eluz2=Luz2;
    }

};


