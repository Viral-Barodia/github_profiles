import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchServiceService } from '../shared/fetch-service.service';
import { GithubUserProfile } from '../_core/profile.model';
import { environment } from '../../../environment';

describe('FetchServiceService', () => {
  let service: FetchServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchServiceService]
    });
    service = TestBed.inject(FetchServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch the user information correctly', () => {
    const search_string = 'example_gitHubUser';
    const mockGithubUserProfile: GithubUserProfile = {
      login: 'example_gitHubUser',
      id: 1,
      node_id: 'MDQ6VXNlcjE=',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/example_gitHubUser',
      html_url: 'https://github.com/example_gitHubUser',
      followers_url: 'https://api.github.com/users/example_gitHubUser/followers',
      following_url: 'https://api.github.com/users/example_gitHubUser/following{/other_user}',
      gists_url: 'https://api.github.com/users/example_gitHubUser/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/example_gitHubUser/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/example_gitHubUser/subscriptions',
      organizations_url: 'https://api.github.com/users/example_gitHubUser/orgs',
      repos_url: 'https://api.github.com/users/example_gitHubUser/repos',
      events_url: 'https://api.github.com/users/example_gitHubUser/events{/privacy}',
      received_events_url: 'https://api.github.com/users/example_gitHubUser/received_events',
      type: 'User',
      site_admin: false,
      name: 'Example User',
      company: 'Example Company',
      blog: 'https://example.com',
      location: 'Earth',
      email: 'example@example.com',
      hireable: true,
      bio: 'This is a mock user.',
      twitter_username: 'exampleTwitter',
      public_repos: 10,
      public_gists: 5,
      followers: 100,
      following: 50,
      created_at: '2020-01-01T00:00:00Z',
      updated_at: '2020-01-01T00:00:00Z'
    };

    service.fetchUsersInfo(search_string).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockGithubUserProfile);
    });

    const req = httpMock.expectOne(`${environment.githubUsersApi}${search_string}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGithubUserProfile);
  });
  
  it('should fetch the user repositories correctly', () => {
    const username = 'example_gitHubUser';
    const mockGithubUserProfile: GithubUserProfile = {
      login: 'example_gitHubUser',
      id: 1,
      node_id: 'MDQ6VXNlcjE=',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/example_gitHubUser',
      html_url: 'https://github.com/example_gitHubUser',
      followers_url: 'https://api.github.com/users/example_gitHubUser/followers',
      following_url: 'https://api.github.com/users/example_gitHubUser/following{/other_user}',
      gists_url: 'https://api.github.com/users/example_gitHubUser/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/example_gitHubUser/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/example_gitHubUser/subscriptions',
      organizations_url: 'https://api.github.com/users/example_gitHubUser/orgs',
      repos_url: 'https://api.github.com/users/example_gitHubUser/repos',
      events_url: 'https://api.github.com/users/example_gitHubUser/events{/privacy}',
      received_events_url: 'https://api.github.com/users/example_gitHubUser/received_events',
      type: 'User',
      site_admin: false,
      name: 'Example User',
      company: 'Example Company',
      blog: 'https://example.com',
      location: 'Earth',
      email: 'example@example.com',
      hireable: true,
      bio: 'This is a mock user.',
      twitter_username: 'exampleTwitter',
      public_repos: 10,
      public_gists: 5,
      followers: 100,
      following: 50,
      created_at: '2020-01-01T00:00:00Z',
      updated_at: '2020-01-01T00:00:00Z'
    };
    
    service.fetchRepos(username).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockGithubUserProfile);
    });
    
    const req = httpMock.expectOne(`${environment.reposAPI}${username}/repos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGithubUserProfile);
  });
});