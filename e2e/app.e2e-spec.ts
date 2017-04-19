import { NgrxOddsPage } from './app.po';

describe('ngrx-odds App', () => {
  let page: NgrxOddsPage;

  beforeEach(() => {
    page = new NgrxOddsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
