// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Todos */

/** @namespace

 My cool new app.  Describe your application.

 @extends SC.Object
 */
Todos = SC.Application.create({
  store: SC.Store.create().from('Todos.RailsDataSource')
});

Todos.store.commitRecordsAutomatically = true;

Todos.Todo = SC.Record.extend({
  primaryKey: 'id',
  title: SC.Record.attr(String),
  isDone: SC.Record.attr(Boolean, { defaultValue: NO, key: "done" })
});

Todos.Todo.mixin({
  resourceName: 'todo',
  pluralResourceName: 'todos'
});

SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todo',
    templateName: 'todos'
  });
});

Todos.todoListController = SC.ArrayController.create({
  createTodo: function(title) {
    var todo = Todos.store.createRecord(Todos.Todo, {title: title});
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(function(todo) { todo.destroy(); });
  },

  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);
      return value;
    } else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});

Todos.CreateTodoView = SC.TemplateView.create(SC.TextFieldSupport, {
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Todos.todoListController.createTodo(value);
      this.set('value', '');
    }
  }
});

Todos.todoListView = SC.TemplateCollectionView.create({
  contentBinding: 'Todos.todoListController',

  itemView: SC.TemplateView.extend({
    // Add the 'done' class to this view
    // if the Todo object is marked isDone
    isDoneDidChange: function() {
      var isDone = this.getPath('content.isDone');

      this.$().toggleClass('done', isDone);
    }.observes('.content.isDone')
  })
});

Todos.CheckboxView = SC.TemplateView.extend(SC.CheckboxSupport, {
  valueBinding: '.parentView.content.isDone'
});

Todos.statsView = SC.TemplateView.create({
  remainingBinding: 'Todos.todoListController.remaining',

  displayRemaining: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining').cacheable()
});

Todos.clearCompletedView = SC.TemplateView.create({
  mouseUp: function() {
    Todos.todoListController.clearCompletedTodos();
  }
});

Todos.markAllDoneView = SC.TemplateView.create(SC.CheckboxSupport, {
  valueBinding: 'Todos.todoListController.allAreDone'
});
