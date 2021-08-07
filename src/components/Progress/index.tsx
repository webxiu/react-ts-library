import "./index.less";

import React, { useEffect, useState } from "react";

const Form = () => {
  const [num, setNum] = useState(0);
  const [total, setTotal] = useState(100);
  const [deg, setDeg] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    const audio = new Audio();
    const path = "http://localhost:3000/爱的魔法.mp3";
    audio.crossOrigin = "anonymous";
    audio.src = path;
    setAudio(audio);
  }, []);

  useEffect(() => {
    const du = (num / total) * 360;
    setDeg(du);
  }, [num, total]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener("timeupdate", function (a) {
      const { currentTime, duration } = audio;
      setTotal(duration);
      setNum(currentTime);
      if (currentTime >= duration) {
        audio.pause();
        setNum(0);
      }
      console.log(`currentTime, duration`, duration, currentTime);
    });
  }, [audio]);

  const play = () => {
    audio?.play();
    setIsPlay(true);
  };
  const pause = () => {
    audio?.pause();
    setIsPlay(false);
  };

  return (
    <div className="box">
      <div className="circle">
        <div className="pie_left">
          <div
            className="left"
            style={{
              transform: `rotate(${deg > 180 ? deg - 180 : 0}deg)`,
              transition: deg >= 180 && deg < 360 ? "all 0.5s" : "none",
            }}
          ></div>
        </div>
        <div className="pie_right">
          <div
            className="right"
            style={{
              transform: `rotate(${deg > 180 ? 180 : deg}deg)`,
              transition: deg <= 180 && deg > 1 ? "all 0.5s" : "none",
            }}
          ></div>
        </div>
        <div className="mask">
          <span>{((num / total) * 100).toFixed()}</span>%
          {isPlay ? (
            <span onClick={pause}>暂停</span>
          ) : (
            <span onClick={play}>播放</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
