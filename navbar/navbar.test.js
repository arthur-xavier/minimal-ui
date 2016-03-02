var Navbar = require('./navbar');
require('chai').should();

describe('Navbar', () => {

  before(() => {
    this.empty = new Navbar();
    this.single = new Navbar([
      { title: 'Hello', route: 'hello' }
    ]);
    this.generic = new Navbar([
      { title: 'Foo', route: 'foo' },
      { title: 'Bar', route: 'bar' },
      { title: 'Baz', route: 'baz' }
    ]);

    this.activeEmpty = new Navbar([], 'none');
    this.activeSingle = new Navbar([
      { title: 'Hello', route: 'hello' }
    ], 'hello');
    this.activeGeneric = new Navbar([
      { title: 'Foo', route: 'foo' },
      { title: 'Bar', route: 'bar' },
      { title: 'Baz', route: 'baz' }
    ], 'bar');
  });

  it('should have a create static method which instantiates a new Navbar', () => {
    Navbar.should.contain.keys('create');
    Navbar.create().constructor.should.equal(Navbar);
  });

  it('should have goto, toggle and render methods', () => {
    Navbar.prototype.should.contain.all.keys('goto', 'toggle', 'render');
  });

  it('should be collapsed when created', () => {
    this.generic.state.collapsed.should.equal(true);
  });

  it('should have menu items from constructor call', () => {
    this.empty.state.items.should.eql([]);
    this.single.state.items.should.eql([{ title: 'Hello', route: 'hello', active: false }]);
    this.generic.state.items.should.eql([
      { title: 'Foo', route: 'foo', active: false },
      { title: 'Bar', route: 'bar', active: false },
      { title: 'Baz', route: 'baz', active: false }
    ]);
    this.activeEmpty.state.items.should.eql([]);
    this.activeSingle.state.items.should.eql([{ title: 'Hello', route: 'hello', active: true }]);
    this.activeGeneric.state.items.should.eql([
      { title: 'Foo', route: 'foo', active: false },
      { title: 'Bar', route: 'bar', active: true },
      { title: 'Baz', route: 'baz', active: false }
    ]);
  });

  it('should toggle collapsed state', () => {
    this.generic.state.collapsed.should.equal(true);
    this.generic.toggle();
    this.generic.state.collapsed.should.equal(false);
    this.generic.toggle();
    this.generic.state.collapsed.should.equal(true);
  });

  it('should change the active property of an item when goto is called', () => {
    this.generic.state.items.should.eql([
      { title: 'Foo', route: 'foo', active: false },
      { title: 'Bar', route: 'bar', active: false },
      { title: 'Baz', route: 'baz', active: false }
    ]);
    this.generic.goto('baz');
    this.generic.state.items.should.eql([
      { title: 'Foo', route: 'foo', active: false },
      { title: 'Bar', route: 'bar', active: false },
      { title: 'Baz', route: 'baz', active: true }
    ]);
  });

  it('should call render when toggle is called', (done) => {
    this.generic.render = (state) => {
      state.collapsed.should.equal(false);
      done();
    };
    this.generic.toggle();
  });

  it('should call render when goto is called', (done) => {
    this.generic.render = (state) => {
      state.items.should.eql([
        { title: 'Foo', route: 'foo', active: true },
        { title: 'Bar', route: 'bar', active: false },
        { title: 'Baz', route: 'baz', active: false }
      ]);
      done();
    };
    this.generic.goto('foo');
  });
});
