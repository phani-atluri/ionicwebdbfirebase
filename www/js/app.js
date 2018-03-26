// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todoapp', ['ionic', 'firebase'])

    .controller('todoctrl', function ($scope, $http, $firebaseObject, $firebaseArray) {
        $scope.model = {};
        $scope.todos = [];

        // bind to firebase
        $scope.initializeStorage = function () {
            sMd5 = CryptoJS.MD5($scope.model.uname + $scope.model.password + "topSecret");
            localStorage.setItem("sMD5", sMd5);
            $scope.sKey = localStorage.getItem("sMD5");
            $scope.initializeFirebase();
        }
        $scope.initializeFirebase = function () {
            var ref = new Firebase("https://march20prog8110.firebaseio.com/tasks/" + $scope.sKey + "/");
            $scope.firebasemessages = $firebaseObject(ref);

        }
        $scope.sKey = localStorage.getItem("sMD5");
        if ($scope.sKey != null) {
            $scope.initializeFirebase();
        }

        var dbSize = 5 * 1024 * 1024; // 5MB
        /// open database
        var db = openDatabase("Todo", "1", "Todo manager", dbSize);
        // create table for todos
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                "todo(ID TEXT PRIMARY KEY, todo TEXT, added_on DATETIME, finished_on DATETIME, deleted_on DATETIME)", [],
                function () {
                    console.log("success");
                    $scope.readTodos();
                },
                function () { console.log("failure") }
            );
        });

        $scope.addTodo = function () {
            //alert("In addTodo() with" + $scope.todoItem);

            //insert data into table
            db.transaction(function (tx) {
                var dToday = new Date();
                var sGuid = uuid.v4();
                tx.executeSql("INSERT INTO todo(ID, todo, added_on) VALUES(?, ?, ?) ",
                    [sGuid, $scope.model.todoItem, dToday],
                    function () {
                        console.log("successfully inserted");
                        $scope.model.todoItem = "";
                        $scope.readTodos();
                    },
                    function () {
                        console.log("failed");
                    }
                );
            });

        }
        $scope.readTodos = function () {
            db.transaction(function (tx) {
                tx.executeSql("SELECT * FROM todo ORDER BY strftime('%Y-%m-%d:%h:%m:%s', added_on)", [], function (tx, rs) {
                    $scope.todos = [];
                    for (var n = 0; n < rs.rows.length; n++) {
                        var sTodo = rs.rows.item(n).todo;
                        var sId = rs.rows.item(n).ID;
                        var sFinished = rs.rows.item(n).finished_on;
                        var sAdded = rs.rows.item(n).added_on;
                        var sDeleted = rs.rows.item(n).deleted_on;
                        if (!sDeleted) {
                            $scope.todos.push({
                                name: sTodo,
                                ID: sId, finished_on: sFinished
                            });

                        }
                        $scope.firebasemessages[sId] = { visited: true, todo: sTodo, added: sAdded, finished: sFinished, deleted: sDeleted };
                    }
                    //now we update websql from firebase
                    for (var n = 0; n < Object.keys($scope.firebasemessages).length; n++) {
                        var sKey = Object.keys($scope.firebasemessages)[n];
                        var oTodo = $scope.firebasemessages[sKey];
                        if (oTodo && oTodo.hasOwnProperty("todo") && !oTodo.visited) {
                            //then we need to insert from firebase to websql
                            db.transaction(function (tx) {
                                tx.executeSql("INSERT INTO todo(ID, todo, added_on, finished_on, deleted_on) VALUES(?, ?, ?, ?, ?)",
                                    [sKey, oTodo.todo, oTodo.added, oTodo.finished, oTodo.deleted], function () {
                                        console.log("successfully read");
                                        if (!sDeleted) {
                                            $scope.todos.push({
                                                name: oTodo.todo,
                                                ID: sKey, finished_on: oTodo.finished
                                            });
                                            $scope.$apply();

                                        }
                                    });
                            });
                        }
                        else if(oTodo){
                            delete oTodo.visited;
                        }
                    }
                    $scope.$apply();
                    $scope.firebasemessages.$save();

                },
                    function (err) {

                    });

            });
        }
        $scope.deleteTodo = function (id) {
            db.transaction(function (tx) {
                var dToday = new Date();
                tx.executeSql("UPDATE todo SET deleted_on = ? WHERE ID = ?",
                    [dToday, id],
                    function (tx) {
                        $scope.readTodos();
                    },
                    function (err) {
                        console.log(err);
                    });
            });
        }
        $scope.finishTodo = function (id) {
            db.transaction(function (tx) {
                var dToday = new Date();
                tx.executeSql("UPDATE todo SET finished_on = ? WHERE ID = ?",
                    [dToday, id],
                    function (tx) {
                        $scope.readTodos();
                    },
                    function (err) {
                        console.log(err);
                    });
            });

        }
        $scope.getClass = function (finished_on) {
            if (finished_on) {
                return ("close");
            } else {
                return ("open");
            }
        }

    })

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
