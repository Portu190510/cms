var UserSource = {
    fetch: function() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                var mockup = [{
                    UserId: '123',
                    FirstName: 'Gomer',
                    LastName: 'Simpson',
                    Email: 'mail@gmail.com',
                    SignupSource: 'Facebook',
                    LastLoginDate: 'Today',
                    SignupDate: 'Today',
                    PublisherId: '234234'
                }, {
                    UserId: '124',
                    FirstName: 'Lisa',
                    LastName: 'Simpson',
                    Email: 'mail@gmail.com',
                    SignupSource: 'Facebook',
                    LastLoginDate: 'Today',
                    SignupDate: 'Today',
                    PublisherId: '234234'
                }]

                resolve(mockup);
            }, 250);
        });
    }
};

export default UserSource;