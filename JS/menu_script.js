
var $area = document.querySelectorAll('.area > path');


for (let i = 0; i < 13; i++) {
    $area[i].addEventListener('click', function() {
        
        switch (i) {
            case 0:
                x_ln = 33.476343;
                y_ln = 126.534805;
                break;
            case 1:
                x_ln = 33.485557;
                y_ln = 126.681193;
                break;
            case 2:
                x_ln = 33.503121;
                y_ln = 126.790730;
                break;
            case 3:
                x_ln = 33.414138;
                y_ln = 126.873264;
                break;
            case 4:
                x_ln = 33.370309;
                y_ln = 126.777187;
                break;
            case 5:
                x_ln = 33.320452;
                y_ln = 126.672459;
                break;
            case 6:
                x_ln = 33.258381;
                y_ln = 126.559518;
                break;
            case 7:
                x_ln = 33.284104;
                y_ln = 126.449291;
                break;
            case 8:
                x_ln = 33.293918;
                y_ln = 126.340335;
                break;
            case 9:
                x_ln = 33.260484;
                y_ln = 126.236426;
                break;
            case 10:
                x_ln = 33.324807;
                y_ln = 126.215096;
                break;
            case 11:
                x_ln = 33.383443;
                y_ln = 126.279222;
                break;
            case 12:
                x_ln = 33.423513;
                y_ln = 126.378670;
                break;
            default:
                x_ln = 33.423513;
                y_ln = 126.378670;
                break;
        }
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(x_ln, y_ln), // 지도의 중심좌표
                level: 8 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);

        
    

        for (var j = 0; j < place_data.length; j++) {
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(place_data[j].y, place_data[j].x), // 마커를 표시할 위치
            });
            
          
            /* 지도 출력시에 div크기 자동 변경*/
            var mapContainer = document.querySelector('.map-container');
            //mapContainer.style.width = '700px';
            mapContainer.style.height = '1000px'; 
            map.relayout();
           
            var CustomOverlay = new kakao.maps.CustomOverlay({
                position: marker.getPosition()
            });

            var Customcontent = document.createElement('div');
			Customcontent.className = "board";

            // 업체 이름 content_name > name_board
            var content_name = document.createElement("div"); // content_name
            content_name.className = "name";
            if(place_data[j].code == "AD5"){
                content_name.classList.add('blue');
                var markerImage = new kakao.maps.MarkerImage(
                    './marker_img/blue_marker.png',
                    new kakao.maps.Size(26, 40), new kakao.maps.Point(13, 39));
                marker.setImage(markerImage);
                
            }
            else if(place_data[j].code == 'FD6'){
                content_name.classList.add('green');
                var markerImage = new kakao.maps.MarkerImage(
                    './marker_img/green_marker.png',
                    new kakao.maps.Size(26, 40), new kakao.maps.Point(13, 39));
                marker.setImage(markerImage);
            }
            else if(place_data[j].code == 'CE7'){
                content_name.classList.add('beige');
                var markerImage = new kakao.maps.MarkerImage(
                    './marker_img/beige_marker.png',
                    new kakao.maps.Size(26, 40), new kakao.maps.Point(13, 39));
                marker.setImage(markerImage);
            }
            else{
                content_name.classList.add('none');
                var markerImage = new kakao.maps.MarkerImage(
                    './marker_img/gray_marker.png',
                    new kakao.maps.Size(26, 40), new kakao.maps.Point(13, 39));
                marker.setImage(markerImage);

            }

            var name_board = document.createElement("div"); // name_board
            name_board.className = "name_board";
            name_board.appendChild(document.createTextNode(place_data[j].name));
            content_name.appendChild(name_board);
            Customcontent.appendChild(content_name);

            // 닫기 버튼
            var close_btn = document.createElement("div");
			close_btn.className = "close";
			close_btn.setAttribute("name","닫기");
			content_name.appendChild(close_btn);

            // 업체 정보 info > info_address | info_phone
            var info = document.createElement("div");            // info
            info.className = "info";
            var info_address = document.createElement("div");    // info_address
            info_address.className = "info_address";
            var info_phone = document.createElement("div");    // info_phone
            info_phone.className = "info_phone";
            var info_button = document.createElement("button");    // info_button
            info_button.className = "info_button";
            info_address.appendChild(document.createTextNode(place_data[j].address_name));
            info_phone.appendChild(document.createTextNode(place_data[j].phone));
            Customcontent.appendChild(info);
            info.appendChild(info_address);
            info.appendChild(info_phone);
            info.appendChild(info_button);

            CustomOverlay.setContent(Customcontent);

            (function(marker, CustomOverlay) {
                close_btn.onclick = function() { CustomOverlay.setMap(null); };
            // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
                kakao.maps.event.addListener(marker, 'click', function() {
                    CustomOverlay.setMap(map);
                    
            });
            })(marker, CustomOverlay);
           
            //CustomOverlay.setMap(null);
            
        }

        var close_btn = document.createElement('button');
        close_btn.onclick = function() {
            overlay.setMap(null);
        };

    });
}