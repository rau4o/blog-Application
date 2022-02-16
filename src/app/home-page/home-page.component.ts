import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';
import {interval, Observable, Subscription} from 'rxjs';
import {Post} from '../shared/interfaces';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // @ts-ignore
  posts$: Observable<Post[]>
  // @ts-ignore
  fakeName: string;
  // @ts-ignore
  fakeUser: string;
  // @ts-ignore
  subscription: Subscription = new Subscription();
  count = 0;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
    this.getF();
    // this.getr();
    // setInterval(
    //   () => this.getr(), 2800);
  }

  getr() {
    this.postService.getDataData().subscribe(res => {
      this.fakeName = res.title + `${this.count}`;
      this.count++;
    });
  }

  async getF() {
    console.log(1);
    const value: any = await this.postService.getFakeUserAsync();
    console.log(22);
    this.subscription.add(this.postService.getFake().subscribe(res => {
      console.log(2);
      this.fakeName = res.title;
      console.log(3);
      console.log(value);
    }));
    console.log(4);
    this.subscription.add(this.postService.getFakeUsers().subscribe(res => {
      console.log(5);
      this.fakeUser = res.name;
      console.log(6);
    }))
    console.log(value);
    console.log(this.fakeUser);
    console.log(7);
  }
}
