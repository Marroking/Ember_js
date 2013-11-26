var App = Ember.Application.create({

  ready: function()
  {
    //get initial data
    this.bootstrap = bootstrap;
  }
});

//Router
App.Router.map(function()
{
	this.resource('libros', function()
	{
		this.resource('libro', {path: ':libro_id'});
	}); // '/#/libros/:libro_id'

});

//Definimos la ruta index como redireccion a libros
App.IndexRoute = Ember.Route.extend({

  redirect: function(){
    this.transitionTo('libros');
  }

});

//en el caso de la ruta libros, no queremos ir al server a buscarlos (comportamiente por defecto)
//si no cargarlos de los datos del bootstrap ;)
App.LibrosRoute = Ember.Route.extend({
	model: function()
	{
		return App.bootstrap;
    //App.Libro.find();
  }
});

//Controlador de los libros, con funciones para filtrar/ordenar modelo de datos
App.LibrosController = Ember.ArrayController.extend(
{
  originalContent: [],
  sortProperties: ['titulo'],
  sortAscending: true,

  sortBy: function(sortField, sortOrder )
  {
    this.set('sortProperties',[sortField]);
    this.set('sortAscending',(sortOrder ==='asc'));
  },

  filterBy: function(letters)
  {
    if(letters === "")
    {
      this.set('content',this.get('originalContent'));
      return;
    }

    if(this.get('originalContent').length===0)
      this.set('originalContent',this.get('content'));

    //filtramos por regexp, i flag para ignore case (no distinguir lowercase/uppercase)
    var pattern = new RegExp(letters,'i');

    var newArray = this.get('originalContent').filter(function(item)
    {
      return ( pattern.test(item.autor) || pattern.test(item.titulo) );
    });

    this.set('content',newArray);

  }
});

//GUI
//pares controller / view 
//para la interfaz de buscar/filtrar

App.SortController = Ember.Controller.extend({

  sortBy: function(sortField, sortOrder){
    this.controllerFor('libros').sortyBy(sortField, sortOrder);
  }

});

App.SortView = Ember.View.extend({

  templateName: 'sort',
  change: function() {
    this.get('controller').send('sortBy', $('#sortField').val(), $('#sortOrder').val());
  }
});

App.FilterController = Ember.Controller.extend({

  filterBy: function(filter){

    this.controllerFor('libros').filterBy(filter);
  }

});

App.FilterView = Ember.View.extend({
  templateName: 'filter',
  keyUp: function() {
    this.get('controller').send('filterBy', $('#filterField').val());
  }
});



