import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // 검색 아이콘
import { API_BASE_URL } from "../../components/config";

import "./evmap.css";

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [stations, setStations] = useState([]); // 충전소 데이터를 저장할 상태
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태
  const [markers, setMarkers] = useState([]); // 마커를 저장할 상태
  const [activeButton, setActiveButton] = useState(null);
  const distanceButtonRef = useRef(null);
  const priceButtonRef = useRef(null);

  useEffect(() => {
    loadMapScript();
    loadStations(); // 충전소 데이터 로드
  }, []);

  const loadMapScript = async () => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f5d45574356b33ae4bd86ce332d94514&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(36.627579, 127.456261),
          level: 3,
        };

        const createdMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(createdMap);
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener("load", onLoadKakaoMap);
      document.head.removeChild(mapScript);
    };
  };

  // 충전소 데이터 로드
  const loadStations = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/chargerlocation/all`
      );
      console.log("API response received:", response);

      if (!Array.isArray(response.data.data)) {
        console.error("API response data is not an array:", response.data.data);
        return;
      }

      const transformedStations = response.data.data.map((station) => ({
        id: station.id,
        name: station.name,
        latitude: station.latitude,
        longitude: station.longitude,
        price: station.price,
      }));

      console.log("Transformed Stations:", transformedStations);
      setStations(transformedStations);
    } catch (error) {
      console.error("Error loading station data:", error);
    }
  };

  // 거리 계산 함수
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180); // 위도 차이 (라디안)
    const dLon = (lon2 - lon1) * (Math.PI / 180); // 경도 차이 (라디안)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 거리 (단위: km)
    return distance;
  };

  const handleSearch = () => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
          findNearbyStations(coords);

          const imageSrc = "./images/evcar.png"; // 이미지 경로
          const imageSize = new window.kakao.maps.Size(20); // 이미지 크기
          const imageOption = { offset: new window.kakao.maps.Point(15, 15) }; // 이미지 옵션
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );
          const marker = new window.kakao.maps.Marker({
            position: coords,
            map: map,
            image: markerImage,
          });
        } else {
          alert("검색 결과가 없습니다. 주소를 다시 확인해주세요.");
        }
      });
    });
  };

  // 주변 충전소 찾기 및 정렬
  const findNearbyStations = (coords) => {
    const radius = 0.5; // 0.5km 이내의 충전소만 검색
    const nearbyStations = stations.filter((station) => {
      const distance = calculateDistance(
        coords.getLat(),
        coords.getLng(),
        station.latitude,
        station.longitude
      );
      station.distance = distance; // 충전소에 거리 정보 추가
      return distance <= radius;
    });

    nearbyStations.sort((a, b) => a.distance - b.distance);

    setSearchResults(nearbyStations);
    console.log("Search Results after filtering:", nearbyStations);
    displayMarkers(nearbyStations);

    const centerLatLng = map.getCenter();
    const mapElement = document.getElementById("map");
    const mapHeight = mapElement.clientHeight; // 지도의 높이
    const carIconHeight = 100; // 자동차 아이콘의 세로 크기
    const offsetY = mapHeight * -0.18 - carIconHeight; // 세로 이동량 (지도 높이의 70% 지점에 위치)
    const markerPosition = new window.kakao.maps.LatLng(
      centerLatLng.getLat() + offsetY / 20000, // 좌표 이동에 따른 보정값 추가
      centerLatLng.getLng()
    );

    const marker = new window.kakao.maps.Marker({ position: markerPosition });
    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  };

  // 마커 표시
  const displayMarkers = (stations) => {
    const newMarkers = [];

    stations.forEach((station) => {
      const markerPosition = new window.kakao.maps.LatLng(
        station.latitude,
        station.longitude
      );
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${
          station.name
        }<br/>거리: ${station.distance.toFixed(2)}km<br/>비회원: ${
          station.price
        }원</div>`,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    console.log("Markers displayed:", newMarkers);
    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
  };

  // 거리순 정렬 버튼 클릭 시
  const handleSortByDistance = () => {
    setActiveButton("distance");
    const coords = map.getCenter();
    findNearbyStations(coords);
    distanceButtonRef.current.style.backgroundColor = "#12b48d";
    priceButtonRef.current.style.backgroundColor = "";
  };

  // 요금순 정렬 버튼 클릭 시
  const handleSortByPrice = () => {
    setActiveButton("price");
    const sortedStations = [...searchResults].sort((a, b) => a.price - b.price);
    setSearchResults(sortedStations);
    displayMarkers(sortedStations);
    priceButtonRef.current.style.backgroundColor = "#12b48d";
    distanceButtonRef.current.style.backgroundColor = "";
  };

  // 마커를 클릭했을 때 충전소 정보 표시
  const handleMarkerClick = (station) => {
    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:12px;">${
        station.name
      }<br/>거리: ${station.distance.toFixed(2)}km<br/>비회원: ${
        station.price
      }원</div>`,
    });
    console.log("Search Results on marker click:", searchResults);

    const markerPosition = new window.kakao.maps.LatLng(
      station.latitude,
      station.longitude
    );
    infowindow.open(
      map,
      new window.kakao.maps.Marker({ position: markerPosition })
    );
  };

  return (
    <div className="map-container">
      <div className="mapsearch-form">
        <div className="search-top">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="주소를 입력하세요"
          />
          <button onClick={handleSearch} className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="search-mid">
          <ul>
            {searchResults.map((station) => (
              <li key={station.id} onClick={() => handleMarkerClick(station)}>
                <div className="stationInfo">
                  <div className="stationName">
                    <span>{station.name}</span>
                  </div>
                  <div className="stationData">
                    <span>{station.distance.toFixed(2)}km</span>
                    <span>비회원 {station.price}원</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="search-end">
          <button
            ref={distanceButtonRef}
            onClick={handleSortByDistance}
            style={{
              backgroundColor: activeButton === "distance" ? "#12b48d" : "",
              color: activeButton === "distance" ? "white" : "black", // 버튼이 활성화된 경우 폰트 색상을 흰색으로 설정
            }}
          >
            거리순
          </button>
          <button
            ref={priceButtonRef}
            onClick={handleSortByPrice}
            style={{
              backgroundColor: activeButton === "price" ? "#12b48d" : "",
              color: activeButton === "price" ? "white" : "black", // 버튼이 활성화된 경우 폰트 색상을 흰색으로 설정
            }}
          >
            요금순
          </button>
        </div>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default MapPage;
