
var $area = document.querySelectorAll('.area > path');

var $b1 = document.querySelector('.b1');
var $b2 = document.querySelector('.b2');

var distance = 1;

var x_l = [33.476343,33.485557,33.503121,33.414138, 33.370309, 33.320452,
    33.258381, 33.284104, 33.293918, 33.260484, 33.324807, 33.383443, 33.423513];
var y_l = [126.534805, 126.681193, 126.790730, 126.873264, 126.777187, 126.672459,
    126.559518, 126.449291, 126.340335, 126.236426, 126.215096, 126.279222, 126.378670];

    var point_marker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        //position: new kakao.maps.LatLng(33.476343, 126.534805)
        //position: map.getCenter() 
    }); 
    

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(33.476343, 126.534805), // 지도의 중심좌표
                level: 8, // 지도의 확대 레벨
                disableDoubleClickZoom: true,
                point_position: point_marker.getPosition()
            };
var map = new kakao.maps.Map(mapContainer, mapOption);

// ==========포인트 마커==========================================================

function point_marker_set(){
    var point_markerImage = new kakao.maps.MarkerImage(
    './marker_img/point_marker.png',
    new kakao.maps.Size(50, 50), new kakao.maps.Point(25, 25));
    point_marker.setImage(point_markerImage);

    kakao.maps.event.addListener(map, 'dblclick', function(mouseEvent) {       
            
        
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng; 
        
        // 마커 위치를 클릭한 위치로 옮깁니다
        point_marker.setPosition(latlng);
        point_marker.setMap(map);
        
    });
}




var point_latlng = point_marker.getPosition();
var point_lat = point_latlng.getLat();
var point_lng = point_latlng.getLng();

console.log(point_lat);

function marker_set(){
    for(var i=0; i<place_data.length; i++){


        if(point_lat == 33.474968900881905){
            point_lat = 33.476343;
            point_lng = 126.534805;
        }

        var multi =  (place_data[i].y - point_lat)*(place_data[i].y - point_lat) + (place_data[i].x - point_lng)*(place_data[i].x - point_lng) ;
        var root = Math.sqrt(multi);

        var marker = new kakao.maps.Marker({
            //map: map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(place_data[i].y, place_data[i].x), // 마커를 표시할 위치
        });
    
        var CustomOverlay = new kakao.maps.CustomOverlay({
            position: marker.getPosition()
        });
        
        marker.setMap(null);

        var Customcontent = document.createElement('div');
        Customcontent.className = "board";
    
        // 업체 이름 content_name > name_board
        var content_name = document.createElement("div"); // content_name
        content_name.className = "name";
        if(place_data[i].code == "AD5"){
            content_name.classList.add('blue');
            var markerImage = new kakao.maps.MarkerImage(
                './marker_img/blue_marker.png',
                new kakao.maps.Size(26, 40), new kakao.maps.Point(13, 39));
            marker.setImage(markerImage);
            
        }
        else if(place_data[i].code == 'FD6'){
            content_name.classList.add('green');
            var markerImage = new kakao.maps.MarkerImage(
                './marker_img/green_marker.png',
                new kakao.maps.Size(26, 40), new kakao.maps.Point(13, 39));
            marker.setImage(markerImage);
        }
        else if(place_data[i].code == 'CE7'){
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
        name_board.appendChild(document.createTextNode(place_data[i].name));
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
        info_address.appendChild(document.createTextNode(place_data[i].address_name));
        info_phone.appendChild(document.createTextNode(place_data[i].phone));
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

        
        if(root<distance){
            marker.setMap(map);
        }

        
    }
}

marker_set();
point_marker_set();

$b1.addEventListener('click',()=>{
    distance = 1;
    map = new kakao.maps.Map(mapContainer, mapOption);
    marker_set();
    point_marker_set()
});


// 지도 초기화 기능 필요함
$b2.addEventListener('click',()=>{
    distance = 0.15;
    map = new kakao.maps.Map(mapContainer, mapOption);
    marker_set();
    point_marker_set()
});

var $b3 = document.querySelector('.b3');
// 지도 초기화 기능 필요함

$b3.addEventListener('click',()=>{
    distance = 0.01;
    map = new kakao.maps.Map(mapContainer, mapOption);
    
    point_marker_set();
    marker_set();
    
});






for(let i=0; i<13; i++){
    $area[i].addEventListener('click',()=>{
        map.setCenter(new kakao.maps.LatLng(x_l[i], y_l[i]));
        //console.log(x_l[i], y_l[i]);
    });
}






