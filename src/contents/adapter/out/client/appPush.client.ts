import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { HttpService } from '@nestjs/axios'; // access token 발행시 사용

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

@Injectable()
export class AppPushClient {
  constructor() {}

  async sendPushNotification() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDWhIo5wqqKH3CkQG3h5wB5jQ7Zym7nipM',
      authDomain: 'dropbase-999ec.firebaseapp.com',
      projectId: 'dropbase-999ec',
      storageBucket: 'dropbase-999ec.appspot.com',
      messagingSenderId: '342457071183',
      appId: '1:342457071183:web:48393eee47bc4e52529c3a',
      measurementId: 'G-7MZH0B8L2W',
    };
    const app = initializeApp(firebaseConfig);
    //const analytics = getAnalytics(app);
    const messaging = getMessaging(app);
    getToken(messaging, {
      vapidKey: 'BCyny26omrOxml5fNF0Z3w8POJHvYwXjP9BODjXs5m2prSzbhrzxfNauB9gbr8-TSw4S-2kiakrW8y1iPICRJF8',
    });
  }
}
