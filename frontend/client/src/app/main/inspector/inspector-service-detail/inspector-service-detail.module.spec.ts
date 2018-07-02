import { InspectorServiceDetailModule } from './inspector-service-detail.module';

describe('InspectorServiceDetailModule', () => {
  let inspectorServiceDetailModule: InspectorServiceDetailModule;

  beforeEach(() => {
    inspectorServiceDetailModule = new InspectorServiceDetailModule();
  });

  it('should create an instance', () => {
    expect(inspectorServiceDetailModule).toBeTruthy();
  });
});
