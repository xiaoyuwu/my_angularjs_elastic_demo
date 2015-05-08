'use strict'

var elasticDemoControllers=angular.module('elasticDemoControllers', ['elasticsearch']);

elasticDemoControllers.controller('LinesCtrl', ['$scope','esClient', 'esService',
	function($scope, esClient, esService){
        $scope.query='';
		esClient.cluster.health(function (err, resp) {
                if (err) {
                    $scope.data = err.message;
                } else {
                    $scope.data = resp;
                }
            });

        $scope.esSearch = function(query){
            esService.search(query).then(function(data){
                $scope.data=data;
            })
        }
}]);

elasticDemoControllers.factory('esClient', function(esFactory){
    return esFactory({
        host:'localhost:9200',
        log:'trace'
    });
});

elasticDemoControllers.service('esService',function(esClient,$q){
    var elSearch={
        search: function(query){
            var deferred=$q.defer();
            esClient.search({
                index:"my_nomon",
                q:query
            },function(err, resp){
                if(err){
                    deferred.reject(err.message);
                }else{
                    deferred.resolve(resp.hits.total);
                }
            });
            return deferred.promise;
        }
    };
    return elSearch;
})