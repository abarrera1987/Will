function recarga() {
    $.ajax({
        url: "/recarga",
        method:'POST',
        data: {recargar: "nada"},
	    success: function (response) {
		    $("#taaa").html(response);
	        }
	    });
	}
	        	