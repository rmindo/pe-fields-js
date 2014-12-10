(function ($) {


    /**
     * Thumbnails
     * @since: 1.0
     */
	thumbnails = function( field ){
		$( '.thumb_button .thumb', field ).click(function () {
			var id = $(this).closest('.thumb_button').attr('id');
			$( '#' + id + ' .thumb' ).removeClass( 'active' );
			$(this).addClass( 'active' );
		});
	}



    /**
     * Textarea
     * @since: 1.0
     */
	textarea = function( field ){
		$( '.textarea', field ).on('keyup', function () {
			content = $(this).val().replace(/\n/g, '<br>');
			$(this).parent().find('.hiddentext').html(content + '<br>');
			$(this).parent().animate({height: $(this).parent().find('.hiddentext').outerHeight()}, 200);
		});

		$( '.textarea', field ).each(function(){
			$(this).parent().height( $(this).prop('scrollHeight') + 20 );
		});
	}



    /**
     * Toggle Switch
     * @since: 1.0
     */
	toggle_switch = function( field ){

		$( '.sToggle label', field ).click(function() {
			var id = $(this).attr('id');

			$(this).css({right: '0'}).addClass('active')
			.removeClass('inactive').siblings().removeClass('active')
			.css({left: '0'}).addClass('inactive').removeClass('active');

			/* If there's a content need to hide/show during the events */
			var show = $(this).parent().data('show');
			var hide = $(this).parent().data('hide');
			if($(this).find('input').val() == 'on'){
				$(show).fadeIn('fast');
				$(hide).fadeOut('fast');
			} else {
				$(show).fadeOut('fast');
				$(hide).fadeIn('fast');
			}
		});
	}




    /**
     * Checkbox
     * @since: 1.0
     */
	checkbox = function( field ){
		/* CHECKBOX */
		$( '.checkbox input', field ).live('click', function () {
			$(this).closest('label').toggleClass('active');

			/* If there's a content need to hide/show during the events */
			var toggle = $(this).data('toggle-content').split(', ');
			for ( i=0; i < toggle.length; i++ ){
				if($(this).closest('label').hasClass('active')){
					$(toggle[i]).fadeIn('fast');
				} else {
					$(toggle[i]).fadeOut('fast');
				}
			}
		});
	}



    /**
     * Select Option
     * @since: 1.0
     */
    select_option = function( field ){

        $( '.inputs option:selected', field ).each(function () {
            var selected = $(this).text();

            $(this).closest('.inputs').find( '#select_page' ).each(function () {
                if( $(this).is(':checked') ){
                    $(this).closest('.inputs').find('.preview h4').text(selected);
                }
            });
        });
    }


    /**
     * Radio Button
     * @since: 1.0
     */
    radio_button = function( field ) {

        $( '.radio_button label', field ).live('click', function() {
            var tae = $(this).attr('id');
            $(this).addClass('active').siblings().removeClass('active');

            $(this).find('input').attr('checked', 'checked')
                .closest('label').siblings().find('input').removeAttr('checked');

            /* If there's a content need to hide/show during the event */
            $(this).closest('.radio_button').siblings('.select_option' ).each(function(){
                $(this).find('#' + tae).siblings().removeClass('active');
                $(this).find('#' + tae).addClass('active');
            });

            var id = tae.replace(/[^\d.,]+/,'');
            var only = $(this).data('hide');

            if( typeof only !== 'undefined' ){
                $( '.wrap_all#' + only + '-' +id ).addClass('active');
            } else {
                $( '#inputs-' + id + ' .wrap_all' ).removeClass('active');
            }
        });


        $( '.radio_button label', field ).each(function(){
            var id = $(this).attr('id');
            if( $(this).hasClass('active') ){
                $( '.select_option #' + id ).addClass('active');
            }
        });
    }



    /**
     * Tool Tip
     * @since: 1.0
     */
	tool_tip = function( field ){
		$('*', field ).hover(function(){
			if($(this).attr('title') !== undefined ) {
				/* When Hover */
				var title = $(this).attr('title');
				$(this).data('text', title).removeAttr('title');
				$('<span class="tool_tip"><i class="tip"></i><span>'+title+'</span></span>').appendTo('body');
			}
		}).mouseleave(function(){
				/* When Mouse Leave */
				$(this).attr('title', $(this).data('text'));
				$('.tool_tip').remove();
		}).mousemove(function(e) {
				var X = e.pageX + 20;
				var Y = e.pageY - 10;
				$('.tool_tip').css({ top: Y, left: X });
		});
	}



    /**
     * Color Picker
     * @since: 1.0
     */
	color_picker = function( field ) {
		$( '.color_picker .color', field ).wpColorPicker();
		$( '.wp-picker-clear', field ).remove();
		$( '.wp-color-result', field ).removeAttr('title');
		$( '.wp-color-result', field ).removeAttr('data-current');
	}




	/**
	 * Pop Up Box
	 * @since: 1.0
	*/
	pop_up_box = function( box ){

		var winWidth  = $(window).width();
		var winHeight = $(window).height();

		var boxWidth  = box.width();
		var boxHeight = box.height();

		var boxTop  = winHeight - boxHeight;
		var boxLeft = winWidth - boxWidth;

		box.css({
			'top'		: boxTop/2,
			'left'		: boxLeft/2,
			'width'		: boxWidth,
			'z-index'	: 99999,
			'position'	: 'fixed',
			'box-shadow'	: '0 0 0 5px rgba(0,0,0,0.03)'
		}).addClass('pop').show();

		if( box.siblings('.mask').length == 0 ) {
			box.after($('<div class="mask" />').css({
				'top' 		: 0,
				'left'  	: 0,
				'z-index'	: 9999,
				'opacity'	: 0.6,
				'width'		: '100%',
				'height'	: '100%',
				'background': '#000',
				'position'	: 'fixed',
				'-ms-filter': 'alpha(opacity=30)',
				'filter'	: 'alpha(opacity=30)'
			}).show())
		}
	}






	/**
	 * Add Field
	 * @since: 1.0
	*/
	add_field = function( parent ) {

		var attr = ['name', 'id', 'for' ];
		var elem = 'li, span, input, textarea, select, label, div, fieldset';

        $( '.add_field', parent ).click(function(){

            last  = $(this).siblings('.multiple').find('li:last');
            field = last.clone().addClass('editing').removeClass('list');

            last.removeClass('editing').addClass('list');

            $('label', field).removeClass('active');
            $('input', field).removeAttr('checked');
            $('option', field).removeAttr('selected');


            $('.edit', field).text('Done');
            $('.items', field).hide().html('');
            $('.figure', field).removeClass('attached');
            $('.figure', field).find('small').removeAttr('class');
            $('img', field).removeClass('image_bg').attr('src', '').addClass('preview');

            $('input[type="text"], input[type="hidden"], textarea, select', field).val('');

            for( i=0; i < attr.length; i++ ){
                $( elem, field).attr( attr[i], function( index, a ) {
                    if( /\[(\d+)\]/.test( a ) && attr[i] == 'name' ) {
                        return a.replace(/\[(\d+)\]/, function( fullMatch, n ) {
                            return '['+ (Number(n) + 1) +']';
                        });
                    } else {
                        if( /(\d+)/.test( a ) && attr[i] !== 'name' ) {
                            return a.replace(/(\d+)/, function( fullMatch, n ) {
                                return Number(n) + 1;
                            });
                        }
                    }

                });
            }

            field.fadeIn().insertAfter( last );

        });


        parent.find('.multiple').sortable({
            opacity: 	 0.7,
            revert: 	true,
            handle:   	'.sort',
            tolerance:	'pointer',
            placeholder: 'placehere'
        });
	}




    /**
     * Remove Field
     * @since: 1.0
     */
    remove_field = function( field ){
        $( '.delete', field ).click(function(){
            $(this).closest('li').remove();
        });
    }


    /**
     * Edit Field
     * @since: 1.0
     */
    edit_field = function( field ){

        /* EDIT FIELD */
        $('.multiple li .edit', field ).live( 'click', function() {

            var parents_li  = $(this).closest('li');
            var siblings_li = parents_li.siblings();

            parents_li.toggleClass('editing').toggleClass('list');

            if( parents_li.hasClass('editing')){
                parents_li.find('.edit').text('Done');
            } else {
                parents_li.find('.edit').text('Edit');
            }

            siblings_li.removeClass('editing').addClass('list').find('.edit').text('Edit');

        });

    }



    /**
	 * Upload
	 * @since: 1.0
	*/
	upload = function( field ) {

		$( '.upload', field ).click(function(){

			if( !$(this).parents().hasClass('attach') ) {
				var id = $(this).attr('id');
			} else {
				/* For Widget Image Upload */
				var id = $(this).parents('.widget').attr('id');
			}

			$('#' + id + ' .figure input').addClass('image_id');

			var num 	= id.replace(/[^\d.,]+/,'');
			var the_id	= $( '.upload#' + id );
			var editing = the_id.parents('.editing');
			var preview = the_id.find('.figure .preview');

			/* If the current version of wordpress is updated */
			if( !$(this).hasClass('old') ) {
				upload_frame = wp.media.frames.upload_frame = wp.media({
					title: 	  'Select Image',
					multiple: true,
					library: { type: 'image' },
					button : { text : 'Insert Selected Image' }
				});

				upload_frame.on( 'select', function(i) {

					var selection = upload_frame.state().get('selection');

					selection.map( function( attachment ) {

						attachment = attachment.toJSON();
						selected = upload_frame.state().get('selection').toJSON().length;

						/* More Image Selection */
						 if ( the_id.parents().hasClass('moreimage') ) {

							var get_id  = the_id.parent().attr('id');
							var option  = get_id.split('-');

							var name  = the_id.siblings('.items').find('input').attr('name');
							var item  = $(
									'<span class="item sort">' +
										'<span class="img">'+
											'<img id="'+ attachment.id +'" src="'+ attachment.url +'"/>' +
											'<input type="hidden" value="'+ attachment.url +'" name="'+ option[0] +'['+ option[1] +'][]"/>' +
										'</span>' +
										'<span id="'+ attachment.id +'" class="delete"></span>' +
									'</span>'
								);

							the_id.siblings('.items').removeClass('hide').show().append( item );

							the_id.siblings('.ids').append( attachment.id+ ',');

							if( selection.length === selected ) {
								$('.items').find('.first').remove();
							}

						}

						/* Insert to Editor */
						else if ( the_id.parents().hasClass('toeditor') ) {
							editing.find( '.editor-' + num ).val( editing.find( '.editor-' + num ).val() + '<img src="'+ attachment.url +'"/>');
						}

						/* Basic Upload */
						else {

							$('.this .rowSettings').find('.background').val( attachment.url );

							if( the_id.find('.preview').hasClass('repeat')){
								preview.css({'background' : 'url('+attachment.url+ ') repeat'}).parent().addClass('attached');
							} else {
								editing.children('.small_preview').find('img').attr('src', attachment.url);
								preview.attr( 'src', attachment.url ).show().parent().addClass('attached');
							}
							the_id.find('.figure .image_id').val(attachment.id);
						}
					});
				});
				upload_frame.open();

			} else {
				/* Old version of wordpress */
				tb_show('', 'media-upload.php?type=image&TB_iframe=true');

				window.send_to_editor = function(html) {
					the_id.find('.figure .image_id').val( $('img', html).attr('class').replace(/(.*?)wp-image-/, '') );
					preview.attr('src', $('img',html).attr('src')).show().parent().addClass('attached');
					tb_remove();
				}
			}
			return false;
		});
	}



	/**
	 * Delete Field
	 * @since: 1.0
	*/
	delete_id = function(e){
		var id = $(e).attr('id');
		var find_id = $(e).parents('.moreimage').find('.ids');
		var get_ids = find_id.html();

		if( $(e).parents().hasClass('hasId') ){
			var ids = get_ids.split(',');
			/* Loop and count the id */
			for ( i=0; i < ids.length; i++ ){
				/* Check the id */
				if ( ids[i] == id ) {
					/* Replace matched id */
					var new_ids = get_ids.replace( ids[i]+',', '' );
					find_id.html(new_ids);
				}
			}
		}
	}




	/**
	 * Remove Image
	 * @since: 1.0
	*/
	remove_img = function( field ){

		$('.upload .remove', field ).click(function(e){
			$(this).parents().removeClass('attached');

			/* Remove for single image */
			if( $(this).parents().hasClass('upload') ) {
				$(this).parent().find('input').val('');

				if(!$(this).parent().find('.preview').hasClass('repeat')){
					$(this).parent().find('img').addClass('preview').hide();
				} else {
					/* Remove for image repeat */
					$(this).parent().find('.repeat').removeAttr('style');
				}
			} else {
				/* Remove for more image */
				if ( $(this).parents().hasClass('moreimage') ) {
					delete_id(this);
					$(this).closest('.item').remove();
				}
			}
		});
	}



	/**
	 * Add Tag
	 * @since: 1.0
	*/
	add_tag = function(e){
		var parent = $('#' + $(e).parent().attr('id'));
		var tags = parent.find('.tag_input').val().split(', ');

		if( parent.find('.tag_input').val() !== '' ){
			for ( i=0; i < tags.length; i++ ){
				field = $(e).siblings('.tags').find('span:last').clone(true);
				$( 'a', field ).addClass('tag');
				$( '.tag', field ).text(tags[i]);
				$( 'input', field ).val(tags[i]).attr('name', function(index, name) {
					if( parent.find('.tags span').hasClass('first') ) {
						return name.replace(/(\d+)/, i);
					} else {
						return name.replace(/(\d+)/, function(fullMatch, n) {
							return Number(n) + 1;
						});
					}
				});
				$(e).siblings('.tags').append(field);
			}
			if( parent.find('.tags span input').val() == '' ) {
				parent.find('.tags span:first').remove();
			}
			parent.find('.tags span').removeClass('first');
			parent.find('.tag_input').val('');
		}
	}



	/**
	 * Remove Tag
	 * @since: 1.0
	*/
	remove_tag = function(e){
		var id = $(e).parents('.tags').parent().attr('id');
			$(e).siblings('input').val('');

		if( $(e).parents('.tags').find('span').length == 1 ) {
			$(e).text('').removeClass('tag');
			$('#' + id + ' .new_tag').val('').attr('name', function(index, name) {
				return name.replace(/(\d+)/, 0);
			});
		} else {
			$(e).parent().remove();
		}
		if( $('#' + id + ' .tags span').length < 2 ) {
			$('#' + id + ' .tags span').addClass('first');
		}
	}



	/**
	 * Increment the ID inside square bracket
	 * @since: 1.0
	*/
	new_id_number = function( elem, attr ) {
		$( elem ).attr( attr, function( index, a ) {
			if( /\[(\d+)\]/.test( a ) && attr == 'name' ) {
				return a.replace(/\[(\d+)\]/, function( fullMatch, n ) {
					return '['+ (Number(n) + 1) +']';
				});
			} else {
				if( /(\d+)/.test( a ) && attr !== 'name' ) {
					return a.replace(/(\d+)/, function( fullMatch, n ) {
						return Number(n) + 1;
					});
				}
			}
		});
	}



    /**
     * Empty
     * @since: 1.0
    */
    empty = function( input, undefined ) {

        if( undefined == true ) {
            if( typeof input == 'undefined' ){
                return true;
            } else {
                return false;
            }
        } else {
            if( input == '' ) {
                return true;
            } else {
                return false;
            }
        }
    }



    /**
     * String String
     * @since: 1.0
     */
    strstr = function( haystack, needle, bool ) {

        var pos = 0;
        haystack += '';

        pos = haystack.indexOf(needle);

        if ( pos == -1 ) {
            return false;
        } else {
            if ( bool ) {
                return haystack.substr(0, pos);
            } else {
                return haystack.slice(pos);
            }
        }
    }


	/**
	 * Replace Attribute String Value
	 * @since: 1.0
	*/
	replace_attr_str = function( search, attr, replace, field ) {
		var pattern = new RegExp( search );
		$('*', field ).attr( attr, function( i, a ){
			if( pattern.test( a ) ) {
				 return a.replace( pattern, replace );
			}
		});
	}


	/**
	 * String Replace, PHP str_replace like
	 * @since: 1.0
	*/
	str_replace = function( search, replace, subject, count ) {

	  var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
		f  = [].concat(search), r = [].concat(replace), s = subject,
		ra = Object.prototype.toString.call(r) === '[object Array]',
		sa = Object.prototype.toString.call(s) === '[object Array]';
		s  = [].concat(s);
		if (count) {
			this.window[count] = 0;
		}

		for (i = 0, sl = s.length; i < sl; i++) {
			if (s[i] === '') {
			  continue;
			}
			for (j = 0, fl = f.length; j < fl; j++) {
			  temp = s[i] + '';
			  repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			  s[i] = (temp).split(f[j]).join(repl);
			  if (count && s[i] !== temp) {
				this.window[count] += (temp.length - s[i].length) / f[j].length;
			  }
			}
		}
		return sa ? s : s[0];
	}


    /**
     * Basename
     * @since: 1.0
     */
    basename = function( path, suffix ) {

        var b = path;
        var lastChar = b.charAt( b.length - 1 );

        if ( lastChar === '/' || lastChar === '\\' ) {
            b = b.slice(0, -1);
        }

        b = b.replace(/^.*[\/\\]/g, '');

        if ( typeof suffix === 'string' && b.substr( b.length - suffix.length) == suffix ) {
            b = b.substr( 0, b.length - suffix.length );
        }

        return b;
    }


	$.fn.visual_field = function(){
		return this.each(function(){
			var self = $(this);

            upload( self );
            textarea( self );
			checkbox( self );
            add_field( self );
            remove_img( self );
            edit_field( self );
			thumbnails( self );
            remove_field( self );
			color_picker( self );
			radio_button( self );
            select_option( self );
			toggle_switch( self );
		});
	};
		

})(jQuery);