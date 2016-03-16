(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FormsController", FormsController);

    function FormsController($rootScope, $scope, FormService){
        $scope.forms = FormService.forms;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            FormService.createFormForUser($rootScope.currentUser._id, { title: $scope.formTitle }).then(function(res){
                $scope.formTitle = null;
            });
        }

        function updateForm() {
            $scope.selectedForm.title = $scope.formTitle;
            FormService.updateFormById($scope.selectedForm._id, $scope.selectedForm).then(function(res){
                $scope.selectedForm = null;
                $scope.formTitle = null;
            });
        }

        function deleteForm(index) {
            FormService.deleteFormById(FormService.forms[index]._id).then(function(res){
                $scope.selectedForm = null;
                $scope.formTitle = null;
            });
        }

        function selectForm(index) {
            $scope.selectedForm = $.extend(true, {}, FormService.forms[index]);
            $scope.formTitle = $scope.selectedForm.title;
        }
    }
})();