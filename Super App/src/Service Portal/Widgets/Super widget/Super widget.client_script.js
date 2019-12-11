function($timeout, $location, $scope) {
    /* widget controller */
    var c = this;
    //console.log("I have started");
    var boxChecked = c.box;
    var rName = c.real_name;
    c.onLoad = function() {
        c.data.rName = "Test";

    }

    console.log(rName);

    c.toggle = function() {
        alert("I am toggled. That's my " + c.box);
        c.data.real_name = "test";
    }


    c.submitForm = function(isValid) {
        //console.log("You clicked submit");
        isValid = true;

        var sName = c.super_name;
        var rName = c.real_name;
        var universe = c.universe;
        var home = c.home;
        var box = c.box;


        if (!sName || !rName || !universe || !home) {
            isValid = false;
            console.log('Fill in all fields');
        }

        c.submitted = true;

        if (!isValid) {
            //console.log("Not valid");
            return;
        }

        c.data.super_name = c.super_name;
        c.data.real_name = c.real_name;
        c.data.universe = c.universe;
        c.data.home = c.home;
        c.data.box = c.box;



        //console.log("i am about to update");

        c.server.update().then(function(response) {
            if (response.status == 'success') {
                c.message = null;
                c.success = response.message;

                $timeout(function() {
                    $location.search({
                        id: 'superheroes'
                    });
                }, 5000);
            } else if (response.status == 'error') {
                c.message = response.message;
            }
        });
    };
}