import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NavComponent } from '../navbar/navbar.component';
import { PicsComponent } from '../images/images.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,NavComponent,PicsComponent,AboutComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
