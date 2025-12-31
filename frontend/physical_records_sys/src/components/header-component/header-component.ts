import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private title: string = "Physical Records Registration";

  public getTitle(): string {
    return this.title;
  }
}
