import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {FbCreateResponse, Post} from './interfaces';
import {map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
      // @ts-ignore
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        }
        }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDBUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDBUrl}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDBUrl}/posts/${post.id}.json`, post)
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDBUrl}/posts/${id}.json`)
  }

  // @ts-ignore
  public getFake(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/todos/1`);
  }

  // @ts-ignore
  public getFakeUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  public getFakeUserAsync() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').toPromise();
  }

  getDataData() {
    return interval(3000).pipe(
      switchMap( () => this.getFake())
    )

  }

}
