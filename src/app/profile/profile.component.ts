import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FetchServiceService } from '../shared/fetch-service.service';
import { GithubUserProfile, Repository } from '../_core/profile.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppConstants } from '../_core/app.constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('scrollTarget') scrollTarget: ElementRef;
  
  constructor(
    private fetchService: FetchServiceService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  username: string = '';
  profile: GithubUserProfile = {} as GithubUserProfile;
  allRepos: Repository[] = [];
  searchControl = new FormControl('');
  repoNames: string[] = [];
  filteredRepoNames: Observable<string[]>;
  filteredRepos: Observable<Repository[]>;
  currentPage = AppConstants.PAGINATION_OPTIONS.PAGE;
  itemsPerPage = AppConstants.PAGINATION_OPTIONS.ITEMS_PER_PAGE;
  

  ngOnInit() {
    this.fetchService.currentUsername.subscribe((response: string) => {
      this.username = response;
      if (this.username) {
        this.fetchProfile();
        this.fetchRepos();
      }
    });

    this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => value || '')
    ).subscribe(value => {
      this.currentPage = 1;
      this.filteredRepos = of(this._filterRepos(value));
    });

    this.filteredRepoNames = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRepoNames(value || ''))
    );

    this.filteredRepos = of(this._filterRepos(''));
  }

  fetchProfile() {
    this.spinner.show();
    this.fetchService.fetchUsersInfo(this.username).subscribe((response: GithubUserProfile) => {
      this.profile = response;
      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
      this.showError("There was an error fetching this person's profile");
    });
  }

  fetchRepos() {
    this.spinner.show();
    this.repoNames = [];
    this.fetchService.fetchRepos(this.username).subscribe((response: Repository[]) => {
      this.allRepos = response;
      this.repoNames = response.map(repo => repo.name);
      this.currentPage = 1;
      this.filteredRepos = of(this._filterRepos(this.searchControl.value || ''));
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.showError("There was an error fetching this person's repositories");
    });
  }

  private _filterRepoNames(value: string): string[] {
    const searchValue = value.toLowerCase();
    return this.repoNames.filter(option => option.toLowerCase().includes(searchValue));
  }

  private _filterRepos(value: string): Repository[] {
    const searchValue = value.toLowerCase();
    let filteredRepos = this.allRepos;
    if (searchValue) {
      filteredRepos = this.allRepos.filter(repo => repo.name.toLowerCase().includes(searchValue));
    }
    return this._paginate(filteredRepos, this.currentPage, this.itemsPerPage);
  }

  private _paginate(array: Repository[], page: number, pageSize: number): Repository[] {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    const searchValue = this.searchControl.value || '';
    this.filteredRepos = of(this._filterRepos(searchValue));
    if (this.scrollTarget) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.allRepos.length / this.itemsPerPage);
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}