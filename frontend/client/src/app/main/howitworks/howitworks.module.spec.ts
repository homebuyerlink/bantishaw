import { HowitworksModule } from './howitworks.module';

describe('HowitworksModule', () => {
  let howitworksModule: HowitworksModule;

  beforeEach(() => {
    howitworksModule = new HowitworksModule();
  });

  it('should create an instance', () => {
    expect(howitworksModule).toBeTruthy();
  });
});
