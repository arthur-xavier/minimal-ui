(function() {
  'use strict';

  var _module = typeof module === 'object' && module || {};
  var _window = typeof window === 'object' && window || {};

  var Navbar = function(items, route) {
    items = items || [];
    route = route || '';
    this.state = {
      collapsed: true,
      items: items.map(function(i) {
        return { title: i.title, route: i.route, active: route && i.route === route ? true : false };
      })
    };
    this.render(this.state);
    return this;
  };
  Navbar.create = function(items, route) {
    return new Navbar(items, route);
  };
  Navbar.prototype.toggle = function() {
    this.state = { collapsed: !this.state.collapsed, items: this.state.items };
    this.render(this.state);
    return this;
  };
  Navbar.prototype.goto = function(route) {
    this.state = {
      collapsed: this.state.collapsed,
      items: this.state.items.map(function(i) {
        return { title: i.title, route: i.route, active: route && i.route === route ? true : false};
      })
    };
    this.render(this.state);
  };
  Navbar.prototype.render = function(/* state */) {};

  _module.exports = Navbar;
  _window.Navbar = Navbar;
  return Navbar;
})();
