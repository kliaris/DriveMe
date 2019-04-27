import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent implements OnInit {
  @Input() title:string;
  
  constructor() { }

  ngOnInit() {}

}
