import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Sensores', url: '/folder/Sensores', icon: 'calculator' },    
    { title: 'Luces', url: '/folder/Luces', icon: 'bulb' },
    { title: 'Historico', url: '/folder/Historico', icon: 'map' },    
  ];
  
  constructor() {}
}
