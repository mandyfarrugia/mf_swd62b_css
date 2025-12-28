import { Component } from '@angular/core';

@Component({
  selector: 'header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  private title: string = "Physical Records Registration";

  public getTitle(): string {
    return this.title;
  }
}
