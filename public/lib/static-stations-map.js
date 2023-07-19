var ihrAffiliatesMap = function() {
	var map;

	var default_config = {
		tab_title_map:    'Local Stations', // Title of the Map tab
		tab_title_online: 'Listen Online',  // Title of the Online tab
		tab_title_list:   'All Stations',   // Title of the List tab (not usually displayed)
		show_list_tab:    false,            // Display the List tab?
		show_list_map:    true,             // Show the map on the list tab?
		default_tab:      'map',            // Which tab is enabled by default?
		clustering:       false,            // Use marker clustering?
		show_name:        '',               // Elvis Duran and the Morning Show (REQUIRED)
		map_style:        [],               // Pass array of map style objects or leave blank
		streams:          [],               // If false, will NOT display digital streams + tabbed interface
		css_file:         null,             // A custom CSS file, loaded after the built-in one
		layout:           'table',
		start_coords:     {lat: 40.7199311, lng: -74.00496679999999},	// NYC
		start_zoom:       8,    // Default starting zoom
		notfound_msg:     null, // Set to a custom message if needed.
		container:        document.getElementById('ihrAffiliatesMapContainer'),    // Probably no need to edit
		api_host:         location.protocol + `//${(window.siteConfig && window.siteConfig.htl_host) || 'htl.radioedit.iheart.com'}/`, // Where is the API?
		main_css:         location.protocol + '//htl.radioedit.iheart.com/static/stations/map.css', // Where is the base CSS?
		stations:         [], // Placeholder for list of radio stations
		maps_api_key:     'AIzaSyA7WQvMsISHIyotCPatRBwrgHNN9ohKqQE', // Google Maps API key
		geolocation:     'server', // Can also be 'browser' (HTML5 Geolocation) or 'none' (use start_coords above)
	};

	/**
	 * When passed a URL and a callback, will load the URL in a script tag
	 * and then execute the callback.
	 */
	var loadScript = function(url, callback) {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		if(callback) {
			script.onreadystatechange = callback;
			script.onload = callback;
		}
 
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	/**
	 * Similar to loadScript, but will instead load up CSS and
	 * will not run a callback
	 */
	var loadCSS = function(url) {
		css = document.createElement('link');
		css.href = url;
		css.type = 'text/css';
		css.rel  = 'stylesheet';

		document.getElementsByTagName('head')[0].appendChild(css);
	}

	/**
	 * Get the value of a named query parameter in the URL
	 * From: http://stackoverflow.com/a/901144
	 */
	var getParameterByName = function(name, url) {
		if(!url) {
			url = window.location.href;
		}

		name = name.replace(/[\[\]]/g, "\\$&");

		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);

		// Param not found
		if(!results) {
			return null;
		}

		// Param found & is empty
		if(!results[2]) {
			return '';
		}

		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	// Alternative to jQuery's $.extend()
	var extend = function(a, b){
		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}

		return a;
	}

	/**
	 * Alternative to jQuery's' $.get()
	 */
	var get = function(url, callback, onerror, headers) {
		var request = new XMLHttpRequest();

		request.open('GET', url, true);

		if(headers) {
			for(key in headers) {
				request.setRequestHeader(key, headers[key]);
			}
		}

		request.onload  = function() {
			callback(request.responseText, request.status);
		};

		request.onerror = onerror;

		request.send();
	}

	/**
	 *  Get the HTML for the main "Map" tab
	 */
	var getMapTabMarkup = function() {
		// The regular base page:
		var stationsFoundText = '';

		if(getParameterByName('showtotalcount') == '1') {
			stationsFoundText = '<h2 class="ihmInViewTitle">Showing <span id="inViewStations">0</span> stations out of <span id="totalStations">0</span> total</h2>';
		}

		return '<div class="ihmMapWrapper">' + 
			'	<div id="ihmLocateForm"><input type="text" value="" name="location_name" id="locate_location_name" placeholder="Search by location..." /></div>' + 
			'	<div id="ihmGoogleMap"></div>' + 
			'</div>' + 
			'<div>' + 
			stationsFoundText + 
			'	<div id="ihmInViewStationsList"></div>' + 
			'</div>';
	}

	/**
	 *  Get the HTML for the "List" tab
	 */
	var getListTabMarkup = function() {
		if(ihrAffiliatesMap.config.locations.length === 0) {
			return 'No locations found!';
		}

		var returnHTML = '<div class="ihmStationLocationHeader"><strong>Please select a location below to see all the stations in the area.</strong></div>';

		// Show map image?
		if(ihrAffiliatesMap.config.show_list_map === true) {
			returnHTML += '<div id="htl_list_map"><img src="' + ihrAffiliatesMap.config.api_host + 'static/stations/usamap.gif" alt="" usemap="#htl_list_map" width="520" border="0" height="320"></div>';
			returnHTML += '<map name="htl_list_map" id="htl_list_map">';
			returnHTML += '	<area title="Alabama" shape="poly" coords="347,255,345,241,346,206,365,203,372,231,373,244,355,246" data-country="United States" data-state="AL" />';
			returnHTML += '	<area title="Alaska" shape="poly" coords="39,276,30,264,40,261,40,249,37,239,47,234,62,242,63,269,87,293,59,277,44,286,28,290" data-country="United States" data-state="AK" />';
			returnHTML += '	<area title="Arizona" shape="poly" coords="73,215,86,226,121,236,131,173,88,166" data-country="United States" data-state="AZ" />';
			returnHTML += '	<area title="Arkansas" shape="poly" coords="286,226,282,216,281,190,316,187,315,195,321,195,309,225" data-country="United States" data-state="AR" />';
			returnHTML += '	<area title="California" shape="poly" coords="46,206,18,174,4,106,6,80,39,93,32,126,74,193,67,210" data-country="United States" data-state="CA" />';
			returnHTML += '	<area title="Colorado" shape="poly" coords="137,168,145,124,203,130,199,175" data-country="United States" data-state="CO" />';
			returnHTML += '	<area title="Connecticut" shape="poly" coords="472,103,471,96,483,92,484,98" data-country="United States" data-state="CT" />';
			returnHTML += '	<area title="Connecticut" shape="poly" coords="500,108,515,107,516,123,500,122" data-country="United States" data-state="CT" />';
			returnHTML += '	<area title="Delaware" shape="poly" coords="458,141,455,127,464,140" data-country="United States" data-state="DE" />';
			returnHTML += '	<area title="Delaware" shape="poly" coords="479,133,495,133,496,147,479,147" data-country="United States" data-state="DE" />';
			returnHTML += '	<area title="District of Columbia" shape="poly" coords="10,291" data-country="United States" data-state="DC" />';
			returnHTML += ' <area title="District of Columnia" shape="rect" coords="501,133,520,148" data-country="United States" data-state="DC" />';
			returnHTML += '	<area title="Florida" shape="poly" coords="435,310,426,302,414,287,411,278,409,267,400,260,389,256,380,261,368,255,358,257,354,251,377,250,415,251,426,271,440,294" data-country="United States" data-state="FL" />';
			returnHTML += '	<area title="Georgia" shape="poly" coords="383,247,380,238,382,230,372,203,389,200,394,206,409,222,417,232,415,244,399,248" data-country="United States" data-state="GA" />';
			returnHTML += '	<area title="Hawaii" shape="poly" coords="145,301,142,289,110,275,113,268,146,281,153,292,158,302,152,305" data-country="United States" data-state="HI" />';
			returnHTML += '	<area title="Hawaii" shape="poly" coords="115,292,131,292,132,310,114,308" data-country="United States" data-state="HI" />';
			returnHTML += '	<area title="Idaho" shape="poly" coords="75,93,123,102,126,78,110,74,96,36,93,17" data-country="United States" data-state="ID" />';
			returnHTML += '	<area title="Illinois" shape="poly" coords="330,173,322,159,321,151,309,140,317,125,321,112,336,113,340,132,341,155,337,169" data-country="United States" data-state="IL" />';
			returnHTML += '	<area title="Indiana" shape="poly" coords="345,162,346,151,344,123,363,118,367,148,358,157" data-country="United States" data-state="IN" />';
			returnHTML += '	<area title="Iowa" shape="poly" coords="267,131,262,109,262,103,303,102,307,111,311,119,306,126,305,132" data-country="United States" data-state="IA" />';
			returnHTML += '	<area title="Kansas" shape="poly" coords="206,174,209,144,267,146,271,154,272,177" data-country="United States" data-state="KS" />';
			returnHTML += '	<area title="Kentucky" shape="poly" coords="332,180,346,168,363,163,374,153,388,157,395,165,382,175" data-country="United States" data-state="KY" />';
			returnHTML += '	<area title="Louisiana" shape="poly" coords="288,266,293,251,286,233,309,232,310,239,306,253,311,257,325,256,319,264,327,271,315,272" data-country="United States" data-state="LA" />';
			returnHTML += '	<area title="Maine" shape="poly" coords="489,70,483,54,486,46,487,35,491,24,497,24,503,38,513,48,500,56" data-country="United States" data-state="ME" />';
			returnHTML += '	<area title="Maryland" shape="poly" coords="447,144,443,137,434,133,420,136,451,127,454,138,461,147" data-country="United States" data-state="MD" />';
			returnHTML += '	<area title="Maryland" shape="poly" coords="474,152,493,151,493,169,474,168" data-country="United States" data-state="MD" />';
			returnHTML += '	<area title="Massachusetts" shape="poly" coords="471,91,482,89,490,90,496,92,491,80,475,85" data-country="United States" data-state="MA" />';
			returnHTML += '	<area title="Massachusetts" shape="poly" coords="499,66,515,66,515,81,498,80" data-country="United States" data-state="MA" />';
			returnHTML += '	<area title="Michigan" shape="poly" coords="354,113,356,99,352,86,359,77,365,71,373,78,368,90,372,97,380,91,383,99,379,110" data-country="United States" data-state="MI" />';
			returnHTML += '	<area title="Michigan" shape="poly" coords="318,60,334,65,338,71,343,64,363,61,331,49" data-country="United States" data-state="MI" />';
			returnHTML += '	<area title="Minnesota" shape="poly" coords="262,94,257,34,272,36,306,44,290,64,288,80,298,95" data-country="United States" data-state="MN" />';
			returnHTML += '	<area title="Mississippi" shape="poly" coords="328,248,314,249,317,238,316,223,323,207,339,205,338,234,341,256,333,258" data-country="United States" data-state="MS" />';
			returnHTML += '	<area title="Missouri" shape="poly" coords="280,182,280,154,272,139,301,139,310,154,314,161,322,173,325,181" data-country="United States" data-state="MO" />';
			returnHTML += '	<area title="Montana" shape="poly" coords="128,69,115,67,108,49,102,18,141,27,194,32,190,73,151,67" data-country="United States" data-state="MT" />';
			returnHTML += '	<area title="Nebraska" shape="poly" coords="209,137,211,124,194,122,194,106,237,108,256,115,263,138" data-country="United States" data-state="NE" />';
			returnHTML += '	<area title="Nevada" shape="poly" coords="75,179,38,123,47,93,96,104,82,166" data-country="United States" data-state="NV" />';
			returnHTML += '	<area title="New Hampshire" shape="poly" coords="478,80,477,65,479,55,488,77,483,79" data-country="United States" data-state="NH" />';
			returnHTML += '	<area title="New Hampshire" shape="poly" coords="464,40,479,40,480,25,463,25" data-country="United States" data-state="NH" />';
			returnHTML += '	<area title="New Jersey" shape="poly" coords="459,127,464,120,459,112,460,107,465,110,468,121,465,130" data-country="United States" data-state="NJ" />';
			returnHTML += '	<area title="New Jersey" shape="poly" coords="479,127,479,114,493,114,493,128" data-country="United States" data-state="NJ" />';
			returnHTML += '	<area title="New Mexico" shape="poly" coords="126,237,138,175,190,180,186,235" data-country="United States" data-state="NM" />';
			returnHTML += '	<area title="New York" shape="poly" coords="417,102,423,91,436,90,443,84,443,74,458,62,463,80,466,93,466,101,450,95" data-country="United States" data-state="NY" />';
			returnHTML += '	<area title="North Carolina" shape="poly" coords="386,195,403,190,414,190,420,192,430,192,443,200,453,190,451,182,458,169,408,179" data-country="United States" data-state="NC" />';
			returnHTML += '	<area title="North Dakota" shape="poly" coords="196,62,201,31,251,34,255,66" data-country="United States" data-state="ND" />';
			returnHTML += '	<area title="Ohio" shape="poly" coords="372,143,370,118,379,117,386,121,394,118,403,112,404,122,405,136,394,145,380,149" data-country="United States" data-state="OH" />';
			returnHTML += '	<area title="Oklahoma" shape="poly" coords="239,213,225,208,225,184,196,182,196,178,273,184,275,214,257,218" data-country="United States" data-state="OK" />';
			returnHTML += '	<area title="Oregon" shape="poly" coords="12,77,69,91,75,72,73,64,83,54,80,49,42,45,26,33" data-country="United States" data-state="OR" />';
			returnHTML += '	<area title="Pennsylvania" shape="poly" coords="412,130,409,108,415,108,449,102,454,106,455,115,456,123,432,127" data-country="United States" data-state="PA" />';
			returnHTML += '	<area title="Rhode Island" shape="poly" coords="486,98,485,91,492,96" data-country="United States" data-state="RI" />';
			returnHTML += '	<area title="Rhode Island" shape="poly" coords="505,89,517,89,517,105,504,104" data-country="United States" data-state="RI" />';
			returnHTML += '	<area title="South Carolina" shape="poly" coords="420,224,396,200,411,194,418,198,426,197,436,204,430,216" data-country="United States" data-state="SC" />';
			returnHTML += '	<area title="South Dakota" shape="poly" coords="193,99,196,68,253,71,257,77,257,107,240,101" data-country="United States" data-state="SD" />';
			returnHTML += '	<area title="Tennessee" shape="poly" coords="325,199,332,188,399,178,389,186,373,195" data-country="United States" data-state="TN" />';
			returnHTML += '	<area title="Texas" shape="poly" coords="182,271,173,263,158,239,190,242,196,188,218,189,220,213,247,224,275,225,283,263,250,285,244,311,230,307,214,268,197,264" data-country="United States" data-state="TX" />';
			returnHTML += '	<area title="Utah" shape="poly" coords="90,158,102,104,121,108,119,122,137,125,132,166" data-country="United States" data-state="UT" />';
			returnHTML += '	<area title="Vermont" shape="poly" coords="440,37,456,37,457,54,440,54" data-country="United States" data-state="VT" />';
			returnHTML += '	<area title="Vermont" shape="poly" coords="470,82,464,61,476,57,474,80" data-country="United States" data-state="VT" />';
			returnHTML += '	<area title="Virginia" shape="poly" coords="396,174,400,168,409,168,416,165,422,152,433,140,440,141,447,155,455,165" data-country="United States" data-state="VA" />';
			returnHTML += '	<area title="Washington" shape="poly" coords="30,26,40,38,82,43,88,15,50,4,30,11" data-country="United States" data-state="WA" />';
			returnHTML += '	<area title="West Virginia" shape="poly" coords="404,163,396,156,403,145,409,139,416,137,418,143,426,138,418,150,411,162" data-country="United States" data-state="WV" />';
			returnHTML += '	<area title="Wisconsin" shape="poly" coords="314,107,309,100,307,90,296,80,295,73,304,62,321,67,332,72,332,84,333,90,334,107" data-country="United States" data-state="WI" />';
			returnHTML += '	<area title="Wyoming" shape="poly" coords="126,116,134,73,190,79,185,122" data-country="United States" data-state="WY" />';
			returnHTML += '</map>';
		}

		// Get the list of countries
		var countries = ihrAffiliatesMap.config.locations.map(function(location, index) {
			return location.country;
		});

		// De-duplicate
		countries = countries.filter(function(country,index) {
			return countries.indexOf(country) == index;
		});

		for(var i = 0; i < countries.length; i++) {
			var country = countries[i];

			returnHTML += '<h2 class="ihmStationLocationHeader">' + country + '</h2>';

			// Pluck out the states for the country
			var states = ihrAffiliatesMap.config.locations.filter(function(location, index) {
				if(location.country == country) {
					return location;
				}
			});

			// Sort the states alphabetically:
			states = states.sort(function(a, b) {
				if(a.state < b.state) return -1;
				if(a.state > b.state) return 1;
				return 0;
			})

			for(var j = 0; j < states.length; j++) {
				var location = states[j];

				if(!location.state) {
					location.state = country;
				}

				returnHTML += '<a href="#" data-state="' + location.state_id + '" data-country="' + location.country + '" class="ihmStationLocation">' + location.state + '</a>';
			}

		}

		returnHTML += '<br /><a href="#" data-state="all" data-country="all" class="ihmStationLocation">See All Stations</a>';

		// Container for results
		returnHTML += '<br /><div id="ihmStationLocationResults"></div>';

		return returnHTML;
	}

	/**
	 *  Get the HTML for the "Digital Streams" tab
	 */
	var getDigitalStreamsTabMarkup = function() {
		// Set up page for digital streams:
		var digitalStreamHTML = '<div class="ihmListenOnlineTitle">' + 
			'	Playing Now On <img height="25" alt="iHeartRadio" src="https://i.iheart.com/v3/re/new_assets/b4834873-60ab-427f-86e0-ec167fb72961">' + 
			'</div>' + 
			'<div class="ihmDigitalStreamsContainer">';

		for(var i = 0; i < ihrAffiliatesMap.config.streams.length; i++) {
			stream = ihrAffiliatesMap.config.streams[i];

			// Get rid of the word "null"
			stream.stream_name = stream.stream_name ? stream.stream_name : '';

			digitalStreamHTML += '<div class="ihmDigitalStream">' + 
			'	<div class="ihmDigitalStreamThumb" style="background-image:url(\'' + stream.stream_image + '\')">' + 
			'		<a target="_BLANK" href="' + stream.stream_url + '">&nbsp;</a>' + 
			'	</div>' + 
			'	<a href="' + stream.stream_url + '">' + stream.stream_name + '</a>' +  
			'</div>';
		}

		digitalStreamHTML += '</div>';

		return digitalStreamHTML;
	}

	var initPage = function() {
		loadCSS(ihrAffiliatesMap.config.main_css);

		if(ihrAffiliatesMap.config.css_file) {
			loadCSS(ihrAffiliatesMap.config.css_file);			
		}

		var pageHTML = getMapTabMarkup();

		// Is a fancy UI needed for the Streams data?
		if((ihrAffiliatesMap.config.streams && ihrAffiliatesMap.config.streams.length) || ihrAffiliatesMap.config.show_list_tab) {
			// Setup the default not-found message:
			if(!ihrAffiliatesMap.config.notfound_msg) {
				ihrAffiliatesMap.config.notfound_msg = 'No stations were found in this area. Please click <a onclick="document.getElementById(\'ihmTab_online\').click();return;" href="#">here</a> to see more listening options.';
			}

			// Put everything into the tabbed UI:
			pageHTML = '<div class="ihmTabsContainer">' + 
				'<div class="ihmTabs" id="ihmTabs">' + 
				'	<div class="ihmTab active" id="ihmTab_stations">'+  ihrAffiliatesMap.config.tab_title_map + '</div>' + 
				(ihrAffiliatesMap.config.show_list_tab === true ? '<div class="ihmTab" id="ihmTab_list">'+  ihrAffiliatesMap.config.tab_title_list + '</div>' : '') + 
				(ihrAffiliatesMap.config.streams !== false && ihrAffiliatesMap.config.streams.length > 0 ? '<div class="ihmTab" id="ihmTab_online">'+  ihrAffiliatesMap.config.tab_title_online + '</div>' : '') + 
				'</div>' + 
				'<div class="ihmTabPages" id="ihmTabPages">' + 
				'	<div class="ihmTabPage" id="ihmTabPage_stations">' +
						pageHTML + // Loaded with getTabMarkup() above
				'	</div>' + 
				(ihrAffiliatesMap.config.show_list_tab === true ? '<div class="ihmTabPage" id="ihmTabPage_list">' + getListTabMarkup() + '</div>' : '') +
				'	<div class="ihmTabPage" id="ihmTabPage_online" style="display:none;">' + 
						getDigitalStreamsTabMarkup() + 
				'	</div>' +
				'</div>';
		}
		else {
			// Setup the default not-found message:
			if(!ihrAffiliatesMap.config.notfound_msg) {
				ihrAffiliatesMap.config.notfound_msg = 'No stations were found in this area. Please check a different location or listen online at <a href="http://iheart.com" target="_BLANK">iHeartRadio</a>.';
			}
		}

		ihrAffiliatesMap.config.container.innerHTML = pageHTML;
		initTabs();
	}

	var initTabs = function() {
		var tabs  = ihrAffiliatesMap.config.container.querySelectorAll('.ihmTabs .ihmTab');
		var pages = ihrAffiliatesMap.config.container.querySelectorAll('.ihmTabPages .ihmTabPage');

		for (var i = 0; i < tabs.length; i++) {
			if (tabs[i].classList.contains('active')) {
				pages[i].style.display = 'block';
			}

			tabs[i].addEventListener('click', function(e) {
				for (i = 0; i < tabs.length; i++) {
					tabs[i].classList.remove('active');
					pages[i].style.display = 'none';
				}

				currentPage = document.getElementById('ihmTabPage_' + this.id.replace('ihmTab_', ''));

				this.classList.add('active');
				currentPage.style.display = 'block';

				google.maps.event.trigger(map, 'resize');
			});
		}

		if(window.location.hash) {
			hash = window.location.hash.replace('#', '');
			document.getElementById('ihmTab_' + hash).click();
		}

		/**
		 *  Additional setup work needed for the "List" tab, if displayed
		 */
		if(ihrAffiliatesMap.config.show_list_tab === true) {
			// Add click handlers for these:
			var locationLinks = ihrAffiliatesMap.config.container.querySelectorAll('a.ihmStationLocation, map#htl_list_map area');

			for (var i = 0; i < locationLinks.length; i++) {
				locationLinks[i].addEventListener('click', function(e) {
					// Update the list
					updateLocationList(this.getAttribute('data-state'), this.getAttribute('data-country'));
					e.preventDefault();
				});
			}

			// Also: click on default tab:
			if(ihrAffiliatesMap.config.default_tab == 'list') {
				document.getElementById('ihmTab_list').click();
			}
		}
	}

	/**
	 * Query the API for stations in this area and update the table in the locations tab 
	 */
	var updateLocationList = function(state, country) {
		loadScript(
			ihrAffiliatesMap.config.api_host + 'api/v1/stations/' + 
			encodeURIComponent(ihrAffiliatesMap.config.show_name) + '/' +  
			encodeURIComponent(state) + '/' + encodeURIComponent(country) + 
			'?callback=ihrAffiliatesMap.loadLocationStations'
		);
	}

	var setupMapLocation = function(callback) {
		if(ihrAffiliatesMap.config.geolocation === 'server') {
			// iHR provides geolocation info
			get(
				'https://api2.iheart.com/api/v1/account/getCountry',
				function(data) {
					data = JSON.parse(data);

					if(data.latitude && data.longitude) {
						console.log('GEOLOCATION: Using server method to point to %o', {lat: data.latitude, lng: data.longitude});
						return callback({lat: data.latitude, lng: data.longitude});
					}
				},
				null, // If the above fails, it should just use start_coords in the map constructor
				{ Accept: 'application/json' }
			);
		}
		else if(ihrAffiliatesMap.config.geolocation === 'browser') {
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					console.log('GEOLOCATION: Using browser method to point to %o', position.coords);
					callback({lat: position.coords.latitude, lng: position.coords.longitude});
				});

				return;
			}
		}

		console.log('GEOLOCATION: Using none method to point to %o', ihrAffiliatesMap.config.start_coords);
		callback(ihrAffiliatesMap.config.start_coords);
	}

	var setMapPosition = function(latlng) {
		if(map) {
			map.setCenter(latlng);
		}
	}

	var initMap = function() {
		map = new google.maps.Map(document.getElementById('ihmGoogleMap'), {
			center: ihrAffiliatesMap.config.start_coords,
			zoom: ihrAffiliatesMap.config.start_zoom,
			disableDefaultUI: true,
			disableDoubleClickZoom: true,
			zoomControl: true,
			styles: ihrAffiliatesMap.config.map_style,
		});


		// Center the map on the correct place:
		setupMapLocation(setMapPosition);

		// Call this now, otherwise the map *might* just be a gray box:
		google.maps.event.addListenerOnce(map, 'idle', function() {
			google.maps.event.trigger(map, 'resize');
		});

		// Get all the stations added to the map
		setupStations();

		// Update the listing when interacting with the map
		google.maps.event.addListener(map, 'tilesloaded', updateStationsList);
		google.maps.event.addListener(map, 'zoom_changed', updateStationsList);
		google.maps.event.addListener(map, 'bounds_changed', updateStationsList);

		// Set up search form
		var searchBox = new google.maps.places.Autocomplete(document.getElementById('locate_location_name'), { types: ['(regions)'] });
		map.addListener('bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		});

		searchBox.addListener('place_changed', function() {
			place = searchBox.getPlace();

			if(place.geometry.viewport) {
				map.setCenter(place.geometry.location);
				map.setZoom(7);
			}
			else {
				alert('No results found!');
			}
		}); 

		window.addEventListener('resize', function() {
			google.maps.event.trigger(map, 'resize');
		});

		//window.addEventListener('ready', function() {
		google.maps.event.trigger(map, 'resize');
		//});
	}

	var getStationTitle = function(station) {
		if(station.name) {
			return {
				title: station.name,
				subtitle: '<strong>' + station.frequency + ' (' + station.station + ')</strong><br />'
			}
		}

		// else
		return {
			title: station.station + ' (' + station.frequency + ')',
			subtitle: ''
		}
	}

	var setupStations = function() {
		// Add MarkerClusterer to map:
		loadScript(
			ihrAffiliatesMap.config.api_host + 'static/stations/markerclustererplus/src/markerclusterer.js',
			//TODO: Refactor this into smaller methods - one for markers, one for the rest
			function() {
				// Enable clustering?
				if(ihrAffiliatesMap.config.clustering !== false) {
					var markerCluster = new MarkerClusterer(map, [], {imagePath: ihrAffiliatesMap.config.api_host + 'static/stations/markerclustererplus/images/m'});
				}

				for(var i = 0; i < ihrAffiliatesMap.config.stations.length; i++) {
					var station = ihrAffiliatesMap.config.stations[i];

					if(typeof station == 'object') {
						img = '';
						style = 'ihmStationInfo ihmNoImage';

						if(station.logo) {
							img = '<div class="ihmImage"><img src="' + station.logo + '" alt="" width="80" /></div>';
							style = 'ihmStationInfo';
						}

						title = getStationTitle(station).title;
						subtitle = getStationTitle(station).subtitle;

						ihrAffiliatesMap.config.stations[i].title = title;

						var stationInfo = '<div class="' + style + '">' +
							img +
							'<div class="ihmStationInfoText">' +
							'<h3>' + title + '</h3>' +
							subtitle +
							'<strong>' + station.market + '</strong><br />' +
							station.time + '<br />' +
							'<a href="' + station.website + '" target="_BLANK">' + station.website + '</a><br />' +
							'</div></div>';

						ihrAffiliatesMap.config.stations[i].marker = new google.maps.Marker({
							position: {lat: station.coords.latitude, lng: station.coords.longitude},
							//map: map,
							title: station.station + ' (' + station.frequency + ')',
							info: stationInfo,
						});

						ihrAffiliatesMap.config.stations[i].marker.addListener('click', function() {
							if(typeof infoWindow == 'object') { infoWindow.close(); }
							infoWindow = new google.maps.InfoWindow({ content: this.info });
							infoWindow.open(map, this);
						});

						// Put the marker somewhere:
						if(ihrAffiliatesMap.config.clustering === false) {
							ihrAffiliatesMap.config.stations[i].marker.setMap(map);
						}
						else {
							markerCluster.addMarker(ihrAffiliatesMap.config.stations[i].marker);
						}
					}
				}
			}
		);

		if(document.getElementById("totalStations")) {
			document.getElementById("totalStations").innerHTML = ihrAffiliatesMap.config.stations.length;
		}
	}

	var isStationInView = function(station) {
		return map.getBounds().contains(station.marker.getPosition());
	}

	var updateStationsList = function() {
		var stationsInView = [];
		var stationsList = '';

		ihrAffiliatesMap.config.stations.forEach(function(station, index) {
			if(isStationInView(station)) {
				stationsInView.push(station);
				stationsList += station.marker.info;
			}
		});

		if(document.getElementById("inViewStations")) {
			document.getElementById("inViewStations").innerHTML = stationsInView.length;
		}

		var inViewStations = document.getElementById("ihmInViewStationsList");

		if(stationsInView.length === 0) {
			return inViewStations.innerHTML = '<div class="ihmNoStationsFound">' + ihrAffiliatesMap.config.notfound_msg + '</div>';
		}

		if(ihrAffiliatesMap.config.layout == 'table') {
			inViewStations.innerHTML = getTableHTML(stationsInView);

		}
		else {
			inViewStations.innerHTML = stationsList;
		}
	}

	var getTableHTML = function(stations) {
		var ihrAffiliatesTable = '<table class="ihmInViewStationsListTable">' + 
			'<thead><tr>' + 
			'<th class="ihmTableColLogo">&nbsp;</th>' + // Logo
			'<th class="ihmTableColStation">Station</th>' + 
			'<th class="ihmTableColMarket">Market</th>' + 
			'<th class="ihmTableColAirtime">Airtime</th>' + 
			'</tr></thead><tbody>';

		stations.forEach(function(station, index) {
			ihrAffiliatesTable += getTableRowHTML(station);
		});

		ihrAffiliatesTable += '</tbody></table>';

		return ihrAffiliatesTable;
	}


	var getTableRowHTML = function(station) {
		station.website_start_tag = station.website ? '<a target="_BLANK" href="' + station.website + '">' : '';
		station.website_end_tag   = station.website ? '</a>' : '';

		if(!station.title) {
			station.title = getStationTitle(station).title;
		}

		var tableRowHTML = '<tr>';
		tableRowHTML += '<td class="ihmTableColLogo">' + station.website_start_tag + (station.logo ? '<img width="48" src="' + station.logo + '" />' : '') + station.website_end_tag + '</td>';
		tableRowHTML += '<td class="ihmTableColStation">' + station.website_start_tag + station.title + station.website_end_tag + '</td>';
		tableRowHTML += '<td class="ihmTableColMarket">' + station.market + '<span class="ihmTableInlineAirtime"><br />' + station.time + '</span></td>';
		tableRowHTML += '<td class="ihmTableColAirtime">' + station.time + '</td>';
		tableRowHTML += '</tr>';

		return tableRowHTML;
	}


	return {
		initAffiliatesMap: function(options) {
			ihrAffiliatesMap.config = extend(default_config, options);

			// Load the map JS
			loadScript(
				'https://maps.googleapis.com/maps/api/js?key=' + ihrAffiliatesMap.config.maps_api_key + '&v=3&libraries=places',
				function() {
					loadScript(
						// Stations JSON
						ihrAffiliatesMap.config.api_host + 'api/v1/stations/' + encodeURIComponent(ihrAffiliatesMap.config.show_name) + '/all?callback=ihrAffiliatesMap.loadStations',
						function() {
							loadScript(
								// Digital streams JSON
								ihrAffiliatesMap.config.api_host + 'api/v1/streams/' + encodeURIComponent(ihrAffiliatesMap.config.show_name) + '?callback=ihrAffiliatesMap.loadStreams',
								function() {
									loadScript(
										// States/locations
										ihrAffiliatesMap.config.api_host + 'api/v1/states/' + encodeURIComponent(ihrAffiliatesMap.config.show_name) + '?callback=ihrAffiliatesMap.loadLocations',

										// Everything all loaded!
										function() {
											initPage();
											initMap();
										}
									)
								}
							);
						}
					);
				}
			);
		},

		// Load all stations (for map tab) into the application
		loadStations: function(data) {
			ihrAffiliatesMap.config.stations = data;
		},

		// Load all locations (city, state, for locations tab) into the application
		loadLocations: function(data) {
			if(ihrAffiliatesMap.config.show_list_tab !== false) {
				ihrAffiliatesMap.config.locations = (data.length > 0 ? data : false);
			}
		},

		// Load all streams (for streams tab) into the application
		loadStreams: function(data) {
			if(ihrAffiliatesMap.config.streams !== false) {
				ihrAffiliatesMap.config.streams = (data.length > 0 ? data : false);
			}
		},

		// Load requested stations into the DOM (for locations tab)
		loadLocationStations: function(data) {
			container = document.getElementById('ihmStationLocationResults');
			container.innerHTML = getTableHTML(data);

			if(window.jQuery && window.jQuery.animate) {
				window.jQuery('html, body').animate({ scrollTop: container.offsetTop }, 1000);
			}
			else {
				window.scrollTo({
					top: container.offsetTop,
					left: 0,
					behavior: 'smooth',
				});
			}
		},

		config: {},
	};
};
