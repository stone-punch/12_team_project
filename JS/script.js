// documaent = html 그 자체 
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');


searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {

  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
searchInputEl.addEventListener('blur', function () {

  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


//메인 지도 부분
let x_ln = 33.476343;
let y_ln = 126.534805;


/*https://github.com/fridaygmman/information-blog/blob/master/_posts/2020-01-26-hosinfo.html
    여기 참고해서 인포윈도우 설계할 것

*/








var $area = document.querySelectorAll('.area > path');
for (let i = 0; i < 13; i++) {
  $area[i].addEventListener('click', function () {
    console.log('area' + i);
    switch (i) {
      case 0:
        x_ln = 33.476343;
        y_ln = 126.534805;
        var positions = [{
            content: 'test 1',
            lating: new kakao.maps.LatLng(33.476095, 126.537977)
          },
          {
            content: 'test 2',
            lating: new kakao.maps.LatLng(33.477035, 126.540450)
          },
          {
            content: 'test 3',
            lating: new kakao.maps.LatLng(33.472789, 126.539465)
          },
          {
            content: 'test 4',
            lating: new kakao.maps.LatLng(33.474854, 126.533909)
          }
        ];
        break;
      case 1:
        x_ln = 33.485557;
        y_ln = 126.681193;
        var positions = [{
            lating: new kakao.maps.LatLng(33.490017, 126.676519)
          },
          {
            lating: new kakao.maps.LatLng(33.489049, 126.677565)
          },
          {
            lating: new kakao.maps.LatLng(33.487602, 126.680346)
          },
          {
            lating: new kakao.maps.LatLng(33.485846, 126.678267)
          }
        ];
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

    for (var j = 0; j < positions.length; j++) {
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[j].lating, // 마커를 표시할 위치

      });
      var overlay = new kakao.maps.CustomOverlay({
        content: '<div class="board">' +
          '<div class="name">' + positions[j].content +
          '    <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
          '</div>' +
          '    <div class="info">test_info</div>' +
          '</div>',
        map: map,
        position: marker.getPosition()
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
      });
      var close_btn = document.createElement('button');
      close_btn.onclick = function () {
        overlay.setMap(null);
      };


    }

    /*
                        var content =
                                    '<div class="board">' +
                                    '    <div class="name">' + positions[j].content + '</div>' + 
                                    '<div class="close" onclick="closeOverlay()" title="닫기"></div>' +
                                    '    </div>' +
                                    '    <div class="info"></div>' +
                                    '</div>';

                        var overlay = new kakao.maps.CustomOverlay({
                            content: content,
                            map: map,
                            position: marker.getPosition()
                        });

*/

    var close_btn = document.createElement('button');
    close_btn.onclick = function () {
      overlay.setMap(null);
    };

    // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
    function closeOverlay() {
      overlay.setMap(null);
    }

  });
}
//메인 지도 부분