import { EditServicesModule } from './edit-services.module';

describe('EditServicesModule', () => {
  let editServicesModule: EditServicesModule;

  beforeEach(() => {
    editServicesModule = new EditServicesModule();
  });

  it('should create an instance', () => {
    expect(editServicesModule).toBeTruthy();
  });
});
