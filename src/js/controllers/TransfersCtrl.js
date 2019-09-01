angular.module('peachTreeBank')
.controller('TransfersCtrl', [
    '$scope', '$http', 'orderByFilter',
    function($scope, $http, orderBy) {

        var transactions,
            mockMerchantLogo = 'https://via.placeholder.com/100x100';

        $scope.user = {
            account : 'Free Checking(4692)',
            balance : 5824.76
        };

        $scope.propertyName = 'transactionDate';
        $scope.reverse = true;

        $http.get('transactions.json').then(function(data) {
            $scope.transactions = data.data.data;
            //Update the amount string with a float cast
            $scope.transactions.forEach(item => item.amount = parseFloat(item.amount));
            transactions = $scope.transactions;
        });

        $scope.sortBy = function(propertyName) {
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
                ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            transactions = $scope.transactions;
            $scope.transactions = orderBy(transactions, $scope.propertyName, $scope.reverse);
        };

        $scope.transferAction = function(destinatary, amountToSend) {
            var newTransaction = { amount: amountToSend, 
                categoryCode: '#c12020',
                merchant: destinatary,
                merchantLogo:  mockMerchantLogo,
                transactionDate: new Date().getTime(),
                transactionType: "Online Transfer"
            }
            $scope.transactions.unshift(newTransaction),
            $scope.user.balance -= amountToSend,
            $scope.destinatary = '',
            $scope.amountToSend = '';
        };

        $scope.maxLengthCheck = function (amountToSend) {
            if (amountToSend >= 500) {
                $scope.amountToSend = 500;
            }
        }
    }
]);
