import { FahrenheitConverterPipe } from './fahrenheit-converter.pipe';

describe('FahrenheitConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new FahrenheitConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
