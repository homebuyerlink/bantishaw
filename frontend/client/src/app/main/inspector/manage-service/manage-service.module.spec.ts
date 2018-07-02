import { ManageServiceModule } from './manage-service.module';

describe('ManageServiceModule', () => {
  let manageServiceModule: ManageServiceModule;

  beforeEach(() => {
    manageServiceModule = new ManageServiceModule();
  });

  it('should create an instance', () => {
    expect(manageServiceModule).toBeTruthy();
  });
});
