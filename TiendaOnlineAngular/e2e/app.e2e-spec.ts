import { TiendaOnlinePage } from './app.po';

describe('tienda-online App', function() {
  let page: TiendaOnlinePage;

  beforeEach(() => {
    page = new TiendaOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
