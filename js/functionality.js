var descriptionClicked;
var nameClicked;
var cmsClicked;
var cms_list = ['', 'Raw PHP', 'Wordpress', 'Joomla'];
var rowClicked;


//Toggle add new site panel
$('.add_site').on('click', function() {

    $(this).children('div').toggle();

    $('.add_item_panel').slideToggle();

    removeValidations();
});

$('.close_panel').click(function(){ $('.add_site').trigger('click'); });



//Handle adding new site to database
$('.add_site_button').click(function() {

    removeValidations();

    var siteName = $('#inputSiteName').val();
    var description = $('#inputDescription').val();
    var cms = $('input[name="optionsRadios"]:checked').val();

    //console.log(cms);

    if(!siteName) {

        $('#inputSiteName').closest('.form-group').addClass('has-error');
        $('#inputSiteName').parent().append('<span class="text-danger error">Please enter a name</span>');
    }
    if(!description){

        $('#inputDescription').closest('.form-group').addClass('has-error')
        $('#inputDescription').parent().append('<span class="text-danger error">Please enter a description</span>');
    }

    var dataString = 'site_name='+siteName+'&description='+description+'&cms='+cms;

    if(siteName && description) {

        $('.add_site_form').trigger('submit', [siteName, description, cms]);
    }
});

$('.add_site_form').on('submit', function(e, newName, newDescription, cmsType) {

    e.preventDefault();

        var dataString = 'siteName='+newName+'&description=' + newDescription + '&cms=' + cmsType;
        $form = $(this);

        request = $.ajax({
            type: "POST",
            url: "./php/add_site.php",
            data: dataString
        });

        request.done(function (data) {

            $form.find('fieldset').append('<span class="text-success add_site_success col-lg-offset-2 col-md-offset-2 col-sm-offset-2">Site added successfully</span>');
            $('.add_site_clear').trigger('click');

            $('.sites_table').find('tbody').append('<tr>'
                                                   +    '<td>'
                                                   +        '<span class="site_name">'+newName+'</span>'
                                                   +        '<input type="hidden" name="id" value="'+data+'">'
                                                   +    '</td>'
                                                   +    '<td>'
                                                   +        '<span class="description">'+newDescription+'</span>'
                                                   +        '<input type="hidden" name="id" value="'+data+'">'
                                                   +    '</td>'
                                                   +    '<td>'
                                                   +        '<span class="cms">'+cms_list[cmsType]+'</span>'
                                                   +        '<input type="hidden" name="cmsId" value="'+cmsType+'">'
                                                   +    '</td>'
                                                   + '</tr>');

            console.log(data);
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });

});



//Active modal on row click
/*$('table').on('click', 'tr', function() {

    //clearModalSuccess();

    var id = $(this).find('.site_name').siblings('input[name="id"]').val();
    var siteName = $(this).find('.site_name').text();
    var description = $(this).find('.description').text();
    var cms = $(this).find('.cms').siblings('input[name="cmsId"]').val();

    //console.log(id + ' ' + siteName + ' ' + description + ' ' + cms);

    $('#edit_site_modal').modal();

    setModal(id, siteName, description, cms);
});*/



//Handle updating new site to database
$('#edit_site_modal').on('click', '.edit_modal_save', function() {

    //clearModalSuccess();

    var id = $('#modalId').val();
    var siteName = $('#editSiteName').val();
    var description = $('#editDescription').val();
    var cms = $('#selectCMS option:selected').val();

    //console.log(id + ' ' + siteName + ' ' + description + ' ' + cms);

    $('.edit_site_form').trigger('submit', [id, siteName, description, cms, "Update Site"]);
});

$('.edit_site_form').on('submit', function(e, id, newSiteName, newDescription, newCMS, data) {

    e.preventDefault();

    if(data === "Update Site") {

       var dataString = 'updateSite=yes&id=' + id + '&name=' + newSiteName + '&description=' + newDescription + '&cms=' + newCMS;

       request = $.ajax({
           type: "POST",
           url: "./php/update_site.php",
           data: dataString
       });

       request.done(function () {

           //$('#edit_site_modal .modal-body').prepend('<p class=" edit_success"><span class="text-success">Changed Successfully</span></p>');

           var $row = $('.sites_table tbody').find('input[name="id"][value="' + id + '"]').closest('tr');

           $row.find('.site_name').text(newSiteName);
           $row.find('.description').text(newDescription);
           $row.find('.cms').text(cms_list[newCMS]);
           $row.find('input[name="cmsId"]').val(newCMS);

           $('#edit_site_modal').modal('hide');

       });

       request.fail(function (jqXHR, textStatus, errorThrown) {

           alert("it failed!");
       });
   }
});




//Handle table row selections
$('.sites_table').on('click', '.primary_info', function() {

    var $row = $(this).next('.additional_info_row');
    var id = $(this).find('input[name="id"]').val();

    if(rowClicked != id) closeSelectedRow();

    if($row.hasClass('hide')) {

        $(this).addClass('selected');
        $row.find('.additional_info').slideDown({duration: 200, progress: $row.removeClass('hide'), ease: 'linear' });
        rowClicked = id;

    }
    else {

        $(this).removeClass('selected');
        $row.find('.additional_info').slideUp(200,"linear",function()
            {
                $row.addClass('hide');
            }
        );

        rowClicked = '';
    }

});




//Handle updating notes
$('.sites_table tbody').on('click', '.update_notes', function() {

    var id = rowClicked;
    var notes = $(this).parent('div').prev('div').find('textarea').val();
    console.log(notes);

    $('.edit_item').trigger('submit', [id, notes, "Update Notes"]);

});

$('.edit_item').on('submit', function(e, id, newNotes, data) {

    e.preventDefault();

    if(data == "Update Notes") {

        var dataString = 'updateNotes=yes&id=' + id + '&notes=' + newNotes;
        console.log(dataString);

        request = $.ajax({
            type: "POST",
            url: "./php/update_site.php",
            data: dataString
        });

        request.done(function () {

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });
    }
});

/*
//Handle site name editing
$('table').on('click', '.site_name', function() {

    var name = $(this).text();
    var id = $(this).siblings('input[name="id"]').val();
    //console.log(id);

    $('table').find('.site_name_cancel').trigger('click');

    if(!nameClicked) {

        nameClicked = name;

        var $input = '<div class="edit_site_name_form">'
            +		'<div class="form-group">'
            +			'<input type="text" name="site_name" class="form-control" value="'+name+'" autofocus>'
            +		'</div>'
            +       '<input type="hidden" name="id" value="'+ id +'">'
            +		'<button type="button" class="btn btn-sm btn-primary site_name_save">Save</button>'
            +		'<button type="button" class="site_name_cancel btn btn-sm btn-danger">Cancel</button>'
            +	'</div>';

        $(this).closest('td').html($input);
    }

});




//Handle description editing
$('table').on('click', '.description', function() {
		
	var description = $(this).text();
    var id = $(this).siblings('input[name="id"]').val();
    //console.log(id);
	
	$('table').find('.description_cancel').trigger('click');

	if(!descriptionClicked) {

		descriptionClicked = description;
	
		var $input = '<div class="edit_description_form">'
				+		'<div class="form-group">'
      		  	+			'<input type="text" name="description" class="form-control" value="'+description+'" autofocus>'
  			  	+		'</div>'
                +       '<input type="hidden" name="id" value="'+ id +'">'
  			  	+		'<button type="button" class="btn btn-sm btn-primary description_save">Save</button>'
  			  	+		'<button type="button" class="description_cancel btn btn-sm btn-danger">Cancel</button>'
  			  	+	'</div>';
		  	
		$(this).closest('td').html($input);
	}
	
});



//Handle cms editing
$('table').on('click', '.cms', function(){

    var cms = $(this).text();
    var id = $(this).siblings('input[name="id"]').val();
    //console.log(cms + ' ' + id);

    $('table').find('.cms_cancel').trigger('click');

    if(!cmsClicked) {

        cmsClicked = id;

        var $select = '<div class="edit_cms_form">'
                    +       '<select class="form-control" id="select">';
            $select += (cmsClicked == 1) ? '<option value="1" selected>Raw PHP</option>' : '<option value="1">Raw PHP</option>';
            $select += (cmsClicked == 2) ? '<option value="2" selected>Wordpress</option>' : '<option value="2">Wordpress</option>';
            $select += (cmsClicked == 3) ? '<option value="3" selected>Joomla</option>' : '<option value="3">Joomla</option>';
            $select +=       '</select>'
                    +		'<button type="button" class="btn btn-sm btn-primary cms_save">Save</button>'
                    +		'<button type="button" class="cms_cancel btn btn-sm btn-danger">Cancel</button>'
                    +   '</div>';

        $(this).closest('td').html($select);

    }
});





//Handle site name cancelling
$('table').on('click', '.site_name_cancel', function() {

    var id = $(this).siblings('input[name="id"]').val();
    $(this).closest('td').html('<span class="site_name">'+nameClicked+'</span>'
                                + '<input type="hidden" name="id" value="'+ id +'">');
    nameClicked = "";
});



//Handle saving site name to database
$('table').on('click', '.site_name_save', function() {

    var id = $(this).siblings('input[name="id"]').val();
    var name = $(this).siblings('.form-group').children('input[name="site_name"]').val();
    console.log(name);
    $('.edit_item').trigger('submit', [id, name, "site_name"]);
});

$('.edit_item').on('submit', function(e, id, newName, data) {

    e.preventDefault();

    if(data == "site_name") {

        var dataString = 'updateSiteName=yes&id=' + id + '&siteName=' + newName;
        $form = $(this);

        request = $.ajax({
            type: "POST",
            url: "./php/update_site.php",
            data: dataString
        });

        request.done(function () {

            nameClicked = "";
            var $update = $form.find('.edit_site_name_form').parent('td').html('<span class="site_name">' + newName + '</span>'
                                                                                + '<input type="hidden" name="id" value="' + id + '">')
            $update.append('<span class="success text-success fa fa-check" />');
            $update.find('.success').fadeOut(1000);
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });
    }

});




//Handle cms canceling
$('table').on('click', '.cms_cancel', function() {

    $(this).closest('td').html('<span class="cms">'+cms_list[cmsClicked]+'</span>'
                                + '<input type="hidden" name="id" value="'+ cmsClicked +'">');
    cmsClicked = "";
});


//Handle saving cms to database
$('table').on('click', '.cms_save', function() {

    var id = $(this).closest('tr').children('td').find('input[name="id"]').val();
    console.log(id);
    var cms = $(this).siblings('select').find('option:selected').val();
    $('.edit_item').trigger('submit', [id, cms, "cms"]);
});

$('.edit_item').on('submit', function(e, id, newCMS, data) {

    e.preventDefault();

    if(data == 'cms') {

        var dataString = 'updateCMS=yes&id=' + id + '&cms=' + newCMS;
        $form = $(this);

        request = $.ajax({
            type: "POST",
            url: "./php/update_site.php",
            data: dataString
        });

        request.done(function () {

            cmsClicked = "";
            var $update = $form.find('.edit_cms_form').parent('td').html('<span class="cms">' + cms_list[newCMS] + '</span>'
                                                                        + '<input type="hidden" name="id" value="' + id + '">')
            $update.append('<span class="success text-success fa fa-check" />');
            $update.find('.success').fadeOut(1000);
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });
    }

});






//Handle description cancelling
$('table').on('click', '.description_cancel', function() {

    var id = $(this).siblings('input[name="id"]').val();
	$(this).closest('td').html('<span class="description">'+descriptionClicked+'</span>'
                                + '<input type="hidden" name="id" value="'+ id +'">');
	descriptionClicked = "";
});



//Handle saving description to database
$('table').on('click', '.description_save', function() {

    var id = $(this).siblings('input[name="id"]').val();
    var description = $(this).siblings('.form-group').children('input[name="description"]').val();
    console.log(description);
    $('.edit_item').trigger('submit', [id, description, "description"]);
});

$('.edit_item').on('submit', function(e, id, newDescription, data) {

    e.preventDefault();

    if(data == "description") {

        var dataString = 'updateDescription=yes&id=' + id + '&description=' + newDescription;
        $form = $(this);

        request = $.ajax({
            type: "POST",
            url: "./php/update_site.php",
            data: dataString
        });

        request.done(function () {

            descriptionClicked = "";
            var $update = $form.find('.edit_description_form').parent('td').html('<span class="description">' + newDescription + '</span>'
                                                                                + '<input type="hidden" name="id" value="' + id + '">')
            $update.append('<span class="success text-success fa fa-check" />');
            $update.find('.success').fadeOut(1000);
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });
    }

});
*/

//Auxillary Functions
function removeValidations() {

    $('.add_item_panel').find('.has-error').each(function() {

        $(this).removeClass('has-error');
        $(this).find('.error').remove();
    });

    $('.add_item_panel').find('.add_site_success').remove();
};

function setModal(id, siteName, description, cms) {

    $('#modalId').val(id);
    $('#editSiteName').val(siteName);
    $('#editDescription').val(description);
    $('#selectCMS option[value="'+cms+'"]').attr('selected', true);
};

function closeSelectedRow() {

    $('.sites_table .selected').trigger('click');
}

/*function clearModalSuccess() {

    $('#edit_site_modal').find('.edit_success').remove();
};*/