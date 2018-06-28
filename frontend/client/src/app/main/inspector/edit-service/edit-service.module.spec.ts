import { EditServiceModule } from './edit-service.module';

describe('EditServiceModule', () => {
  let editServiceModule: EditServiceModule;

  beforeEach(() => {
    editServiceModule = new EditServiceModule();
  });

  it('should create an instance', () => {
    expect(editServiceModule).toBeTruthy();
  });
});
