/*global GRID_TEMPLATE */
angular.module('weeklyScheduler')
  .directive('weeklyGrid', [function () {

    function doGrid(element, attrs, model) {
      var i;
      // Calculate week width distribution
      var tickcount = model.nbHours;
      var ticksize = 100 / tickcount;
      var gridItemEl = GRID_TEMPLATE.css({width: ticksize + '%'});
      var now = model.minDate.clone();

      // Clean element
      element.empty();

      //First element
        var minutesAfterFirstHour = parseInt(now.clone().format('mm'));

        var tickSizeFirst = (60 - minutesAfterFirstHour)/60*ticksize;

        var gridItemFirst = GRID_TEMPLATE.clone().css({width: tickSizeFirst + '%'});
        var child = gridItemFirst.clone();
          if (angular.isUndefined(attrs.noText)) {
          }
        element.append(child);

      //Elements 2 to 13
      for (i = 1; i < tickcount; i++) {
        var child = gridItemEl.clone();
        if (angular.isUndefined(attrs.noText)) {
          child.text(now.add(i && 1, 'hours').format('H'));
        }
        element.append(child);
      }

      //Last element
      var minutesAfterFirstHour = parseInt(now.clone().format('mm'));

      var tickSizeLast = ticksize - tickSizeFirst;

      var gridItemLast = GRID_TEMPLATE.clone().css({width: tickSizeLast + '%'});
      var child = gridItemLast.clone();
        if (angular.isUndefined(attrs.noText)) {
          child.text(now.add(12 && 1, 'hours').format('H'));
        }
      element.append(child);

    }

    return {
      restrict: 'E',
      require: '^weeklyScheduler',
      link: function (scope, element, attrs, schedulerCtrl) {
        if (schedulerCtrl.config) {
          doGrid(element, attrs, schedulerCtrl.config);
        }
        schedulerCtrl.$modelChangeListeners.push(function (newModel) {
          doGrid(element, attrs, newModel);
        });
      }
    };
  }]);