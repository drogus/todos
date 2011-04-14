Todos.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application
  // visible
  // on screen.  If you app gets any level of complexity, you will
  // probably
  // create multiple pages and panes.

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: Todos.contactsController.set('content',Todos.contacts);

  var query = SC.Query.local(Todos.Todo, { orderBy: 'isDone,title' });
//  var query = Todos.Todo;
  var todos = Todos.store.find(query);
  Todos.todoListController.set('content', todos);
};

function main() { Todos.main();}


