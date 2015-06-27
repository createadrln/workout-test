angular
    .module('day')
    .controller("IndexController", function ($scope, $localStorage, supersonic) {
        $scope.showSpinner = true;

        $scope.initializeLocalDays = [
            {
                'id' : generateUUID(),
                'day' : 'Sunday',
                'brief_description' : '',
                'order' : 1,
                'workouts' : []
            },
            {
                'id' : generateUUID(),
                'day' : 'Monday',
                'brief_description' : '',
                'order' : 2,
                'workouts' : []
            },
            {
                'id' : generateUUID(),
                'day' : 'Tuesday',
                'brief_description' : '',
                'order' : 3,
                'workouts' : []
            },
            {
                'id' : generateUUID(),
                'day' : 'Wednesday',
                'brief_description' : '',
                'order' : 4,
                'workouts' : []
            },
            {
                'id' : generateUUID(),
                'day' : 'Thursday',
                'brief_description' : '',
                'order' : 5,
                'workouts' : []
            },
            {
                'id' : generateUUID(),
                'day' : 'Friday',
                'brief_description' : '',
                'order' : 6,
                'workouts' : []
            },
            {
                'id' : generateUUID(),
                'day' : 'Saturday',
                'brief_description' : '',
                'order' : 7,
                'workouts' : []
            }
        ];

        $scope.initializeLocalAutocompleteTags = [
            { text: 'Chest' },
            { text: 'Back' },
            { text: 'Legs' },
            { text: 'Core' },
            { text: 'Arms' },
            { text: 'Shoulders' },
            { text: 'Calves' },
            { text: 'Quads' },
            { text: 'Lats' },
            { text: 'Delts' },
            { text: 'Hamstrings' },
            { text: 'Traps' },
            { text: 'Forearms' }
        ];

        if ($localStorage.localDays) {
            $scope.localDays = $localStorage.localDays;
        } else {
            $localStorage.localDays = $scope.initializeLocalDays;
            $scope.localDays = $localStorage.localDays;
        }

        if ($localStorage.tags) {
            $scope.tags = $localStorage.tags;
        } else {
            $localStorage.tags = $scope.initializeLocalTags;
        }

        supersonic.data.channel('localDays').subscribe( function(localDays) {
            $scope.$apply(function() {
                $scope.localDays = localDays;
            });
        });

        $scope.localDays = $localStorage.localDays;
        $scope.showSpinner = false;

        var menuBtn = new supersonic.ui.NavigationBarButton({
            title: 'info',
            styleId: "info"
        });

        supersonic.ui.navigationBar.update({
            overrideBackButton: false
        }).then(supersonic.ui.navigationBar.show());


    });