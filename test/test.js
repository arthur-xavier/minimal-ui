var ui = require('../');
require('chai').should();

describe('minimal-ui', function() {
  it('should have navbar', function() {
    ui.should.contain.keys('Navbar');
  });
});

require('../navbar/navbar.test');
