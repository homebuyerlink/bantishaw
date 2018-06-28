import { EditAgentModule } from './edit-agent.module';

describe('EditAgentModule', () => {
  let editAgentModule: EditAgentModule;

  beforeEach(() => {
    editAgentModule = new EditAgentModule();
  });

  it('should create an instance', () => {
    expect(editAgentModule).toBeTruthy();
  });
});
