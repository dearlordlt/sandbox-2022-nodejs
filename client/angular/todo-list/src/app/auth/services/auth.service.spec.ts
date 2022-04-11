import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '../../app.config';

describe('Auth service with TestBed', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });
  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setSession have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    const expectedResult = {
      apiKey: 'apiKey',
      expiresIn: 10000,
    };
    service.login('email', 'psw').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${APP_CONFIG.api.url}/api/login?user=email&password=psw`,
    });
    req.flush(expectedResult);
  });

  it('setSession have not to call on error', (done: DoneFn) => {
    spyOn(service as any, 'setSession');
    service.login('email', 'psw').subscribe({
      error: () => {
        expect((service as any).setSession).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${APP_CONFIG.api.url}/api/login?user=email&password=psw`,
    });
    req.error(new ProgressEvent('401'));
  });
});

// import { AuthService } from './auth.service';
// import { HttpClient } from '@angular/common/http';
// import { of, throwError } from 'rxjs';
//
// describe('AuthService', () => {
//   let service: AuthService;
//   let httpClientSpy: jasmine.SpyObj<HttpClient>;
//
//   beforeEach(() => {
//     httpClientSpy = jasmine.createSpyObj('HttpService', ['get', 'post']);
//     service = new AuthService(httpClientSpy);
//   });
//
//   it('AuthService should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
//   it('setSession have to call on success', (done: DoneFn) => {
//     spyOn(service as any, 'setSession');
//     const expectedResult = {
//       apiKey: 'apiKey',
//       expiresIn: 10000,
//     };
//     httpClientSpy.get.and.returnValue(of(expectedResult));
//     service.login('test', 'psw').subscribe(() => {
//       expect((service as any).setSession).toHaveBeenCalledOnceWith(
//         expectedResult
//       );
//       done();
//     });
//   });
//
//   it('error', (done: DoneFn) => {
//     spyOn(service as any, 'setSession');
//
//     httpClientSpy.get.and.returnValue(throwError(() => '401'));
//     service.login('test', 'psw').subscribe({
//       error: (err) => {
//         expect((service as any).setSession).not.toHaveBeenCalled();
//         expect(err).toBe('401');
//         done();
//       },
//     });
//   });
// });
