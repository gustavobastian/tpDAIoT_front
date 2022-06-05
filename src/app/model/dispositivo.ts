export class Dispositivo{
    private _id: number;
    private _dispositivoId: number;
    private _nombre: string; 
    private _ubicacion: string;
    private _luz1: number;
    private _luz2: number;
    private _temperatura: number;
    private _humedad: number;
    private _topic: string;
    private _topicSrvResponse: string;
    private __v: number;

    constructor(id,dispositivo,nombre,ubicacion,luz1, luz2, temperatura,humedad, topic, topicSrvResponse,v){
        this._id=id;
        this._dispositivoId=dispositivo;
        this._nombre=nombre;
        this._ubicacion=ubicacion;
        this._luz1=luz1;
        this._luz2=luz2;
        this._temperatura=temperatura;
        this._humedad=humedad;
        this._topic=topic;
        this._topicSrvResponse=topicSrvResponse;
        this.__v=v;
    }

    public get id(): number {
        return this._id;
    }
    
    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }

    public get ubicacion(): string {
        return this._ubicacion;
    }
    public get topic(): string {
        return this._topic;
    }
    public set ubicacion(value: string) {
        this._ubicacion = value;
    }
    public set topic(value: string) {
        this._topic = value;
    }
    
    public get luz1(): number {
        return this._luz1;
    }
    public set luz1(value: number) {
        this._luz1 = value;
    }
    public get luz2(): number {
        return this._luz2;
    }
    public set luz2(value: number) {
        this._luz2 = value;
    }
    public get temperatura(): number {
        return this._temperatura;
    }
    public set temperatura(value: number) {
        this._temperatura = value;
    }
    public get humedad(): number {
        return this._humedad;
    }
    public set humedad(value: number) {
        this._humedad = value;
    }    
}
