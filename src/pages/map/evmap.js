import React, { useEffect } from "react";

const MapPage = () => {
  useEffect(() => {
    const loadMapScript = async () => {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=f5d45574356b33ae4bd86ce332d94514";

      // API 로드 후 실행될 콜백 함수
      script.onload = () => {
        // 카카오 지도 API를 사용하여 지도를 생성합니다.
        var mapContainer = document.getElementById("map"); // 지도를 표시할 div
        var mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      };

      // 스크립트를 body 요소의 맨 끝에 추가합니다.
      document.body.appendChild(script);

      // 컴포넌트가 언마운트될 때 API 스크립트를 제거합니다.
      return () => {
        document.body.removeChild(script); // 추가된 스크립트를 역순으로 제거합니다.
      };
    };

    loadMapScript();
  }, []);

  return (
    <div className="map-container">
      <div id="map" style={{ width: "832px", height: "600px" }}></div>
      <h3>카카오에서 불러온 지도 API</h3>
    </div>
  );
};

export default MapPage;
