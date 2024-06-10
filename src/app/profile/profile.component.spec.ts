import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { FetchServiceService } from '../shared/fetch-service.service';
import { GithubUserProfile } from '../_core/profile.model';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let fetchService: FetchServiceService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideHttpClient()],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    fetchService = TestBed.inject(FetchServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch profile of a particular user successfully', () => {
  //   const mockResponse: GithubUserProfile = {
  //     login: '',
  //     id: 1,

  //   }
  //   const fetchServiceSpy = spyOn(fetchService, 'fetchUsersInfo').and.returnValue(() => mockResponse)
  // })
});
