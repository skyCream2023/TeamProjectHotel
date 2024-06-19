import { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function StandardRoom() {
  const [changePage, setChangePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { unityProvider, isLoaded, unload } = useUnityContext({
    loaderUrl: "Standard/Standard.loader.js",
    dataUrl: "Standard/Standard.data",
    frameworkUrl: "Standard/Standard.framework.js",
    codeUrl: "Standard/Standard.wasm",
  });

  useEffect(() => {
    if (isLoaded) {
      console.log("셋로딩");
      setLoading(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (changePage !== 3 && !isLoaded) {
      setLoading(true);
    }
  }, [changePage, isLoaded]);

  const changeP1 = () => setChangePage(1);
  const changeP2 = () => setChangePage(2);
  const changeP3 = async () => {
    if (isLoaded) {
      await unload();
      setLoading(true);
    }
    setChangePage(3);
  };

  return (
    <div className="content">
      <h1 className="content-title">STANDARD</h1>
      <div className="content-box">
        <img src="./images/standardBed.jpg" alt="bedRoom" />
      </div>
      <div className="list-select">
        <div onClick={changeP1} className="list-select-object">
          <span
            style={{ borderBottom: changePage === 1 ? "solid 3px black" : "" }}
            className="list-select-object-text"
          >
            객실내역
          </span>
        </div>
        <div onClick={changeP2} className="list-select-object">
          <span
            style={{ borderBottom: changePage === 2 ? "solid 3px black" : "" }}
            className="list-select-object-text"
          >
            배치품목
          </span>
        </div>
        <div onClick={changeP3} className="list-select-object">
          <span
            style={{ borderBottom: changePage === 3 ? "solid 3px black" : "" }}
            className="list-select-object-text"
          >
            시뮬레이터
          </span>
        </div>
      </div>

      {changePage === 1 && (
        <div className="list">
          <div className="content-text">ROYAL HOTEL</div>
          <div className="content-text2">도심 속 작은 휴식터</div>
          <div className="bathroom">
            <img src="./images/standardBath.jpg" alt="bathroom" />
          </div>
          <span className="bathroom-text">어디서도 경험하지 못한 청결함</span>
          <div className="breakfast">
            <img
              className="breakfast-img"
              src="./images/breakfast.jpg"
              alt="breakfast"
            />
          </div>
          <span className="breakfast-text">어디서도 경험하지 못한 청결함</span>
          <div className="object">
            <img
              className="object-img"
              src="./images/object.jpg"
              alt="object"
            />
          </div>
          <span className="object-text">어디서도 경험하지 못한 청결함</span>
        </div>
      )}
      {changePage === 2 && (
        <div className="object-list">
          <div className="object-list-banner">ROYAL HOTEL</div>
          <div className="object-list-title">
            <div className="object-list-title-text">배치 물품</div>
          </div>

          <table className="shell" border={1}>
            <tr>
              <td>침대구성</td>
              <td>퀸사이즈 침대 1개</td>
            </tr>
            <tr>
              <td>인터넷</td>
              <td>무료 와이파이</td>
            </tr>
            <tr>
              <td rowSpan={2}>기본 시설 및 품목</td>
              <td>
                TV, 테이블, 의자, <br />
                쇼파, 스타일러, 냉장고
              </td>
            </tr>
            <tr>
              <td>
                헤어 드라이기, 고데기, <br />
                빗, 수건, 로션, 스킨, 왁스
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>욕실용품 및 시설</td>
              <td>
                샴푸, 컨디셔너, 바디워시, <br />
                치약, 칫솔, 목욕가운, 면도기
              </td>
            </tr>
            <tr>
              <td>욕조, 샤워기</td>
            </tr>
            <tr>
              <td>최대인원</td>
              <td>2명</td>
            </tr>
            <tr>
              <td rowSpan={2}>조식</td>
              <td>07:00AM ~ 09:00AM</td>
            </tr>
            <tr>
              <td>1층 식당</td>
            </tr>
          </table>
        </div>
      )}
      {changePage === 3 && (
        <div className="object-list">
          <div className="object-list-banner">ROYAL HOTEL</div>
          <div className="object-list-title">
            <div className="object-list-title-text">시뮬레이터</div>
          </div>
          {loading && <div className="loadeMassage">Loading...</div>}
          <Unity unityProvider={unityProvider} className="unitySize" />
          <div className="explanation">- 캐릭터 이동 : 방향키로 캐릭터를 이동할 수 있습니다.</div>
          <div className="explanation">- 캐릭터키는 175cm로 설정되있습니다.</div>
        </div>
      )}
    </div>
  );
}

export default StandardRoom;
