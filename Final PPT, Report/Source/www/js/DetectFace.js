			$(function() {
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
				client.facesDetect("http://power.eecs.berkeley.edu/images/GroupPhoto2007.jpg", null, options, callback)
			});