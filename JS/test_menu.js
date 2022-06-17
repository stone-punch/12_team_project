
var $area = document.querySelectorAll('.area > path');

var $b_init = document.querySelector('.init');
var $b1 = document.querySelector('.b1');
var $b2 = document.querySelector('.b2');
var $b3 = document.querySelector('.b3');
var $b4 = document.querySelector('.b4');

var distance = 45;


//------------------ 위경도 좌표 기준 거리 측정을 위한 함수---------------------------------------------------------
function xy_do(x){
    var x_do = Math.trunc(x);
    return x_do;
}
function xy_bun(x){
    var x_do = Math.trunc(x);    
    var x_bun = Math.trunc( (x-x_do)*60 ); 
    return x_bun;
}

function xy_cho(x){
    var x_do = Math.trunc(x);    
    var x_bun = Math.trunc( (x-x_do)*60 ); 
    var x_cho_pre = (((x-x_do)*60 - x_bun)*60);
    var x_cho = x_cho_pre.toFixed(2);
    return x_cho;
}

function distance_check(f_x, f_y, s_x, s_y){
    var x_minus = ((xy_do(f_x) - xy_do(s_x))*111.3) + ((xy_bun(f_x) - xy_bun(s_x))*1.86) + ((xy_cho(f_x)-xy_cho(s_x))*0.031);
    var y_minus = ((xy_do(f_y) - xy_do(s_y))*88.9) + ((xy_bun(f_y) - xy_bun(s_y))*1.48) + ((xy_cho(f_y)-xy_cho(s_y))*0.025);
    var distance =  Math.sqrt(Math.pow(x_minus,2) + Math.pow(y_minus,2));
    return distance ;
}
//------------------------------------------------------------------------------------------------------------------------


// 제주도 지역별 중심좌표 목록-----------------------------------------------------------------------------------------------
var x_l = [33.476343,33.485557,33.503121,33.414138, 33.370309, 33.320452,
    33.258381, 33.284104, 33.293918, 33.260484, 33.324807, 33.383443, 33.423513];
var y_l = [126.534805, 126.681193, 126.790730, 126.873264, 126.777187, 126.672459,
    126.559518, 126.449291, 126.340335, 126.236426, 126.215096, 126.279222, 126.378670];
// -------------------------------------------------------------------------------------------------------------------------


// 포인트 마커 정의
var point_marker = new kakao.maps.Marker({}); 
    
// 카카오 맵 설정
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(33.476343, 126.534805), // 지도의 중심좌표
                level: 8, // 지도의 확대 레벨
                disableDoubleClickZoom: true,

            };
var map = new kakao.maps.Map(mapContainer, mapOption);


// ==========포인트 마커==========================================================
// 포인트 마커 출력
function point_marker_set(){
    var point_markerImage = new kakao.maps.MarkerImage(
    './marker_img/point_marker.png',
    new kakao.maps.Size(50, 50), new kakao.maps.Point(25, 25));
    point_marker.setImage(point_markerImage);

    kakao.maps.event.addListener(map, 'dblclick', function pointing(mouseEvent) {       
            
        
        // 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng; 
        
        // 마커 위치를 클릭한 위치로 옮깁니다
        point_marker.setPosition(latlng);
        point_marker.setMap(map);
        return latlng;
        
        
    });
    }

// 포인트 마커의 좌표 반환
    function point(){
        var point_latlng = point_marker.getPosition();
        var point_lat = point_latlng.getLat();
        var point_lng = point_latlng.getLng();


        // console.log(point_lat);
        // console.log(point_lng);

        return point_latlng;
    }

// 카카오 맵에 이벤트를 등록해서 포인트 마커가 찍힐때마다 죄표 반환 
    kakao.maps.event.addListener(map,'dblclick',point);


// 시작할때 마커 출력 함수( if문을 통한 거리제한이 없음 )
    function start_marker_set(){
        for(var i=0; i<place_data.length; i++){
    
    
            // if(point_lat == 33.474968900881905){
            //     point_lat = 33.284104;
            //     point_lng = 126.449291;
            // }
    
    
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
    
            
                marker.setMap(map);
           
    
            
        }
    }


// 기본 마커 출력 함수 ( if문을 통해 거리제한 존재 )
function marker_set(){
    for(var i=0; i<place_data.length; i++){

        var dis =  distance_check( point().getLat(), point().getLng(), place_data[i].y, place_data[i].x );

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

        
        if(dis<distance){
            marker.setMap(map);
        }

        
    }
}

start_marker_set();
point_marker_set();

// 초기화 버튼
$b_init.addEventListener('click',()=>{
    start_marker_set();
    point_marker_set();
    map.setCenter(new kakao.maps.LatLng(33.476343, 126.534805));
    map.setLevel(8)
})

// 1km 버튼
$b1.addEventListener('click',()=>{
    distance = 1;
    map = new kakao.maps.Map(mapContainer, mapOption);
    
    marker_set();
    point_marker_set()
    map.setCenter(point());
});

// 5km 버튼
$b2.addEventListener('click',()=>{
    distance = 5;
    map = new kakao.maps.Map(mapContainer, mapOption);
    
    marker_set();
    point_marker_set()
    map.setCenter(point());
});

// 10km 버튼
$b3.addEventListener('click',()=>{
    distance = 10;
    map = new kakao.maps.Map(mapContainer, mapOption);
    
    marker_set();
    point_marker_set()
    map.setCenter(point());
});

// 15km 버튼
$b4.addEventListener('click',()=>{
    distance = 15;
    map = new kakao.maps.Map(mapContainer, mapOption);
    
    marker_set();
    point_marker_set()
    map.setCenter(point());
});


// 지도 그림에 지역별 중심좌표로 이동하는 이벤트 적용
for(let i=0; i<13; i++){
    $area[i].addEventListener('click',()=>{
        map.setCenter(new kakao.maps.LatLng(x_l[i], y_l[i]));
        //console.log(x_l[i], y_l[i]);
    });
}




