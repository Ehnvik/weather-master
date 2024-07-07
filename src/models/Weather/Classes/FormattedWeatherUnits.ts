export class FormattedWeatherUnits {
  constructor(
    public maxTemp: number,
    public minTemp: number,
    public windSpeed: number,
    public currentTemp: number,
    public feelsLike: number,
    public dewPoint: number,
    public visibility: number,
  ) {}
}
