import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('slides', null) slides: IonSlides;
  constructor(private router: Router) { }
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
  };

  ngOnInit() {
  }

  skipStep() {
    this.router.navigate(['/login']);
  }

  next() {
    this.slides.slideNext();
  }

}
