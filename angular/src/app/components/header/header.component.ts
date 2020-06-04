import { Component, OnInit } from '@angular/core';
import { RootComponent } from '../root/root.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public rootComponent: RootComponent) { }

  ngOnInit(): void {
  }

}
