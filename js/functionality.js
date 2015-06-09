var descriptionClicked;
var nameClicked;
var cmsClicked;
var cms_list = ['', 'Raw PHP', 'Wordpress', 'Joomla'];
var type_list = ['', 'Restaurant', 'Legal', 'Services', 'eCommerce', 'Charity', 'Celebrity', 'Real Estate', 'Food', 'Advertising', 'Insurance', 'Beauty', 'Technology'];
var typeClicked;
var urlClicked;
var devUrlclicked;
var rowClicked;


//Toggle add new site panel
$('.add_site').on('click', function() {

    $(this).children('div').toggle();

    $('.add_item_panel').slideToggle( {done: removeValidations()} );
});

$('.close_panel').click(function(){ $('.add_site').trigger('click'); });



//Handle adding new site to database
$('.add_site_button').click(function() {

    removeValidations();

    var siteName = $('#inputSiteName').val();
    var description = $('#inputDescription').val();
    var url = $('#inputSiteUrl').val();
    var devUrl = $('#inputDevUrl').val();
    var type = $('#selectType option:selected').val();
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

        $('.add_site_form').trigger('submit', [siteName, description, cms, url, devUrl, type]);
    }
});

$('.add_site_form').on('submit', function(e, newName, newDescription, cmsType, newUrl, newDevUrl, newType) {

    e.preventDefault();

        var dataString = 'siteName='+newName+'&description='+newDescription+'&cms='+cmsType+'&url='+newUrl+'&devUrl='+newDevUrl+'&type='+newType;
        $form = $(this);

        console.log(dataString);

        request = $.ajax({
            type: "POST",
            url: "./php/add_site.php",
            data: dataString
        });

        request.done(function (data) {

            $form.find('fieldset').append('<span class="text-success add_site_success col-lg-offset-2 col-md-offset-2 col-sm-offset-2">Site added successfully</span>');
            $('.add_site_clear').trigger('click');

            $('.sites_table').find('tbody').append('<tr class="primary_info">'
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
                                                   + '</tr>'
                                                   + '<tr class="hide additional_info_row">'
                                                   +     '<td colspan="3">'
                                                   +        '<div class="additional_info">'
                                                   +            '<div class="col-lg-4 col-md-4 col-sm-6 details">'
                                                   +                '<span class="category"><span class="bold">Type : </span>'+type_list[newType]+'</span>'
                                                   +                '<input type="hidden" name="typeId" value="'+newType+'"">'
                                                   +                '<br>'
                                                   +                '<span class="site_url"><span class="bold">URL : </span><a href="'+newUrl+'" target="_blank">'+newUrl+'</a></span>'
                                                   +                '<br>'
                                                   +                '<span class="dev_url"><span class="bold">Dev URL : </span><a href="'+newDevUrl+'" target="_blank">'+newDevUrl+'</a></span>'
                                                   +                '<hr>'
                                                   +            '</div>'
                                                   +            '<div class="col-lg-8 col-md-8 col-sm-6 site_notes">'
                                                   +                '<div class="form-group">'
                                                   +                    '<label class="bold" for="textArea" control-label">Notes</label>'
                                                   +                    '<div>'
                                                   +                        '<textarea class="form-control" rows="3"></textarea>'
                                                   +                    '</div>'
                                                   +                    '<div class="pull-left">'
                                                   +                        '<button class="btn btn-primary btn-sm update_notes" type="button">Update</button>'
                                                   +                    '</div>'
                                                   +                '</div>'
                                                   +            '</div>'
                                                   +            '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'
                                                   +                '<hr>'
                                                   +                '<div class="edit_delete">'
                                                   +                    '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'
                                                   +                        '<button class="btn btn-block btn-default edit_site_btn" type="button">'
                                                   +                            '<span class="fa fa-pencil-square-o text-warning"> </span> '
                                                   +                            '<span class="bold">Edit</span>'
                                                   +                        '</button>'
                                                   +                    '</div>'
                                                   +                    '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">'
                                                   +                        '<button class="btn btn-block btn-default delete_site_btn" type="button">'
                                                   +                            '<span class="fa fa-trash-o text-danger"> </span> '
                                                   +                            '<span class="bold">Delete</span>'
                                                   +                        '</button>'
                                                   +                    '</div>'
                                                   +                '</div>'
                                                   +            '</div>'
                                                   +        '</div>'
                                                   +     '</td>'
                                                   +  '</tr>');

            console.log(data);
        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });

});



//Handle deleting row
$('table').on('click', '.delete_site_btn', function() {

    //clearModalSuccess();

    var id = rowClicked;;

    //console.log(id + ' ' + siteName + ' ' + description + ' ' + cms);

    $('.edit_item').trigger('submit', [id, "deleteSite"])
});

$('.edit_item').on('submit', function(e, id, data) {

    e.preventDefault();

   if(data == "deleteSite") {

       var dataString = 'deleteSite=yes&id=' + id;

       var ok = confirm("Are you sure you want to delete '" + nameClicked.text() + "'");

        if(ok) {

            request = $.ajax({
                type: "POST",
                url: "./php/update_site.php",
                data: dataString
            });

            request.done(function () {

                //$('#edit_site_modal .modal-body').prepend('<p class=" edit_success"><span class="text-success">Changed Successfully</span></p>');

                $('.sites_table tbody').find('.selected').next('.additional_info_row').remove();
                $('.sites_table tbody').find('.selected').remove();

                rowClicked = '';
                nameClicked = '';
                descriptionClicked = '';
                cmsClicked = '';


            });

            request.fail(function (jqXHR, textStatus, errorThrown) {

                alert("it failed!");
            });
        }
   }
});



//Activate modal on edit button click
$('table').on('click', '.edit_site_btn', function() {

    //clearModalSuccess();

    var id = rowClicked;
    var siteName = nameClicked.text();
    var description = descriptionClicked.text();
    var cms = cmsClicked.val();
    var type = typeClicked.val();
    var siteUrl = urlClicked.text();
    var devUrl = devUrlClicked.text();

    console.log(id + ' ' + siteName + ' ' + description + ' ' + cms + ' ' + type + ' ' + siteUrl + ' ' + devUrl);

    $('#edit_site_modal').modal();

    setModal(id, siteName, description, cms, type, siteUrl, devUrl);
});



//Handle updating new site to database
$('#edit_site_modal').on('click', '.edit_modal_save', function() {

    //clearModalSuccess();

    var siteName = $('#editSiteName').val();
    var description = $('#editDescription').val();

    //console.log(cms);

    if(!siteName) {

        $('#editSiteName').closest('.form-group').addClass('has-error');
        $('#editSiteName').parent().append('<span class="text-danger error">Please enter a name</span>');
    }
    if(!description){

        $('#editDescription').closest('.form-group').addClass('has-error')
        $('#editDescription').parent().append('<span class="text-danger error">Please enter a description</span>');
    }

    if(siteName && description) {

        var id = $('#modalId').val();
        var siteName = $('#editSiteName').val();
        var description = $('#editDescription').val();
        var cms = $('#selectCMS option:selected').val();
        var type = $('#editSelectType option:selected').val();
        var siteUrl = $('#editSiteUrl').val();
        var devUrl = $('#editSiteDevUrl').val();


        console.log(id + ' ' + siteName + ' ' + description + ' ' + cms + ' ' + type);

        $('.edit_site_form').trigger('submit', [id, siteName, description, cms, type, siteUrl, devUrl, "Update Site"]);
    }
});

$('.edit_site_form').on('submit', function(e, id, newSiteName, newDescription, newCMS, newType, newSiteUrl, newDevUrl, data) {

    e.preventDefault();

    if(data == "Update Site") {

       var dataString = 'updateSite=yes&id='+id+'&name='+newSiteName+'&description='+newDescription+'&siteUrl='+newSiteUrl+'&devUrl='+newDevUrl+'&cms='+newCMS+'&type='+newType;

        console.log(dataString);

       request = $.ajax({
           type: "POST",
           url: "./php/update_site.php",
           data: dataString
       });

       request.done(function () {

           //$('#edit_site_modal .modal-body').prepend('<p class=" edit_success"><span class="text-success">Changed Successfully</span></p>');

           var $row = $('.sites_table tbody').find('.selected');

           $row.find('.site_name').text(newSiteName);
           $row.find('.description').text(newDescription);
           $row.find('.cms').text(cms_list[newCMS]);
           $row.find('input[name="cmsId"]').val(newCMS);

           $row.next('.additional_info_row').find('.category').html('<span class="bold">Type : </span>' + type_list[newType]);

           var $url = $row.next('.additional_info_row').find('.site_url').find('a');
           $url.attr('href', newSiteUrl);
           $url.text(' ' + newSiteUrl);

           var $devUrl = $row.next('.additional_info_row').find('.dev_url').find('a');
           $devUrl.attr('href', newDevUrl);
           $devUrl.text(' ' + newDevUrl);

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
        nameClicked = $(this).find('.site_name');
        descriptionClicked = $(this).find('.description');
        cmsClicked = $(this).find('input[name="cmsId"]');
        typeClicked = $(this).next('.additional_info_row').find('input[name="typeId"]');
        urlClicked = $(this).next('.additional_info_row').find('.site_url').find('a');
        devUrlClicked = $(this).next('.additional_info_row').find('.dev_url').find('a');

        console.log(rowClicked + ' ' + nameClicked + ' ' + descriptionClicked + ' ' + cmsClicked + ' ' + urlClicked);

    }
    else {

        $(this).removeClass('selected');
        $row.find('.additional_info').slideUp(200,"linear",function()
            {
                $row.addClass('hide');
            }
        );

        rowClicked = '';
        nameClicked = '';
        descriptionClicked = '';
        cmsClicked = '';
        typeClicked = '';
        urlClicked = '';
        devUrlclicked = '';
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

            $('.sites_table tbody').find('.selected').next('.additional_info_row').find('.site_notes')
                .append('<div class="pull-left notes_success"><span class="text-success fa fa-check-circle"></span></div>');

            $('.notes_success').fadeOut('slow', function() { $(this).remove(); });

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            alert("it failed!");
        });
    }
});

$('#searchSite').keyup(function() {

    var dataString = 'search='+$(this).val();

    request = $.ajax({
        type: "GET",
        url: "./php/search_site.php",
        data: dataString
    });

    request.done(function (data) {

        $('.sites_table tbody').html(data);
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {

        alert("it failed!");
    });
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

function setModal(id, siteName, description, cms, type, siteUrl, devUrl) {

    $('#modalId').val(id);
    $('#editSiteName').val(siteName);
    $('#editDescription').val(description);
    $('#editSiteUrl').val(siteUrl);
    $('#editSiteDevUrl').val(devUrl);
    $('#selectCMS option[value="'+cms+'"]').attr('selected', true);
    $('#editSelectType option[value="'+type+'"]').attr('selected', true);

    $('#myModalLabel').text(siteName);
};

function closeSelectedRow() {

    $('.sites_table .selected').trigger('click');
}

/*function clearModalSuccess() {

    $('#edit_site_modal').find('.edit_success').remove();
};*/