import { routes } from '@/router/routes';
import { expect } from 'chai';

describe('router/routes', () => {
  it('should have the appropriate routes', () => {
    expect(routes.length).to.equal(6);
    
    expect(routes[0].name).to.equal('timer');
    expect(routes[1].name).to.equal('edittimerform');
    expect(routes[2].name).to.equal('addtimerform');
    expect(routes[3].name).to.equal('statistics');
    expect(routes[4].name).to.equal('settings');
    expect(routes[5].path).to.equal('*');
  });
});
