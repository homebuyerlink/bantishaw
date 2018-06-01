import { PostadModule } from './postad.module';

describe('PostadModule', () => {
  let postadModule: PostadModule;

  beforeEach(() => {
    postadModule = new PostadModule();
  });

  it('should create an instance', () => {
    expect(postadModule).toBeTruthy();
  });
});
