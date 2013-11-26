// Models
App.Store = DS.Store.extend({
  revision: 11
  //,
  //adapter: 'DS.FixtureAdapter'
});

DS.RESTAdapter.reopen({
  namespace: 'blog/posts/ember-js/data'
});

App.Libro = DS.Model.extend({
  autor: DS.attr('string'),
  titulo: DS.attr('string'),
  editorial: DS.attr('string'),
  img: DS.attr('string'),
  descripcion: DS.attr('string')
});