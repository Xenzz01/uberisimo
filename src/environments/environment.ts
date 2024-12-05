// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyBsTka_ypJGbZbwLMm36rbwsLs1S1GHvQ4",
    authDomain: "uberisimo-6368f.firebaseapp.com",
    projectId: "uberisimo-6368f",
    storageBucket: "uberisimo-6368f.firebasestorage.app",
    messagingSenderId: "1088000895856",
    appId: "1:1088000895856:web:31ecfc587fc9c82535fdb5",
    measurementId: "G-T7H8E1SYDQ"
  },
  apiUrl: "https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
