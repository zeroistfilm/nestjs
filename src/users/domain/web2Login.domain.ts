export class Web2Login {
  id: number;
  email: string;
  gender: string;
  age: number;
  location: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
  name: string;
  constructor(
    name: string,
    emil: string,
    gender: string,
    age: number,
    location: string,
    provider: string,
    accessToken: string,
    refreshToken: string,
  ) {
    this.email = emil;
    this.provider = provider;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.gender = gender;
    this.age = age;
    this.location = location;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
