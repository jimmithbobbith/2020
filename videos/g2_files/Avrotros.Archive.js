var AZShortcuts = {},
	IsotopeOverview = {},
	Page = {},
	Gemist = {},
	Pip = {},
	currentPage;

/* AZ shortcuts */
(function () {

	this.Init = function () {

		var exist = ($('.listCreatorItems').children('dl').length > 0) ? true : false;

		if (exist) {
			this.timer='';
			this.checkAzAnchors();
			this.obj = $('<ul class="shortcut" />');
			this.resultsObj=$('.listCreatorItems').children('dl');//get resultscontainer
			this.targetData=this.getTargetData();//get positions targets dt dom objecten
			this.buildShortCut();
			this.windowScroll();
			this.resizeItems();//by resizing oid get new data positions
		}
	};

	this.buildShortCut=function() {
		var self=this,
			exist = (self.resultsObj.parent().children('.shortcut').length > 0 ) ? true : false;

		//empty exist shortcut container
		if (exist)
			$('.listCreatorItems > .shortcut').empty();

		//create shortcut
		for (var i in self.targetData) {
			var objItem=$('<li />'),
				name=self.targetData[i][1],
				className=(i==0) ? 'is-active' : '';


			//console.log(name);
			objItem
				.append($('<a href="/site/programmas-sites/#'+name+'" class="'+className+'" data-go-to-anchor="'+name+'">'+name+'</a>'))
				.appendTo(self.obj)
				.children('a')
				.bind('click',function(e){
					self.scrollTo($(this));

					e.preventDefault();
				});
			//self.obj.append(objItem);
		}
		self.resultsObj.parent().append(self.obj);
	};

	this.resizeItems = function() {
		var self=this,
			timer='';

		//isotope workaround for changing content
		$('.listCreatorItems dl').bind('change', function () {
			var obj=$(this),
				old_h = (obj.data('height')===undefined) ? obj.height() : obj.data('height'),
	            self_h = obj.height();

	        obj.data('height',self_h);

			if (old_h != self_h) {
				clearTimeout(timer);
				//set timeout
				timer = setTimeout( function(){
					self.targetData=self.getTargetData();
					self.buildShortCut();
				},400);

			}


		});

		$(window).bind('resize', function () {

			clearTimeout(timer);
			//set timeout
			timer = setTimeout( function(){
				self.targetData=self.getTargetData();
			},400);
		});


	};

	this.windowScroll=function() {
		var self=this,
			shortCutTop = self.obj.offset().top,
			timer='',
			objLink=$('.shortcut').children().children();
			//objLink=self.obj.find('> li > a');

		$(window).scroll(function() {
			var window_top=$(window).scrollTop();

			//make obj sticky
			if(window_top > shortCutTop) {
				if(!self.obj.hasClass('fixed'))
					self.obj.addClass('fixed');
			} else {
				self.obj.removeClass('fixed');
			}

			//bug fix voor scroll top, lame but is niet anders ;)
			if (window_top==0) {
				var name=name=self.targetData[0][1];
				objLink.removeClass('is-active');
				$("a[data-go-to-anchor=" + name + "]").addClass('is-active');
			}


			//timeout function minder calls
			clearTimeout(timer);

			//set timeout

			timer = setTimeout( function(){

				//check positon adhv data array
				for (var i in self.targetData) {

					var name=self.targetData[i][1],
						pos_top=self.targetData[i][2],
						pos_bottom=self.targetData[i][3];


					if(window_top > pos_top && pos_bottom > window_top ) {
						$('.shortcut a.is-active').removeClass('is-active');

						if(!$("a[data-go-to-anchor=" + name + "]").hasClass('is-active')) {

							$("a[data-go-to-anchor=" + name + "]").addClass('is-active');
						}
					}
				}

			} , 150 );
		});
	};

	this.getTargetData = function() {
		var self = this,
			data=[],
			obj=self.resultsObj.children('dt').not(':hidden'),
			objLength = obj.length;



			obj.each(function(index) {
				var item=$(this),
					title=item.data('anchor'),
					pos = (index==0) ? 1 : item.offset().top,
					bottom=((objLength-1)==index) ? 999999999 : bottom=obj.eq(index+1).offset().top;

					//console.log(pos);
				data.push([index, title, pos-20, bottom-20]);

			});
		return data;
	};

	this.checkAzAnchors = function(){
		 $.each($('.results .anchor'), function(index, valueAnchor){
			 $.each($(this).nextUntil('.anchor'), function(){
				 if($(this).hasClass('tv') && !$(valueAnchor).hasClass('tv'))
				 	$(valueAnchor).addClass('tv');
				 if($(this).hasClass('radio') && !$(valueAnchor).hasClass('radio'))
				 	$(valueAnchor).addClass('radio');
			 });
		 });
	};

	this.scrollTo = function(objThis) {
		var self=this;
			obj=self.obj.children().children('a');
			anchor=objThis.data('go-to-anchor'),
			target = self.resultsObj.find("dt[data-anchor=" +anchor+ "]").offset(); //get target position

		obj.removeClass('is-active');
		objThis.addClass('is-active');

		//$(window).unbind("scroll");

		$('html, body').animate({
			scrollTop:target.top
		});

	};

	//Slowly execute function for better framerate thx to paul irish ;)
}).apply(AZShortcuts);

/*
* Isotope and search/filter/sort functions
 */
(function () {
	var currentLayoutModeValue = 'cellsByRow';
	var currentSearchArguments = [];
	var currentSearchFilters;
	var isotopeContainer;

	// Initialize the searchresults isotope and the user functionalities on the first screen (overviewpage)
	this.Init = function () {
		currentLayoutModeValue = 'cellsByRow';

		var itemHeight = $('.results.'+currentLayoutModeValue+'>.box:first-child').outerHeight(); //get itemheight

		var isotopeParams = [];
		isotopeParams['transformEnabled'] = false;
		isotopeParams['itemSelector'] = '.box';
		isotopeParams['layoutMode'] = currentLayoutModeValue;
		isotopeParams['hiddenStyle'] = { opacity: 0, scale: 1 };
		isotopeParams['cellsByRow'] = {
			rowHeight: itemHeight
		};
		isotopeParams['visibleStyleObject'] = { opacity: 0, scale: 1 };

		// default initialization with filter on tv items for the gemist page
		switch(currentPage) {
			case "gemist": isotopeParams['filter'] = '.video'; break;
			//case "presentatoren": isotopeParams['filter'] = '.tv'; break;
		}

		isotopeContainer = $('.results').isotope(isotopeParams);

		this.FiltersInit(currentLayoutModeValue);
		this.LayoutModeInit(currentLayoutModeValue);

		this.EventListenerIsotope();

		if(currentPage == "gemist" || currentPage == "programmas")
			this.SearchInit();

		// the gemist on the pip page immediately returns the resultscreen there we need to initialize different functions
		if(currentPage == "pipgemist")
			IsotopeOverview.SearchResultsInit();
			IsotopeOverview.SearchResultsPagingInit();
			IsotopeOverview.SearchResultsSortInit();
			Pip.UpdatePageHeader();

	};

	this.FiltersInit = function (currentLayoutModeValue) {
		// bind filter button click
		$('#Filters a').on('click', function () {
			if (!$(this).hasClass('is-active')) {

			// toggle the active class
			$(this)
				.toggleClass('is-active')
				.parent()
				.siblings()
				.children()
					.removeClass('is-active');

				// filter with isotope
				var filterValue = $(this).attr('data-filter');
				isotopeContainer.isotope({ filter: filterValue });
			}
			// is the current filter is already active we deselect te filters and make data-filter all active
			else {
				if (!($(this).attr('data-filter') == '*')) {
					// show a-z shortcuts
					//$('ul.shortcut').show();

					// filter with '*'
					isotopeContainer.isotope({ filter: '*' });

					// toggle the active class on the all filter button
					$(this).toggleClass('is-active');
					$("#Filters").find("[data-filter='*']").toggleClass('is-active');
				}
			}
			return false;
		});
	};

	this.LayoutModeInit = function (currentLayoutModeValue) {
		var self=this;
		$('#Sort a').on('click', function () {
			var layoutModeValue = $(this).attr('data-view');
			// only sort when the clicked sort option is different than the current one
			if (layoutModeValue != currentLayoutModeValue) {
				isotopeContainer
					.removeClass(currentLayoutModeValue)
					.isotope({layoutMode: layoutModeValue})
					.addClass(layoutModeValue);
				// toggle the layout class on the results container

				// toggle the active class on the sort buttons
				$('#Sort a.is-active').removeClass('is-active');
				$(this).toggleClass('is-active');

				currentLayoutModeValue = layoutModeValue;

				//get new data postions

			}
			return false;
		});
	};

	//when transition completed set trigger for shorcut to get new positions
	this.EventListenerIsotope = function() {
		isotopeContainer.isotope( 'on', 'layoutComplete', function() {
			$('.listCreatorItems dl').trigger('change');
		});
	};

	// Initialize the search functionality on the first screen (overviewpage)
	this.SearchInit = function () {

		// disiable the submit button when on programmas, we only wan't to search on programs therew
		if(currentPage == "programmas")
		{
			$( ".searchbox input[type=search]").autocomplete({
				source: function (request, response) {
					$.getJSON("/typo3conf/ext/at_resources/Resources/Public/Php/AutoComplete.php", { search: $('.searchbox :input').val() }
						, function(result){
								response(result);
						});
				},
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					//assign value back to the form element
					if(ui.item){
						currentSearchArguments = { 'filter': '(' + ui.item.value.replace(/ /g,'\\%20') +  '*)' , 'sort' : 'onlinedate+desc' };

											$.ajax({
													async: 'true',
													//url: 'site/gemist',
                                                    url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
													type: 'GET',
													data: {
															eID: "ajaxDispatcher",
															request: {
																	pluginName: 'listcreator',
																	controller: 'ListCreator',
																	action: 'searchProgramId',
																	arguments: currentSearchArguments
															}
													},
													success: function (result) {
														var jsonResult = $.parseJSON(result);
														if(jsonResult.targeturi != null)
															window.location.href = jsonResult.targeturi;
														else
															window.location.href = "/site/gemist";
													},
													error: function (result) {
															//console.log(error);
													}
											});
						event.preventDefault();
					}
				}
			});
			$('.searchbox .search').attr('disabled', 'disabled');
		}
		else
		{
			$( ".searchbox input[type=search]").autocomplete({
				source: function (request, response) {
					$.getJSON("/typo3conf/ext/at_resources/Resources/Public/Php/AutoComplete.php", { search: $('.searchbox :input').val() }
							, function(result){
								response(result);
							});
				},
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					//assign value back to the form element
					if(ui.item){
						currentSearchArguments = { 'filter': '(' + ui.item.value.replace(/ /g,'\\%20') +  '*)' , 'sort' : 'onlinedate+desc' ,'dpid':$('#plugin-settings').data('detailpage')};

						$.ajax({
							async: 'true',
							//url: 'site/gemist',
                            url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
							type: 'GET',
							data: {
								eID: "ajaxDispatcher",
								request: {
									pluginName: 'listcreator',
									controller: 'ListCreator',
									action: 'searchProgramId',
									arguments: currentSearchArguments
								}
							},
							success: function (result) {
								var jsonResult = $.parseJSON(result);
								currentSearchArguments = { 'programid': jsonResult.programid, 'sort' : 'onlinedate+desc','dpid':jsonResult.dpid};
								// append loader html
								$('section.page').append('<div class="md-box indicator active"><div class="box"><p>Moment items ophalen</p></div></div>');

								// get the partial results from the listcreator extension by calling the 'search' action.
								$.ajax({
									async: 'true',
									//url: 'site/gemist',
                                    url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
									type: 'GET',
									data: {
										eID: "ajaxDispatcher",
										request: {
											pluginName: 'listcreator',
											controller: 'ListCreator',
											action: 'search',
											arguments: currentSearchArguments
										}
									},
									success: function (result) {
										$('section.page').fadeOut(300, function() {
											$('section.page').empty().append(result);

											// get the programinfo
											$.ajax({
												async: 'true',
												//url: 'site/gemist',
                                                url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
												type: 'GET',
												data: {
													eID: "ajaxDispatcher",
													request: {
														pluginName: 'listcreator',
														controller: 'ListCreator',
														action: 'searchProgramInfo',
														arguments: currentSearchArguments
													}
												},
												success: function(result){
													$('.page-header > h1').remove();

													($('.pipHeader').length > 0)
													$('pipHeader').remove();

													// we have to remove the suggesttitle filter if there has been searched with suggesttitle
													if(currentSearchArguments['suggesttitle'] && $('#Filters li[data-filter="suggesttitle"]'))
													{
														$('#Filters li[data-filter="suggesttitle"]').remove()
													}
													$('.page-header').append(result).fadeIn(1000);
												}
											});

											if ($('ul.results').find('li').length == 0)
												IsotopeOverview.NoSearchResults(result);
											else
												$('section.page').fadeIn(300, function(){
													IsotopeOverview.SearchResultsInit();
													IsotopeOverview.SearchResultsPagingInit();
													IsotopeOverview.SearchResultsSortInit();
												});
										});
									},
									error: function (error) {
										//console.log(error);
									}
								});
							},
							error: function (result) {
								//console.log(error);
							}
						});
						event.preventDefault();
					}
				}
			});

			$('.searchbox').submit(function (e) {
				var searchTerm = $('.searchbox :input').val();
				// check if there is a searchterm otherwise return false
				if(searchTerm && searchTerm != "")
				{
					if($.isPlainObject(currentSearchArguments))
					{
						currentSearchArguments['text'] = searchTerm;
						currentSearchArguments['sort'] = 'onlinedate+desc';
                        currentSearchArguments['dpid'] = $('#plugin-settings').data('detailpage');
					}
					else{
						currentSearchArguments = {'text': searchTerm, 'sort' : 'onlinedate+desc', 'dpid':  $('#plugin-settings').data('detailpage') };
                    }



					// append loader html
					$('section.page').append('<div class="md-box indicator active"><div class="box"><p>Moment items ophalen</p></div></div>');

					// get the partial results from the listcreator extension by calling the 'search' action.
					$.ajax({
						async: 'true',
						//url: 'site/gemist',
                        url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
						type: 'GET',
						data: {
							eID: "ajaxDispatcher",
							request: {
								pluginName: 'listcreator',
								controller: 'ListCreator',
								action: 'search',
								arguments: currentSearchArguments
							}
						},
						success: function (result) {
							$('section.page').fadeOut(300, function() {
								$('section.page').empty().append(result);
								if ($('ul.results').find('li').length == 0)
								{
									var resultFacts = [];
									resultFacts['hits'] = 0;
									IsotopeOverview.NoSearchResults(result);
								}
								else
									$('section.page').fadeIn(300, function(){
										IsotopeOverview.SearchResultsInit();
										IsotopeOverview.SearchResultsPagingInit();
										IsotopeOverview.SearchResultsSortInit();
										IsotopeOverview.UpdateSearchResultsPaging(result);
									});
							});
						},
						error: function (error) {
							//console.log(error);
						}
					});
					e.preventDefault();
				}
				else
					return false;
			});
		}
	};

	// Initialize the searchresults page -> isotope and the user functionalities
	this.SearchResultsInit = function(){

		var itemHeight = $('.results.'+currentLayoutModeValue+'>.box:first-child').outerHeight(); //get itemheight
			//itemWidth =$('.results.'+currentLayoutModeValue+'>.box:first-child').outerWidth(); //get itemwidth

		// Init isotope
		 isotopeContainer = $('.results').isotope({
			itemSelector: '.box',
			layoutMode: currentLayoutModeValue,
			hiddenStyle: { opacity: 0, scale: 1 },
			visibleStyleObject: { opacity: 0, scale: 1 },
			cellsByRow: {
			    //columnWidth: itemWidth,
			    rowHeight: itemHeight
			}

		});

		this.SearchResultsSearchInit();
		this.SearchResultsFiltersInit();
		this.LayoutModeInit(currentLayoutModeValue);
	};

	// Initialize search functionality for the searchresults -> gets partial results from the controller
	this.SearchResultsSearchInit = function(){
		if(currentPage != "pipgemist"){
			$( ".searchbox input[type=search]").autocomplete({
				source: function (request, response) {
					$.getJSON("/typo3conf/ext/at_resources/Resources/Public/Php/AutoComplete.php", { search: $('.searchbox :input').val() }
							, function(result){
								response(result);
							});
				},
				minLength: 1,
				delay: 100,
				select: function(event, ui) {
					//assign value back to the form element
					if(ui.item){
						currentSearchArguments = { 'filter': '(' + ui.item.value.replace(/ /g,'\\%20') +  '*)' , 'sort' : 'onlinedate+desc' };

						$.ajax({
							async: 'true',
							//url: 'site/gemist',
                            url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
							type: 'GET',
							data: {
								eID: "ajaxDispatcher",
								request: {
									pluginName: 'listcreator',
									controller: 'ListCreator',
									action: 'searchProgramId',
									arguments: currentSearchArguments
								}
							},
							success: function (result) {
								var jsonResult = $.parseJSON(result);
								currentSearchArguments = { 'programid': jsonResult.programid, 'sort' : 'onlinedate+desc'};
								IsotopeOverview.SearchPartialResults(currentSearchArguments, true);
								event.preventDefault();
							}
					});
					}
				}
			});
		}

		// disiable the submit button when on programmas, we only wan't to search on programs therew
		if(currentPage != "programmas")
		{
			$('.searchbox').submit(function (e) {
				var searchTerm = $('.searchbox :input').val();
				// check if there is a searchterm otherwise return false
				if(searchTerm && searchTerm != "")
				{
					if(currentSearchArguments && currentSearchArguments.hasOwnProperty('filter'))
						delete currentSearchArguments['filter'];

					if(currentSearchArguments && currentSearchArguments.hasOwnProperty('start'))
						delete currentSearchArguments['start'];

					if(currentSearchFilters && currentSearchFilters.hasOwnProperty('filter'))
						delete currentSearchFilters['filter'];

					if(currentPage != "pipgemist")
						delete currentSearchArguments['suggesttitle'];

					currentSearchArguments['text'] = searchTerm;
					currentSearchArguments['sort'] = 'onlinedate+desc';
					IsotopeOverview.SearchPartialResults(currentSearchArguments, false);
					$( ".searchbox input[type=search]").val('');
					e.preventDefault();
				}
				else
				{
					return false;
				}
			});
		}
		else
			$('.searchbox .search').attr('disabled', 'disabled');
	};

	this.SearchResultsFiltersInit = function(){
			// show 'more' button when there are too much filteroptions
			$.each($('#Filters li > section > ul'), function() {
				var iFilterItems = $(this).children('li').length;
				if (iFilterItems > 3) {
					$(this)
						.after('<a href="#" class="icon more" data-show-setting="collapsed">Toon meer</a>')
						.parent()
						.children('a.more')
						.bind('click',function(e){
							var obj=$(this);

							if (obj.attr('data-show-setting') == 'collapsed') {
								obj
									.prev('ul')
									.addClass('more-active')
								.end()
									.removeClass('more')
									.addClass('less')
									.text('Toon minder')
									.attr('data-show-setting','unfolded');
							} else {
								obj
									.prev('ul')
									.removeClass('more-active')
								.end()
									.removeClass('less')
									.addClass('more')
									.text('Toon meer')
									.attr('data-show-setting','collapsed');

								$('body').scrollTop(parseInt(obj.parent().position().top) - 34);
							}
							e.preventDefault();
						});
				}
			});

			// Filter has been clicked
			$('#Filters li.facet :checkbox, #BtnFilterPeriod').click(function(e){
				// check if the filter was checked if so this click means the user wants to unclick it
				if(!$(this).is(':checked') && this.id != 'BtnFilterPeriod') {
					var uncheckedFilter = $(this);
					if($.inArray($(uncheckedFilter).parents('li.filter').data('filter'), currentSearchArguments))
					{
						currentSearchArguments[$(uncheckedFilter).parents('li.filter').data('filter')] = $.grep(currentSearchArguments[$(uncheckedFilter).parents('li.filter').data('filter')], function(value){
								return value != $(uncheckedFilter).parents('li.facet').data('filterValue');
						});
					}
				}

				var filterArray = new Object();
				var fromDate;
				var toDate;
				$.each($('.period li.facet'), function(key, value){
					if(($(value).find('input')[0].id).indexOf('from') > -1)
						fromDate = $(value).find('input')[0].value;
					else if(($(value).find('input')[0].id).indexOf('to') > -1)
						toDate = $(value).find('input')[0].value;
				});

				if((fromDate != '' && fromDate != undefined) || (toDate != '' && toDate != undefined)){
					var onlineDateString = ""
					if(fromDate != '' && fromDate != undefined)
						onlineDateString += '(onlinedate:[' + fromDate + 'T00:00:00.000000Z%20TO%20';
					else
						onlineDateString += '(onlinedate:[0000-00-00T00:00:00.000000Z%20TO%20';

					if(toDate != '' && toDate != undefined)
						onlineDateString +=  toDate + 'T00:00:00.000000Z])';
					else
						onlineDateString += 'NOW])';

					filterArray['filter'] = onlineDateString;
				}
				else{
						filterArray['filter'] = '';
				}


				// NEW: get all facets from form by serializing formdata
				var sFacet = '';
				var aFilters = $('form#FacetFilters').serializeArray();
				$.each(aFilters, function(sKey,sValue) {
						if (aFilters[sKey]['name'] == "facet") {
								sFacet = aFilters[sKey]['value'];
						}
						else if (aFilters[sKey]['value'] == "on" && sFacet != "") {
								var valueArray = [];
								if (filterArray[sFacet] == undefined)
								{
										valueArray.push(aFilters[sKey]['name']);
										filterArray[sFacet] = valueArray;
								}
								else
										filterArray[sFacet].push(aFilters[sKey]['name']);
						}
				});

				var searchArray = $.extend(true, {}, currentSearchArguments);
				// searcharray is associative for the solr search
				$.each(filterArray, function(index, value){
					currentSearchArguments[index] = value;
					if($.isArray(value))
					{
						$.each(value, function(indexValue, value){
							searchArray[index] = value;
						})
					}
					else
						searchArray[index] = value;
				});
				currentSearchFilters = filterArray;


				if(currentPage == "pipgemist")
					IsotopeOverview.SearchPartialResults(searchArray, true);
				else
					IsotopeOverview.SearchPartialResults(searchArray, false);

				e.preventDefault();
			});
	};

	this.SearchResultsPagingInit = function(){
			$('.paging a.more').click(function(e){
				currentSearchArguments['start'] = $('.paging').attr('data-paging-end');

				var args = {};
				if($('body').attr('id') == 'PipGemist')
						args['searchAll'] = 'true';
				else
						args['searchAll'] = 'false';

				args['searchArguments'] = currentSearchArguments;

                //quick fix
              //  delete args['searchArguments']['dpid'];
               // console.log(window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4]);

				$.ajax({
					async: 'true',
					//url: 'site/gemist',
                    url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
					type: 'GET',
					data: {
						eID: "ajaxDispatcher",
						request: {
							pluginName: 'listcreator',
							controller: 'ListCreator',
							action: 'searchInResults',
							arguments: args
						}
					},
					success: function (result) {
						var jsonResult = $.parseJSON(result);
						if(jsonResult.items !== undefined && $(jsonResult.items).find('li').length > 0)
						{
                            var newItems = $(jsonResult.items);
                            $(isotopeContainer).isotope('insert', $(newItems));
                            IsotopeOverview.UpdateSearchResultsPaging(jsonResult);
						}
						else
							IsotopeOverview.NoSearchResults(jsonResult);
					},
					error: function (error) {
						//console.log(error);
					}
				});
				e.preventDefault();
			});
	};

	this.SearchResultsSortInit = function(){
    $('.filterBar .right').show();

		currentSearchArguments["sort"] = "onlinedate+desc";

		$('#SortOptions').change(function(e){
			var selectedSortOption = $('#SortOptions')[0].selectedOptions[0].value;

			if(selectedSortOption && selectedSortOption != "")
			{
				if(currentSearchArguments && currentSearchArguments.hasOwnProperty('start'))
					delete currentSearchArguments['start'];

			 	currentSearchArguments["sort"] = selectedSortOption;
				IsotopeOverview.SearchPartialResults(currentSearchArguments, false);
				e.preventDefault();
			}
			else
			{
				return false;
			}
		});
	};

	this.SearchPartialResults = function(arguments, pipHeader){
		//set loading modal
		$('section.page').append('<div class="md-box indicator active"><div class="box"><p>Moment items ophalen</p></div></div>');
        var args = {};
        if($('body').attr('id') == 'PipGemist')
            args['searchAll'] = 'true';
        else
            args['searchAll'] = 'false';

        args['searchArguments']                     = arguments;
        args['dpid']                                = args['searchArguments']['dpid'];
		args['ispip']								= pipHeader;
        if(args['dpid'] == undefined)args['dpid']   = $('#plugin-settings').data('detailpage');

        //remove possible dpid in search arguments
       
        //delete args['searchArguments']['dpid'];

		$.ajax({
			async: 'true',
			url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
			//url: 'site/gemist',
			type: 'GET',
			data: {
				eID: "ajaxDispatcher",
				request: {
					pluginName: 'listcreator',
					pluginName: 'listcreator',
					controller: 'ListCreator',
					action: 'searchInResults',
					arguments: args
				}
			},
			success: function (result) {
				var jsonResult = $.parseJSON(result);
				var resultFacts = {};
				resultFacts['hits'] = jsonResult.hits;
				resultFacts['rows'] = jsonResult.rows;
				resultFacts['start'] = jsonResult.start;
				resultFacts['end'] = jsonResult.end;
				resultFacts['searchterm'] = jsonResult.searchterm;

				if(jsonResult.items !== undefined && jsonResult.hits > 0 && $(jsonResult.items).find('li').length > 0)
				{
					var newItems = $(jsonResult.items);
					var removeItems = $('ul.results li.box');
					$(isotopeContainer).isotope('remove', $(removeItems));
					$(isotopeContainer).isotope('insert', $(newItems));

					if($('div.column').is(':hidden'))
						$('div.column').show();

					IsotopeOverview.UpdateSearchResultsPaging(resultFacts);
					IsotopeOverview.UpdateFacets(jsonResult, arguments);
					IsotopeOverview.SearchResultsInit();

                    var urlPip = window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4];

					//if(pipHeader)
                    if(urlPip=="site/gemist")
					{
						if($('.pipHeader').length > 0)
							$('.pipHeader').fadeOut(300);
						// get the programinfo
						$.ajax({
							async: 'true',
							//url: 'site/gemist',
                            url: window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4],
							type: 'GET',
							data: {
								eID: "ajaxDispatcher",
								request: {
									pluginName: 'listcreator',
									controller: 'ListCreator',
									action: 'searchProgramInfo',
									arguments: currentSearchArguments
								}
							},
							success: function(result){
								$('.page-header > h1').remove();
								($('.pipHeader').length > 0)
								$('pipHeader').remove();

								$('.page-header').append(result).fadeIn(1000);
								$( ".searchbox input[type=search]").val('');
							}
						});
					}
					else
						IsotopeOverview.UpdateSearchResultsHeader(resultFacts);

                    $('section.page').children('.column').end().children('.md-box').remove();
				}
				else
					IsotopeOverview.NoSearchResults(resultFacts);
			},
			error: function (error) {
				//console.log(error);
			}
		});
	};

	this.UpdateFacets = function(jsonResult)	{
	    var facets = jsonResult.facets;

		// create the html for the new filter set
		var liHtml = "";

		$.each(facets, function(key, value){
			// if there have been searched on a suggesttitle we don't want to show the suggesttitle filter
			if(!(currentSearchArguments['suggesttitle'] && !currentSearchArguments['text'] && key == 'suggesttitle'))
			{
                if(value.facet != undefined)
                {
                     liHtml += "<li class=\"filter\" data-filter=\"" + key + "\"> \
                        <input type=\"hidden\" name=\"facet\" value=\"" + key + "\" /> \
                        <section> \
                        <h1>" + key + "</h1> \
                        <ul>";

                        // check if there are more facets, if so it's an array
                        if($.isArray(value.facet))
                        {
                            $.each(value.facet, function(keyValue, value){
                                var checked = "";
                                if(currentSearchFilters &&  key in currentSearchFilters && currentSearchFilters[key] == value.attributes.value)
                                    checked = "checked";

                                liHtml += "<li class=\"facet\" data-filter-value=\"" + value.attributes.value + "\"> \
                                <input type=\"checkbox\" name=\"" + value.attributes.value + "\" id=\"" + value.attributes.value + "\"" + checked + "> \
                                <label for=\"" + value.attributes.value + "\">" + value.attributes.value + "</label> \
                                <span class=\"count\">" + value.attributes.count +"</span> \
                                </li>";
                            });
                        }
                        else
                        {
                            var checked = "";

                            if(currentSearchFilters && key in currentSearchFilters && currentSearchFilters[key] == value.facet.attributes.value)
                                checked = "checked";

                            liHtml += "<li class=\"facet\" data-filter-value=\"" + value.facet.attributes.value + "\"> \
                            <input type=\"hidden\" name=\"facet\" value=\"" + key + "\" /> \
                            <input type=\"checkbox\" name=\"" + value.facet.attributes.value + "\" id=\"" + value.facet.attributes.value + "\"" + checked + "> \
                            <label for=\"" + value.facet.attributes.value + "\">" + value.facet.attributes.value + "</label> \
                            <span class=\"count\">" + value.facet.attributes.count +"</span> \
                            </li>";
                        }

                        liHtml += "</ul> \
                        </section> \
                        </li>";

                        $('#Filters').fadeOut(0, function() {
                            $('#Filters').empty().append(liHtml).fadeIn(0);
                        });
                }
			}
		});

		// add period filter
		var onlineFrom = '';
		var onlineTo = '';

		if(currentSearchFilters && currentSearchFilters.hasOwnProperty('filter') && currentSearchFilters.filter != null && currentSearchFilters.filter.indexOf('online') > -1)
		{
			var filterValues = currentSearchFilters.filter.split('&')
			$.each(filterValues, function(key, value){
				if(value.indexOf('onlinedate') > -1)
				{
					var onlinedateString = value.substring(value.indexOf('[')+1, value.indexOf(']'))
					var onlinedates = onlinedateString.split('%20TO%20');
					if(onlinedates.length > 0 && onlinedates[0].indexOf('NOW') < 0)
					{
						onlineFrom = onlinedates[0].split('T')[0];
						if(onlinedates.length > 1 && onlinedates[1].indexOf('NOW') < 0)
							onlineTo = onlinedates[1].split('T')[0];
					}
				}
			});
		}

		var liFilterHtml = "  <li class=\"period\"> \
		            <input type=\"hidden\" name=\"facet\" value=\"period\" /> \
					<section> \
					<h1>Periode</h1> \
					<ul> \
					<li class=\"facet period\"><input type=\"date\" id=\"onlinefrom\" name=\"onlinefrom\" value=\"" + onlineFrom + "\"><label for=\"van\">Van:</label></li> \
						<li class=\"facet period\"><input type=\"date\" id=\"onlineto\" name=\"onlineto\" value=\"" + onlineTo + "\"><label for=\"tot\">Tot:</label></li> \
						</ul> \
						<a href=\"#\" id=\"BtnFilterPeriod\" class=\"btn btn-bg left\">Filter periode</a> \
					</section> \
					</li>";

			$('#Filters').append(liFilterHtml).fadeIn(0);
	};

	this.UpdateSearchResultsHeader = function(results){
		{
			if((!currentSearchArguments['suggesttitle']))
			{
				if($('.pipHeader').length > 0)
					$('.pipHeader').fadeOut(300);

                var headerText = "";
								if(currentSearchArguments.hasOwnProperty('text'))
								{
									if(results.hits > 1  && currentSearchArguments.text)
											headerText = results.hits + ' resultaten voor \'' + currentSearchArguments.text + '\'';
									else if(results.hits == 1  && currentSearchArguments.text)
											headerText = results.hits + ' resultaat voor \'' + currentSearchArguments.text + '\'';
									else if(results.hits > 1  && !currentSearchArguments.text)
											headerText = results.hits + ' resultaten';
									else if(results.hits == 1  && !currentSearchArguments.text)
											headerText = results.hits + ' resultaat';
									else
											headerText = 'Geen resultaten voor \'' + currentSearchArguments.text + '\'';
								}
                                else if(results.hits == 1)
                                    headerText = results.hits + ' resultaat';
								else if(results.hits > 1)
                                    headerText = results.hits + ' resultaten';
                                else
									headerText = 'Geen resultaten gevonden.';

				$('.page-header h1').fadeOut(300, function() {
					// when there was a programinfo found before there is no h1 anymore
					if($('.page-header>h1').length > 0)
					{
						$('.page-header h1').text(headerText).fadeIn(300);
					}
					else
					{
						$('.page-header').append('<h1>' + headerText + '</h1>');
					}
				});
			}
		}
	}

	this.UpdateSearchResultsPaging = function(results){

		if($('.filterBar .searchbox').hasClass('wide')){
			$('.filterBar .searchbox')
				.removeClass('wide')
				.addClass('left');
		}

		if(results.rows  && results.hits)
		{
			var to = results.end > results.hits ? results.hits : results.end;

            if(to > results.hits)
             to = result.hits;

			$('.paging').fadeOut(300, function(){
				$('.paging').attr("data-paging-start", results.start);
				$('.paging').attr("data-paging-end", to);
				$('.paging .count').text(to + ' van de ' + results.hits  + ' resultaten');
				$('.paging').fadeIn(300);
			});

			if(parseInt(results.hits) <= parseInt(to))
				$('.paging .more').hide();
			else
				$('.paging .more').show();
		}
	};

	this.NoSearchResults = function(result) {
	 this.UpdateSearchResultsHeader(result);
     this.SearchInit();
     //Empty the search arguments for a new search
		var programid = "";
		if(currentSearchArguments.hasOwnProperty('programid'))
		 	programid = currentSearchArguments['programid'];

		currentSearchArguments = { 'sort' : 'onlinedate+desc' };
		if(programid != "")
			currentSearchArguments['programid'] = programid;

		$('div.column').hide();
		$('.indicator').hide();
		$('.filterBar .right').hide();

		$('.filterBar .searchbox')
			.removeClass('left')
			.addClass('wide');
		$('section.page').fadeIn(300);
	}

    // TODO: programID voor PIP en suggesttitle voor de rest
	this.SetArguments = function(programid,detailapge){
		currentSearchArguments = { programid : programid , dpid: detailapge, ispip:true };
	};
}).apply(IsotopeOverview);

/*
 * Gemist specific javascript
  */
(function () {
	this.Init = function () {
		/*
		* Settings the correct highlights according to the selected filter -> radio, tv or all, the default is tv
		 */
		$('.highlights ul.results > li').each(function () {
			if ($(this)[0].className.indexOf('video') < 1)
				$(this).hide();
			else
				$(this).show();
		});

		var now = new Date();
		$('dl.results dd').each(function () {
			var self = $(this);
			var start = new Date(self.find('article').data('start'));
			var end = new Date(self.find('article').data('end'));
			if (start < now && end > now) {
				self.addClass('live');
				//self.find('a').attr('href', '/site/gemist/item/' + self.find('ul.meta > li.broadcast').text().replace(/\s/g, '').toLowerCase() +'/liveplayer?no_cache=1');
                self.find('a').attr('href', window.location.toString().split('/')[3] + '/' + window.location.toString().split('/')[4]+'/item/' + self.find('ul.meta > li.broadcast').text().replace(/\s/g, '').toLowerCase() +'/liveplayer?no_cache=1');

			} else if (start > now) {
				self.find('a').attr('href', '#link').addClass('md-trigger').data('modal', 'modal-na');
				self.find('a').attr('href', 'javascript:void(0);').addClass('md-trigger').data('modal', 'modal-na');
			}

		});

		$('#Filters a').on("click", function () {
			// check if filters is already active then go back to defaults.

			if ($(this).hasClass('is-active'))
				Gemist.SetAllHighlights();
			else {
				var filterValue = $(this).attr('data-filter');

				if (filterValue == "*")
					Gemist.SetAllHighlights();
				else {
					$('.highlights ul.results > li').each(function () {
						if ($(this)[0].className.indexOf(filterValue.substring(1, filterValue.length)) < 1)
							$(this).hide();
						else
							$(this).show();
					});
				}
			}
		});
	};

	this.SetAllHighlights = function () {
		// TODO filter on all shows 6 items instead of 4, the follow 2 lines can be used te replace the code beneath it
		//$('.highlights ul.results > li.video:gt(1)').hide()
		//$('.highlights ul.results > li.audio:gt(1)').hide()
		var radioItems = 0;
		var tvItems = 0;
		$('.highlights ul.results > li').each(function () {
			if ($(this)[0].className.indexOf('audio') > -1) {
				if (radioItems > 1)
					$(this).hide();
				else
					$(this).show();
				radioItems++;
			}
			else if ($(this)[0].className.indexOf('video') > -1) {
				if (tvItems > 1)
					$(this).hide();
				else
					$(this).show();
				tvItems++;
			}
		});
	};
}).apply(Gemist);

/*
* PIP specific javascript
 */
(function () {
	this.Init = function () {

		if($('.results').data('programid') != null){
            //console.log($('.results').data('programid'),$('.results').data('detailpage'));
            IsotopeOverview.SetArguments($('.results').data('programid'),$('.results').data('detailpage'));
        }

	};

	this.UpdatePageHeader = function(){
		// remove the generated header from the subview from the listcreator plugin because pipgemist has is own header
		if($('.page-header').length >1)
			$('.page-header')[1].remove();
	};
}).apply(Pip);

/*
* Switch by the data-page attribute per page
 */
(function () {
	this.Init = function () {
		var page = $('body').data('page');
		switch (page) {
			case "gemist":
				currentPage = "gemist";
				Gemist.Init();
				loadIsotope();
				AZShortcuts.Init();
				break;
			case "pipgemist":
				currentPage = "pipgemist";
				Gemist.Init();
				loadIsotope();
				Pip.Init();
				break;
			case "presentatoren":
				currentPage = "presentatoren";
				loadIsotope();
				AZShortcuts.Init();
				break;
			case "programmas":
				currentPage = "programmas";
				loadIsotope();
				AZShortcuts.Init();
				break;
		}
	};
}).apply(Page);

$(document).ready(function ($) {
	Page.Init();
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function search() {
    var search = getParameterByName('search');
    if (search != "") {
        $('.searchbox input[type=search]').val(search);
        $('.searchbox .btn').trigger('click');
    }
}

// load script function with callback to handle synchronicity
function loadIsotope(){
	$.getScript( "http://static.avrotros.nl/JavaScript/Plugins/Isotope/2.0.0/isotope.pkgd.js", function( data, textStatus, jqxhr ) {
		$.getScript( "http://static.avrotros.nl/JavaScript/Plugins/Isotope/2.0.0/cells-by-row.js", function( data, textStatus, jqxhr ) {
			IsotopeOverview.Init();
			search();
		});
	});
}
