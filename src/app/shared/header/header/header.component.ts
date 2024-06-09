import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from '../../fetch-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';

  constructor(
    private fetchService: FetchServiceService,
    private router: ActivatedRoute,
    private routeTo: Router
  ) {}

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((params) => {
      const myUsername = params.get('username');
      if (myUsername) {
        this.searchTerm = myUsername;
      }
      this.fetchService.changeUsername(myUsername);
    });
  }

  onSearch() {
    const urlTree = this.routeTo.createUrlTree([], {
      queryParams: { username: this.searchTerm },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.routeTo.navigateByUrl(urlTree);
  }
}