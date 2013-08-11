<%= typescriptAppName %>.factory('<%= tsAngularName %>', function($q) {
  return new <%= tsClassName %>($q);
});

class <%= tsClassName %> {
  constructor(private $q: ng.IQService) {
  }

  public getSomeData(): ng.IPromise<string[]> {
    return this.$q.when(["bananas", "pears", "oranges"]);
  }
}
