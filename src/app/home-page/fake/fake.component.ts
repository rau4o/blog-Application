import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {PostService} from '../../shared/post.service';

@Component({
  selector: 'app-fake',
  templateUrl: './fake.component.html',
  styleUrls: ['./fake.component.scss']
})
export class FakeComponent implements OnInit, OnChanges {

  // @ts-ignore
  @Input() fakeName: string;

  constructor() { }

  ngOnInit(): void {
    this.fakeName = '123'
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.fakeName);
  }

}
