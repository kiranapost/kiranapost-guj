import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input()
  search = 'NO'

  @Output()
  handleSearch = new EventEmitter();
  totalProductLength:any='';

  constructor() {
    this.totalProductLength=localStorage.getItem('totallength');
  }

  ngOnInit() { }

  searchData(event) {
    console.log(event.target.value)
    this.handleSearch.emit({ value: event.target.value });
  }

}
