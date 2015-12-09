angular.module('ionicApp', ['ionic','ngCordova'])
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
 
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('Registration', {
      url: '/Registration',
      templateUrl: 'templates/Registration.html',
      controller: 'RegCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('changepassword', {
      url: '/changepassword',
      templateUrl: 'templates/changepassword.html',
      controller :'ChngpwdCtrl'
    })
    .state('deleteAccount', {
      url: '/deleteAccount',
      templateUrl: 'templates/deleteAccount.html',
      controller :'delAccCtrl'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.Gallery', {
      url: '/Gallery',
      views: {
        'Gallery-tab': {
          templateUrl: 'templates/Gallery.html',
          controller: 'ExampleController'
        }
      }
    });


   $urlRouterProvider.otherwise('/sign-in');

})

.controller('SignInCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window, $state) {
  $scope.signIn = function(username,pwd) {
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/facecomm/collections/Users?q={"name":"'+username+'"}&f={"password":1}&fo=true&apiKey=5cj9ozUjYZWJR5JPG_ItUIKcJrIjHEli'
        })
        .success(function(data) {
            if (data.password == pwd) {
                $state.go('tabs.home');
            } else {
                alert("Invalid combination of Username and password");
            }
        })
        .error(function() {
            alert('Failed to find user '+username);
        });
        
    };
})
.controller('delAccCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window) {
   
    $scope.removeAcc = function(username,pwd) {
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/facecomm/collections/Users?q={"name":"'+username+'"}&f={"password":1,"_id":1}&fo=true&apiKey=5cj9ozUjYZWJR5JPG_ItUIKcJrIjHEli'
        })
        .success(function(data) {
            if (data.password == pwd) {
                $http({
                    method: 'DELETE',
                    url: 'https://api.mongolab.com/api/1/databases/facecomm/collections/Users/'+data._id.$oid+'?apiKey=5cj9ozUjYZWJR5JPG_ItUIKcJrIjHEli',
                    async: true
                })
                .success(function() {
                    $scope.Msg = "User "+username+" has been removed";
                })
                .error(function() {
                    alert("Failed to remove user");
                });
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to find user '+username);
        });
    }
})
.controller('RegCtrl', function($scope, $http, $httpParamSerializerJQLike) {
 $scope.pageClass = 'register';
 $scope.register = function(username, password, email, phone) {
$http({
    method: 'POST',
    url : 'https://api.mongolab.com/api/1/databases/facecomm/collections/Users?apiKey=5cj9ozUjYZWJR5JPG_ItUIKcJrIjHEli',
    data: JSON.stringify({
                name: username,
                password: password,
                email: email,
                phone: phone
            }),
    contentType: "application/json"
}).success(function() {
    $scope.username ="";
    $scope.password ="";
    $scope.email ="";
    $scope.phone ="";
    
    $scope.msg ="Registration successfull";
        })
}
 
})
.controller('ChngpwdCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window) {
 $scope.changePassword = function(email, pwdold, pwdnew) {
        console.log("RegCtrl: changePassword: Entered with: " + email + ", " + pwdold + ", " + pwdnew );
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/facecomm/collections/Users?q={"email":"'+email+'"}&f={"password":1}&fo=true&apiKey=5cj9ozUjYZWJR5JPG_ItUIKcJrIjHEli'
        })
        .success(function(data) {
            if (data.password == pwdold) {
                $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/facecomm/collections/Users?q={"email":"'+email+'"}&apiKey=5cj9ozUjYZWJR5JPG_ItUIKcJrIjHEli',
                    data: JSON.stringify({ "$set" : { "password": pwdnew } }),
                    contentType: 'Application/json'
                }) .success(function() {
                    $scope.displayMsg = "Password changed";
                }) .error(function() {
                    alert('Failed to update password');
                })
                        
            } else {
                alert('Old password is invalid');
            }
        })
        .error(function() {
            alert('Failed to find existing details for ' + email);
        })
        
 }
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
.controller('ExampleController',function($scope)
 {
$scope.images = [];
$scope.loadImages = function() {
for(var i = 0; i < 100; i++) {
$scope.images.push({id : i, src : "http://placehold.it/50x50"});
    }
  }
})
.controller('detectCtrl', function($scope) {
  console.log('detectCtrl');
})
.controller("PictureCtrl", function ($scope, $cordovaCamera) {
 
                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
            })
.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {
    $scope.collection = {
        selectedImage : ''
    };
    $ionicPlatform.ready(function() {
 $scope.getImageSaveContact = function() {       
        // Image picker will load images according to these settings
    var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
    };
 
    $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
        for (var i = 0; i < results.length; i++) {
            $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
 
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
                        $scope.addContact();    // Save contact
            console.log('Image URI: ' + results[i]);   // Print image URI
        });
        }
    }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
   });
        };  
 
    }); 
 
    $scope.contact = {     // We will use it to save a contact
 
        "displayName": "Gajotres",
        "name": {
            "givenName"  : "Dragannn",
            "familyName" : "Gaiccc",
            "formatted"  : "Dragannn Gaiccc"
        },
        "nickname": 'Gajotres',
        "phoneNumbers": [
            {
                "value": "+385959052082",
                "type": "mobile"
            },
            {
                "value": "+385914600731",
                "type": "phone"
            }               
        ],
        "emails": [
            {
                "value": "dragan.gaic@gmail.com",
                "type": "home"
            }
        ],
        "addresses": [
            {
                "type": "home",
                "formatted": "Some Address",
                "streetAddress": "Some Address",
                "locality":"Zagreb",
                "region":"Zagreb",
                "postalCode":"10000",
                "country":"Croatia"
            }
        ],
        "ims": null,
        "organizations": [
            {
                "type": "Company",
                "name": "Generali",
                "department": "IT",
                "title":"Senior Java Developer"
            }
        ],
        "birthday": Date("08/01/1980"),
        "note": "",
        "photos": [
            {
                "type": "base64",
                "value": $scope.collection.selectedImage
 
            }
        ],
        "categories": null,
        "urls": null
    }           
 
    $scope.addContact = function() {
        $cordovaContacts.save($scope.contact).then(function(result) {
            console.log('Contact Saved!');
        }, function(err) {
            console.log('An error has occured while saving contact data!');
        });
    };  
 
})
.controller('FaceDetectController', function($scope, $cordovaImagePicker, $ionicPlatform, $cordovaContacts) {
     $scope.collection = {
        selectedImage : ''
    };
    $ionicPlatform.ready(function() {
 $scope.getImageSaveContact = function() {       
        // Image picker will load images according to these settings
    var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
    };
 
    $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
        for (var i = 0; i < results.length; i++) {
            $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
 
                    window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
                        $scope.collection.selectedImage = base64;
            console.log('Image URI: ' + results[i]);   // Print image URI
        });
        }
    }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
   });
        };  
 
    })
    $scope.FCClientJS = function(apiKey, apiSecret) { 
	var _server = "http://api.skybiometry.com/fc/";
	var _format = "json";

	var _apiKey = null;
	var _apiSecret = null;

	if (isDefined(apiKey))
		_apiKey = apiKey;
	if (isDefined(apiSecret))
		_apiSecret = apiSecret;

	// Public methods

	this.facesDetect = function (urls, files, options, callback) {
		var method = "faces/detect";
		var params = {};

		if (isDefined(urls)) {
			params.urls = urls;
		}

		if (isDefined(options)) {
			if (isDefined(options.detector) && !isEmpty(options.detector)) params.detector = options.detector;
			if (isDefined(options.attributes) && !isEmpty(options.attributes)) params.attributes = options.attributes;
			if (isDefined(options.detect_all_feature_points) && !isEmpty(options.detect_all_feature_points)) params.detect_all_feature_points = options.detect_all_feature_points;
		}

		CallMethod(method, files, params, callback);
		return true;
	};

	this.facesGroup = function (userIds, urls, files, options, callback) {
		var method = "faces/group";
		var params = { uids: userIds };

		if (isDefined(urls)) {
			params.urls = urls;
		}

		if (isDefined(options)) {
			if (isDefined(options.namespace) && !isEmpty(options.namespace)) params.namespace = options.namespace;
			if (isDefined(options.detector) && !isEmpty(options.detector)) params.detector = options.detector;
			if (isDefined(options.attributes) && !isEmpty(options.attributes)) params.attributes = options.attributes;
			if (isDefined(options.threshold) && !isEmpty(options.threshold)) params.threshold = options.threshold;
			if (isDefined(options.limit) && !isEmpty(options.limit)) params.limit = options.limit;
			if (isDefined(options.return_similarities) && !isEmpty(options.return_similarities)) params.return_similarities = options.return_similarities;
			if (isDefined(options.detect_all_feature_points) && !isEmpty(options.detect_all_feature_points)) params.detect_all_feature_points = options.detect_all_feature_points;
		}

		CallMethod(method, files, params, callback);
		return true;
	};

	this.facesRecognize = function (userIds, urls, files, options, callback) {
		var method = "faces/recognize";
		var params = { uids: userIds };

		if (isDefined(urls))
			params.urls = urls;

		if (isDefined(options)) {
			if (isDefined(options.namespace) && !isEmpty(options.namespace)) params.namespace = options.namespace;
			if (isDefined(options.detector) && !isEmpty(options.detector)) params.detector = options.detector;
			if (isDefined(options.attributes) && !isEmpty(options.attributes)) params.attributes = options.attributes;
			if (isDefined(options.limit) && !isEmpty(options.limit)) params.limit = options.limit;
			if (isDefined(options.detect_all_feature_points) && !isEmpty(options.detect_all_feature_points)) params.detect_all_feature_points = options.detect_all_feature_points;
		}

		CallMethod(method, files, params, callback);
		return true;
	};

	this.facesTrain = function (userIds, options, callback) {
		var method = "faces/train";
		var params = { uids: userIds };

		if (isDefined(options)) {
			if (isDefined(options.namespace) && !isEmpty(options.namespace)) params.namespace = options.namespace;
		}

		CallMethod(method, null, params, callback);
		return true;
	};

	this.facesStatus = function (userIds, options, callback) {
		var method = "faces/status";
		var params = { uids: userIds };

		if (isDefined(options)) {
			if (isDefined(options.namespace) && !isEmpty(options.namespace)) params.namespace = options.namespace;
		}

		CallMethod(method, null, params, callback);
		return true;
	};

	this.tagsAdd = function (userId, url, x, y, width, height, options, callback) {
		var method = "tags/add";
		
		var params = {
			url: url,
			uid: userId,
			x: x,
			y: y,
			width: width,
			height:height
		};

		if (isDefined(options)) {
			if (isDefined(options.label) && !isEmpty(options.label)) params.label = options.label;
			if (isDefined(options.password) && !isEmpty(options.password)) params.password = options.password;
		}

		CallMethod(method, null, params, callback);
		return true;
	};


	this.tagsSave = function (tagIds, userId, options, callback) {
		var method = "tags/save";
		var params = { tids: tagIds, uid: userId };

		if (isDefined(options)) {
			if (isDefined(options.namespace) && !isEmpty(options.namespace)) params.namespace = options.namespace;
			if (isDefined(options.label) && !isEmpty(options.label)) params.label = options.label;
			if (isDefined(options.password) && !isEmpty(options.password)) params.password = options.password;
		}

		CallMethod(method, null, params, callback);
		return true;
	};

	this.tagsRemove = function (tagIds, options, callback) {
		var method = "tags/remove";
		var params = { tids: tagIds };

		if (isDefined(options)) {
			if (isDefined(options.password) && !isEmpty(options.password)) params.password = options.password;
		}

		CallMethod(method, null, params, callback);
		return true;
	};

	this.tagsGet = function (userIds, urls, photoIds, options, callback) {
		var method = "tags/get";
		var params = { uids: userIds, urls: urls, pids: photoIds };

		if (isDefined(options)) {
			if (isDefined(options.order) && !isEmpty(options.order)) params.order = options.order;
			if (isDefined(options.limit) && !isEmpty(options.limit)) params.limit = options.limit;
			if (isDefined(options.together) && !isEmpty(options.together)) params.together = options.together;
			if (isDefined(options.filter) && !isEmpty(options.filter)) params.filter = options.filter;
			if (isDefined(options.namespace) && !isEmpty(options.namespace)) params.namespace = options.namespace;
		}

		CallMethod(method, null, params, callback);
		return true;
	};

	this.accountAuthenticate = function (options, callback) {
		var method = "account/authenticate";
		var params = {};

		CallMethod(method, null, params, callback);
		return true;
	};

	this.accountUsers = function (namespaces, options, callback) {
		var method = "account/users";
		var params = {namespaces: namespaces};

		CallMethod(method, null, params, callback);
		return true;
	};

	this.accountNamespaces = function (options, callback) {
		var method = "account/namespaces";
		var params = {};

		CallMethod(method, null, params, callback);
		return true;
	};

	this.accountLimits = function (options, callback) {
		var method = "account/limits";
		var params = { };

		CallMethod(method, null, params, callback);
		return true;
	};

	this.getServer = function () {
		return _server;
	}

	this.setServer = function (server) {
		_server = server;
	}
	
	// Private methods

	function isDefined(s) { return (typeof s != "undefined" && s != undefined); }
	function isEmpty(s) { return (!isDefined(s) || s == null || s == ''); }

	function GetXmlHttpRequest()
	{
		var xmlhttp=false;
		/*@cc_on @*/
		/*@if (@_jscript_version >= 5)
		// JScript gives us Conditional compilation, we can cope with old IE versions.
		// and security blocked creation of the objects.
		 try {
		  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		 } catch (e) {
		  try {
		   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		  } catch (E) {
		   xmlhttp = false;
		  }
		 }
		@end @*/
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			try {
				xmlhttp = new XMLHttpRequest();
			} catch (e) {
				xmlhttp=false;
			}
		}
		if (!xmlhttp && window.createRequest) {
			xmlhttp = window.createRequest();
		}
		return xmlhttp;
	}

	function CallMethod(method, files, params, callback)
	{
		var url = _server + method + "." + _format;

		if (!isDefined(files)) {
			url += "?api_key=" + encodeURIComponent(_apiKey);
			if (isDefined(_apiSecret) && !isEmpty(_apiSecret)) {
				url += "&api_secret=" + encodeURIComponent(_apiSecret);
			}

			if (params != null) {
				for (param in params)
					url += "&" + param + "=" + encodeURIComponent(params[param]);
			}

			var request = Math.round(Math.random() * 10000000);
			var callbackName = "jsonp" + request;
			var responceId = "fcClientJsResponse" + request;
			window[callbackName] = function (data) {
				document.getElementById(responceId).parentNode.removeChild(document.getElementById(responceId));
				if (typeof callback == "function") {
					callback(data);
				}
			};
			url += "&callback=" + callbackName + "&" + request;

			var script = document.createElement("script");
			script.setAttribute("src", url);
			script.setAttribute("type", "text/javascript");
			script.setAttribute("id", responceId);
			document.body.appendChild(script);
		} else {
			var xhr = GetXmlHttpRequest();
			xhr.open("POST", url, true);
 
			if (params == null) params = { };
			params.api_key = _apiKey;
			if (isDefined(_apiSecret)) params.api_secret = _apiSecret;
			
			if (typeof FormData == 'undefined')
				throw "Only FormData is supported";
				
			var body = new FormData();
			for (param in params) {
				body.append(param, params[param]);
			}

			for (file in files) {
				body.append(file, files[file]);
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200 || xhr.status == 400) {
						if (typeof callback == "function") {
							callback(xhr.responseText);
						}
					}
					else throw "Invalid status returned from API server";
				}
			}

			xhr.send(body);
		}
	}
}
      
});

/*$(function() {
				function drawFacesAddPoint(control, imgWidth, imgHeight, point, title) {
					var x = Math.round(point.x * imgWidth / 100);
					var y = Math.round(point.y * imgHeight / 100);
					var pointClass = title == null ? "api_face_all_point" : "api_face_point";
					var pointStyle = 'top: ' + y + 'px; left: ' + x + 'px;';
					var pointTitle = (title == null ? '' : title + ': ') + 'X=' + x + ', Y=' + y + ', Confidence=' + point.confidence + '%' + (title == null ? ', Id=' + point.id.toString(16) : '');
					control.append($('<span class="' + pointClass + '" style="' + pointStyle + '" title="' + pointTitle + '"></span>'));
				}
				function drawFaces(div, photo, drawPoints) {
					if (!photo) {
						alert("No image found");
						return;
					}
					if (photo.error_message) {
						alert(photo.error_message);
						return;
					}
					var imageWrapper = $('<div class="image_wrapper"></div>').appendTo(div);
					var maxImgWidth = parseInt(div.prev().children(".img_max_width").html(), 10);
					var maxImgHeight = parseInt(div.prev().children(".img_max_height").html(), 10);
					var imgWidth = photo.width;
					var imgHeight = photo.height;
					var scaleFactor = Math.min(maxImgWidth / imgWidth, maxImgHeight / imgHeight);
					if (scaleFactor < 1) {
						imgWidth = Math.round(imgWidth * scaleFactor);
						imgHeight = Math.round(imgHeight * scaleFactor);
					}
					imageWrapper.append($('<img alt="face detection results" width="' + imgWidth + 'px" height="' + imgHeight + 'px" src="' + photo.url + '" />'));
					if (photo.tags) {
						for (var i = 0; i < photo.tags.length; ++i) {
							var tag = photo.tags[i];
							var tagWidth = tag.width * 1.5;
							var tagHeight = tag.height * 1.5;
							var width = Math.round(tagWidth * imgWidth / 100);
							var height = Math.round(tagHeight * imgHeight / 100);
							var left = Math.round((tag.center.x - 0.5 * tagWidth) * imgWidth / 100);
							var top = Math.round((tag.center.y - 0.5 * tagHeight) * imgHeight / 100);
							if (drawPoints && tag.points) {
								for (var p = 0; p < tag.points.length; p++) {
									drawFacesAddPoint(imageWrapper, imgWidth, imgHeight, tag.points[p], null);
								}
							}
							var tagStyle = 'top: ' + top + 'px; left: ' + left + 'px; width: ' + width + 'px; height: ' + height + 'px; transform: rotate(' +
								tag.roll + 'deg); -ms-transform: rotate(' + tag.roll + 'deg); -moz-transform: rotate(' + tag.roll + 'deg); -webkit-transform: rotate(' +
								tag.roll + 'deg); -o-transform: rotate(' + tag.roll + 'deg)';
							var apiFaceTag = $('<div class="api_face" style="' + tagStyle + '"><div class="api_face_inner"><div class="api_face_inner_tid" name="' + tag.tid + '"></div></div></div>').appendTo(imageWrapper);
							if (drawPoints) {
								if (tag.eye_left) drawFacesAddPoint(imageWrapper, imgWidth, imgHeight, tag.eye_left, "Left eye");
								if (tag.eye_right) drawFacesAddPoint(imageWrapper, imgWidth, imgHeight, tag.eye_right, "Right eye");
								if (tag.mouth_center) drawFacesAddPoint(imageWrapper, imgWidth, imgHeight, tag.mouth_center, "Mouth center");
								if (tag.nose) drawFacesAddPoint(imageWrapper, imgWidth, imgHeight, tag.nose, "Nose tip");
							}
						}
					}
				}
				function callback(data) {
					drawFaces($("#conent_demo_image"), data.photos[0], true);
				}
				var client = new FCClientJS('17d4ac7292f24bfd914415e9034a1a0e','13356851f7e0476494e26763697cd6e9');
				var options = new Object();
				options.detect_all_feature_points = true;
				client.facesDetect("http://www.bestwestern.com/img/bg-groups-meetings.png", null, options, callback)
			});*/