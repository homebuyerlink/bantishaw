import { EditLawyerModule } from './edit-lawyer.module';

describe('EditLawyerModule', () => {
  let editLawyerModule: EditLawyerModule;

  beforeEach(() => {
    editLawyerModule = new EditLawyerModule();
  });

  it('should create an instance', () => {
    expect(editLawyerModule).toBeTruthy();
  });
});
