import React, { useState } from "react";
import { useHistory} from 'react-router-dom'
import { Button} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./Auth.scss";

function Auth() {
  const [signIn, setSignIn] = useState(true)
  let history = useHistory();


  const clickEvent1 = () => {
    setSignIn(false)
  }

  const clickEvent2 = () => {
    setSignIn(true)

}

const goBack = () => {
  history.goBack()
}

  return (
<div class="auth-container">
  <div className="go-back">

    <Button onClick={goBack} icon={<ArrowLeftOutlined />} />
  </div>
  <div class="welcome">
    <div class={`${!signIn ? "swipe-right" : ""} pinkbox`}>
      <div class={`${signIn ? "nodisplay" : ""}  signup`}>
        <h1>რეგისტრაცია</h1>
        <form autocomplete="off">
          <input type="text" placeholder="მომხმარებელი"/>
          <input type="email" placeholder="ელ. ფოსტა"/>
          <input type="password" placeholder="პაროლი"/>
          <input type="password" placeholder="გაიმეორეთ პაროლი"/>
          <button class="button submit">მომხმარებლის შექმნა</button>
        </form>
      </div>
      <div class={`${!signIn ? "nodisplay" : ""}  signin`}>
        <h1>ავტორიზაცია</h1>
        <form class="more-padding" autocomplete="off">
          <input type="text" placeholder="მომხმარებელი"/>
          <input type="password" placeholder="პაროლი"/>
          <div class="checkbox">
            <input type="checkbox" id="remember" /><label htmlFor="remember">დამახსოვრება</label>
          </div>

          <button class="button submit">შესვლა</button>
        </form>
      </div>
    </div>
    <div class="leftbox">
      <h2 class="title"><span>BLOOM</span>&<br/>BOUQUET</h2>
      <p class="desc">აირჩიეთ თქვენი ფავორითი <span>თაიგული</span></p>
      <img class="flower smaller" src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg" alt="1357d638624297b" border="0"/>
      <p class="account">გაქვთ ანგარიში?</p>
      <button class="button" onClick={clickEvent2} id="signin">შესვლა</button>
    </div>
    <div class="rightbox">
      <h2 class="title"><span>BLOOM</span>&<br/>BOUQUET</h2>
      <p class="desc">აირჩიეთ თქვენი ფავორითი<span>თაიგული</span></p>
      <img class="flower" src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"/>
      <p class="account">არ გაქვთ ანგარიში?</p>
      <button class="button" onClick={clickEvent1} id="signup">განაცხადი</button>
    </div>
  </div>
</div> );
}

export default Auth;
