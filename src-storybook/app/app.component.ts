import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from "primeng/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-storybook';
}
