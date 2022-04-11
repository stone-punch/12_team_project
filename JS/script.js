let x_ln = 33.476343;
let y_ln = 126.534805;

var $area = document.querySelectorAll('.area > path');
for (let i = 0; i < 13; i++) {
    $area[i].addEventListener('click', function() {
        console.log('area' + i);
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
        console.log(x_ln);
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(x_ln, y_ln), // 지도의 중심좌표
                level: 4 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption);
    });
}