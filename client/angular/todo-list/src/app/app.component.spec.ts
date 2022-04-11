import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/services/auth.service';
import { SpinnerService } from './shared/services/spinner.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;
  let router: Router;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    mockSpinnerService = jasmine.createSpyObj('SpinnerService', [
      'getIsSpinnerVisible$',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'logout',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: SpinnerService, useValue: mockSpinnerService },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  xit('ngOnInit have to set up value from the service', () => {
    mockSpinnerService.getIsSpinnerVisible$.and.returnValue(of(true));
    fixture.detectChanges(); // ngOnInit
    expect(component.isSpinnerVisible).toBe(true);
  });

  it('ngOnInit have to set up isSpinnerVisible in true when error happens', fakeAsync(() => {
    mockSpinnerService.getIsSpinnerVisible$.and.returnValue(
      throwError(() => new Error('500'))
    );
    fixture.detectChanges(); // ngOnInit
    tick(1000);
    expect(component.isSpinnerVisible).toBe(true);
  }));

  it('isLoggedIn', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    const result = component.isLoggedIn;
    expect(result).toBe(true);
  });

  it('logout', () => {
    spyOn(router, 'navigateByUrl');
    component.logout();
    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/login');
  });
});
