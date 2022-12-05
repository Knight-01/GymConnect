// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBxrnXgGKQwrakulaaQnw97AvpKYi_1FZU",
    authDomain: "gymconnect-4a5b0.firebaseapp.com",
    projectId: "gymconnect-4a5b0",
    storageBucket: "gymconnect-4a5b0.appspot.com",
    messagingSenderId: "693095167116",
    appId: "1:693095167116:web:ab77995717122bc7a477a9"
  },
  apiUrl: 'https://localhost:5001/api/',
  hubUrl: 'https://localhost:5001/hubs/',
  apiInfoUrl: 'https://ipinfo.io?token=b91cc14ac4eaa6'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
