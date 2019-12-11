(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    if (input) {
		data.status = "";    // Resets status if not null
		data.message = "";   // Resets message if not null
		
        var gr = new GlideRecord("x_412202_hello_wor_superhero");
        gr.initialize();

        var sName = input.super_name;
        var rName = input.real_name;
        var universe = input.universe;
        var home = input.home;
		var box = input.box;
		
        if (recordExists(sName)) {
            data.status = "error";
            data.message = "record exists";
            return false;
        }
		
        if (validNames(sName, rName, universe, home)) {
            gr.setValue('super_name', input.super_name);
            gr.setValue('real_name', input.real_name);
            gr.setValue('universe', input.universe.toUpperCase());
            gr.setValue('home', input.home);

            var newSuperSysID = gr.insert();
        } else {
            //data.status = "error";
            //data.message = "Please only enter letters";
            return false;
        }

        if (!gs.nil(newSuperSysID)) {
            data.status = "success";
            data.message = "You have successfully made a submition";
        } else {
            data.status = "error";
            data.message = "You done goofed";
        }


    }

    function validNames(s, r, u, h) {
        var sRegex = /^[A-Za-z ]+$/.test(s);
        var rRegex = /^[A-Za-z ]+$/.test(r);
        var hRegex = /^[A-Za-z ]+$/.test(h);
		var uRegex = /^[A-Za-z ]+$/.test(u);
		//gs.info("uRegex: " + uRegex);
        var uLower = u.toLowerCase();

        if (!sRegex || !rRegex || !hRegex || !uRegex) {
			data.status = "error";
            data.message = "Please only enter letters";
			return false;
        }
		
		if ((uLower != "dc") && (uLower != "marvel")){
			data.status = "error";
			data.message = "Please enter DC or Marvel for universe";
			//gs.info("Universe: " + uLower);
			return false;
		}
		
		return true;

    }

    function recordExists(name) {
        gs.info("record exists function");
        var gr = new GlideRecord("x_412202_hello_wor_superhero");
        gr.addQuery("super_name", name);
        gr.query();
        //gs.info(gr.hasNext());
        return gr.hasNext();

    }

})();