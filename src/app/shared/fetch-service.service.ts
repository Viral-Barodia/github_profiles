import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { GithubUserProfile } from '../_core/profile.model';

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

 private usernameSource = new BehaviorSubject<string>('');
 currentUsername = this.usernameSource.asObservable();

  constructor(
    private http: HttpClient
  ) {}


  fetchUsersInfo(search_string: string): Observable<GithubUserProfile> {
    const headers = new HttpHeaders({
      'Authorization': `token ${environment.githubPAT}`
    });
    return this.http.get<GithubUserProfile>(`${environment.githubUsersApi}${search_string}`, { headers });
  }

  changeUsername(username: string){
    this.usernameSource.next(username);
  }

  fetchRepos(username: string){
    const headers = new HttpHeaders({
      'Authorization': `token ${environment.githubPAT}`
    });
    return this.http.get(`${environment.reposAPI}${username}/repos`, { headers });
  }
}