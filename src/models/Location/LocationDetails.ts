export class LocationDetails {
  constructor(
    public id: number,
    public lat: string,
    public lon: string,
    public city: string,
    public country: string,
    public region?: string,
  ) {}
}
