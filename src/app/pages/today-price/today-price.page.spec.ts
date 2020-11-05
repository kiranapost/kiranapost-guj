import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayPricePage } from './today-price.page';

describe('TodayPricePage', () => {
  let component: TodayPricePage;
  let fixture: ComponentFixture<TodayPricePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPricePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayPricePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
