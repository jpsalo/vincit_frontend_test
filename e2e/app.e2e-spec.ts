import { VincitPage } from './app.po';

describe('vincit App', function() {
  let page: VincitPage;

  beforeEach(() => {
    page = new VincitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
