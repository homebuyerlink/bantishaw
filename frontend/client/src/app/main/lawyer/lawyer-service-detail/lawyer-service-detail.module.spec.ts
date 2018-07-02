import { LawyerServiceDetailModule } from './lawyer-service-detail.module';

describe('LawyerServiceDetailModule', () => {
  let lawyerServiceDetailModule: LawyerServiceDetailModule;

  beforeEach(() => {
    lawyerServiceDetailModule = new LawyerServiceDetailModule();
  });

  it('should create an instance', () => {
    expect(lawyerServiceDetailModule).toBeTruthy();
  });
});
