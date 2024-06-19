import axios from "axios";
import "../CSS/Payment.css";
import { BrowserRouter, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Payment = ({
  name,
  phone,
  address,
  zoneCode,
  email,
  roomRole,
  sum,
  price,
  verCheckNum,
  car,
  adult,
  child,
  baby,
  startDate,
  endDate,
  loginId,
}) => {
  const nav = useNavigate();
  const [myId, setMyId] = useState("");
  useEffect(() => {
    setMyId(loginId);
    console.log(loginId);
  }, []);
  const changPage = () => {
    nav("/reservation/complete", {
      state: {
        pg: "html5_inicis", // PG사
        pay_method: "card", // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: 10, // 결제금액
        name: "아임포트 결제 데이터 분석", // 주문명
        buyer_userId: myId,
        buyer_name: name, // 구매자 이름
        buyer_tel: phone, // 구매자 전화번호
        buyer_email: email, // 구매자 이메일
        buyer_addr: address, // 구매자 주소
        buyer_postcode: zoneCode, // 구매자 우편번호
        buyer_car: car, // 구매자 차량여부
        buyer_reservation: {
          room_role: roomRole,
          room_adult: adult,
          room_child: child,
          room_baby: baby,
          room_price:
            roomRole === "standard"
              ? price[0]
              : roomRole === "deluxe"
              ? price[1]
              : roomRole === "luxury"
              ? price[2]
              : "",
          room_day: sum + "박",
          room_resert_price:
            roomRole === "standard"
              ? price[0] * sum
              : roomRole === "deluxe"
              ? price[1] * sum
              : roomRole === "luxury"
              ? price[2] * sum
              : "",
          room_startDate: startDate,
          room_endDate: endDate,
        },
      },
    });
  };
  console.log(myId);
  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp31382016");

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 10, // 결제금액
      name: "아임포트 결제 데이터 분석", // 주문명
      buyer_userId: myId,
      buyer_name: name, // 구매자 이름
      buyer_tel: phone, // 구매자 전화번호
      buyer_email: email, // 구매자 이메일
      buyer_addr: address, // 구매자 주소
      buyer_postcode: zoneCode, // 구매자 우편번호
      buyer_car: car, // 구매자 차량여부
      buyer_reservation: {
        room_role: roomRole,
        room_adult: adult,
        room_child: child,
        room_baby: baby,
        room_price:
          roomRole === "standard"
            ? price[0]
            : roomRole === "deluxe"
            ? price[1]
            : roomRole === "luxury"
            ? price[2]
            : "",
        room_day: sum + "박",
        room_resert_price:
          roomRole === "standard"
            ? price[0] * sum
            : roomRole === "deluxe"
            ? price[1] * sum
            : roomRole === "luxury"
            ? price[2] * sum
            : "",
        room_startDate: startDate,
        room_endDate: endDate,
      },
    };
    console.log(data);

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
      const { success, error_msg } = response;

      if (success) {
        alert("결제 성공");
        axios
          .post("/order", data)
          .then((res) => {
            console.log("주문성공", res.data);
            changPage();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    }
  }

  return (
    <>
      <div className="payment">
        <div className="payment-box">
          <div className="payment-main">
            <span className="payment-box-text">
              {roomRole === "standard"
                ? "스탠다드"
                : roomRole === "deluxe"
                ? "디럭스"
                : roomRole === "luxury"
                ? "럭셔리"
                : ""}
            </span>
          </div>
          <div className="payment-box-num">
            <span>
              {roomRole === "standard"
                ? price[0]
                : roomRole === "deluxe"
                ? price[1]
                : roomRole === "luxury"
                ? price[2]
                : ""}
              ₩
            </span>
          </div>
        </div>
        <span className="payment-x">*</span>
        <div className="payment-box" style={{ marginLeft: "20px" }}>
          <div className="payment-main">
            <span className="payment-box-text" style={{ left: "25px" }}>
              숙박일수
            </span>
          </div>
          <div className="payment-box-num">
            <span>{sum}박</span>
          </div>
        </div>
        <span className="payment-y">=</span>
        <div className="payment-box">
          <div className="payment-main">
            <span className="payment-box-text">결제금액</span>
          </div>
          <div className="payment-box-num">
            <span>
              {roomRole === "standard"
                ? price[0] * sum
                : roomRole === "deluxe"
                ? price[1] * sum
                : roomRole === "luxury"
                ? price[2] * sum
                : ""}
              ₩
            </span>
          </div>
        </div>
        <div className="payment-box">
          {verCheckNum && email !== "" ? (
            <div onClick={onClickPayment} className="payment-pay">
              <span className="payment-pay-text">결제하기</span>
            </div>
          ) : (
            <div className="payment-pay2">
              <span className="payment-pay-text">결제하기</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Payment;
