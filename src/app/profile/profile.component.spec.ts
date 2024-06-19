import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { FetchServiceService } from '../shared/fetch-service.service';
import { GithubUserProfile, Repository } from '../_core/profile.model';
import { of, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ElementRef } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let fetchService: FetchServiceService;
  let spinner: NgxSpinnerService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                BrowserAnimationsModule],
      providers: [provideHttpClient(),
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    fetchService = TestBed.inject(FetchServiceService);
    spinner = TestBed.inject(NgxSpinnerService);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile of a particular user successfully', () => {
    const username = 'fakeUsername';
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

    const fetchServiceSpy = spyOn(fetchService, 'fetchUsersInfo').and.returnValue(of(mockGithubUserProfile));
    const spinnerShowSpy = spyOn(spinner, 'show');
    const spinnerHideSpy = spyOn(spinner, 'hide');

    component.fetchProfile();
    expect(fetchServiceSpy).toHaveBeenCalled();
    expect(component.profile).toEqual(mockGithubUserProfile);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
  });

  it('should show error message when fetch profile fails', () => {
    const username = 'fakeUsername';
    component.username = username;
    const fetchServiceSpy = spyOn(fetchService, 'fetchUsersInfo').and.returnValue(throwError('error'));
    const spinnerShowSpy = spyOn(spinner, 'show');
    const spinnerHideSpy = spyOn(spinner, 'hide');
    const showErrorSpy = spyOn(component, 'showError');

    component.fetchProfile();

    expect(fetchServiceSpy).toHaveBeenCalledWith(username);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith("There was an error fetching this person's profile");
  });

  it('should fetch Repositories of the person successfully', () => {
    const mockRepository: Repository = {
      id: 123456789,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=',
      name: 'example-repo',
      full_name: 'exampleUser/example-repo',
      private: false,
      owner: {
        login: 'exampleUser',
        id: 1,
        node_id: 'MDQ6VXNlcjE=',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/exampleUser',
        html_url: 'https://github.com/exampleUser',
        followers_url: 'https://api.github.com/users/exampleUser/followers',
        following_url: 'https://api.github.com/users/exampleUser/following{/other_user}',
        gists_url: 'https://api.github.com/users/exampleUser/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/exampleUser/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/exampleUser/subscriptions',
        organizations_url: 'https://api.github.com/users/exampleUser/orgs',
        repos_url: 'https://api.github.com/users/exampleUser/repos',
        events_url: 'https://api.github.com/users/exampleUser/events{/privacy}',
        received_events_url: 'https://api.github.com/users/exampleUser/received_events',
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
      },
      html_url: 'https://github.com/exampleUser/example-repo',
      description: 'This is an example repository.',
      fork: false,
      url: 'https://api.github.com/repos/exampleUser/example-repo',
      forks_url: 'https://api.github.com/repos/exampleUser/example-repo/forks',
      keys_url: 'https://api.github.com/repos/exampleUser/example-repo/keys{/key_id}',
      collaborators_url: 'https://api.github.com/repos/exampleUser/example-repo/collaborators{/collaborator}',
      teams_url: 'https://api.github.com/repos/exampleUser/example-repo/teams',
      hooks_url: 'https://api.github.com/repos/exampleUser/example-repo/hooks',
      issue_events_url: 'https://api.github.com/repos/exampleUser/example-repo/issues/events{/number}',
      events_url: 'https://api.github.com/repos/exampleUser/example-repo/events',
      assignees_url: 'https://api.github.com/repos/exampleUser/example-repo/assignees{/user}',
      branches_url: 'https://api.github.com/repos/exampleUser/example-repo/branches{/branch}',
      tags_url: 'https://api.github.com/repos/exampleUser/example-repo/tags',
      blobs_url: 'https://api.github.com/repos/exampleUser/example-repo/git/blobs{/sha}',
      git_tags_url: 'https://api.github.com/repos/exampleUser/example-repo/git/tags{/sha}',
      git_refs_url: 'https://api.github.com/repos/exampleUser/example-repo/git/refs{/sha}',
      trees_url: 'https://api.github.com/repos/exampleUser/example-repo/git/trees{/sha}',
      statuses_url: 'https://api.github.com/repos/exampleUser/example-repo/statuses/{sha}',
      languages_url: 'https://api.github.com/repos/exampleUser/example-repo/languages',
      stargazers_url: 'https://api.github.com/repos/exampleUser/example-repo/stargazers',
      contributors_url: 'https://api.github.com/repos/exampleUser/example-repo/contributors',
      subscribers_url: 'https://api.github.com/repos/exampleUser/example-repo/subscribers',
      subscription_url: 'https://api.github.com/repos/exampleUser/example-repo/subscription',
      commits_url: 'https://api.github.com/repos/exampleUser/example-repo/commits{/sha}',
      git_commits_url: 'https://api.github.com/repos/exampleUser/example-repo/git/commits{/sha}',
      comments_url: 'https://api.github.com/repos/exampleUser/example-repo/comments{/number}',
      issue_comment_url: 'https://api.github.com/repos/exampleUser/example-repo/issues/comments{/number}',
      contents_url: 'https://api.github.com/repos/exampleUser/example-repo/contents/{+path}',
      compare_url: 'https://api.github.com/repos/exampleUser/example-repo/compare/{base}...{head}',
      merges_url: 'https://api.github.com/repos/exampleUser/example-repo/merges',
      archive_url: 'https://api.github.com/repos/exampleUser/example-repo/{archive_format}{/ref}',
      downloads_url: 'https://api.github.com/repos/exampleUser/example-repo/downloads',
      issues_url: 'https://api.github.com/repos/exampleUser/example-repo/issues{/number}',
      pulls_url: 'https://api.github.com/repos/exampleUser/example-repo/pulls{/number}',
      milestones_url: 'https://api.github.com/repos/exampleUser/example-repo/milestones{/number}',
      notifications_url: 'https://api.github.com/repos/exampleUser/example-repo/notifications{?since,all,participating}',
      labels_url: 'https://api.github.com/repos/exampleUser/example-repo/labels{/name}',
      releases_url: 'https://api.github.com/repos/exampleUser/example-repo/releases{/id}',
      deployments_url: 'https://api.github.com/repos/exampleUser/example-repo/deployments',
      created_at: '2021-01-01T00:00:00Z',
      updated_at: '2021-01-01T00:00:00Z',
      pushed_at: '2021-01-01T00:00:00Z',
      git_url: 'git://github.com/exampleUser/example-repo.git',
      ssh_url: 'git@github.com:exampleUser/example-repo.git',
      clone_url: 'https://github.com/exampleUser/example-repo.git',
      svn_url: 'https://github.com/exampleUser/example-repo',
      homepage: 'https://example.com',
      size: 1234,
      stargazers_count: 100,
      watchers_count: 100,
      language: 'TypeScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      has_discussions: true,
      forks_count: 10,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 5,
      license: 'MIT',
      allow_forking: true,
      is_template: false,
      web_commit_signoff_required: false,
      topics: ['typescript', 'example', 'repository'],
      visibility: 'public',
      forks: 10,
      open_issues: 5,
      watchers: 100,
      default_branch: 'main'
    };

    const username = 'fakeUsername';
    component.username = username;
    expect(component.repoNames.length).toEqual(0);
    const fetchServiceSpy = spyOn(fetchService, 'fetchRepos').and.returnValue(of([mockRepository]));
    const spinnerShowSpy = spyOn(spinner, 'show');
    const spinnerHideSpy = spyOn(spinner, 'hide');
    
    component.fetchRepos();
    
    expect(fetchServiceSpy).toHaveBeenCalledWith(username);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
  });

  it('should not fetch repositories of the person and should give error', () => {
    const username = 'fakeUsername';
    component.username = username;
    expect(component.repoNames.length).toEqual(0);
    const fetchServiceSpy = spyOn(fetchService, 'fetchRepos').and.returnValue(throwError('error'));
    const spinnerShowSpy = spyOn(spinner, 'show');
    const spinnerHideSpy = spyOn(spinner, 'hide');
    const showErrorSpy = spyOn(component, 'showError');
    
    component.fetchRepos();
    
    expect(fetchServiceSpy).toHaveBeenCalledWith(username);
    expect(spinnerShowSpy).toHaveBeenCalled();
    expect(spinnerHideSpy).toHaveBeenCalled();
    expect(showErrorSpy).toHaveBeenCalledWith("There was an error fetching this person's repositories");
  });

  it('should return 1 total page when allRepos has exactly itemsPerPage items', () => {
    component.allRepos = new Array(10).fill({});
    component.itemsPerPage = 10;
    expect(component.totalPages).toBe(1);
  });

  it('should change the current page and filter repositories', () => {
    const mockRepositories = [
      { name: 'repo1' },
      { name: 'repo2' },
      { name: 'test-repo' },
    ] as Repository[];
    component.allRepos = mockRepositories;
    component.searchControl.setValue('repo');

    component.changePage(1);
    expect(component.currentPage).toBe(1);
    component.filteredRepos.subscribe(filteredRepos => {
      expect(filteredRepos.length).toBe(3);
      expect(filteredRepos).toContain(mockRepositories[0]);
      expect(filteredRepos).toContain(mockRepositories[1]);
    });
    component.scrollTarget = {
      nativeElement: {
        scrollIntoView: jasmine.createSpy('scrollIntoView')
      }
    } as ElementRef;
    component.changePage(1);
    expect(component.scrollTarget.nativeElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('should show an error message using MatSnackBar', () => {
    const errorMessage = 'Test error message';
    component.showError(errorMessage);
    
    expect(snackBar.open).toHaveBeenCalledWith(
      errorMessage,
      'Close',
      {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      }
    );
  });
});
