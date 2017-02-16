import { TestAppPage } from './app.po';

describe('angularhunt App', function() {
  let page: AngularHuntPage;

  beforeEach(() => {
    page = new AngularHuntPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
