import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Image from './components/Image';
import UploadImage from './components/UploadImage';

interface Kitten {
  id: number;
  url: string;
  description: Text;
}

function App() {
  const [kittens, setKittens] = useState<Kitten[]>();
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(400);
  const [imageHeight, setImageHeight] = useState<number>(400);

  let nextP = document.getElementById('next-btn');
  let prevP = document.getElementById('prev-btn');
  let index = 0;
  let imgsLength = 0;
  let nextBtn = 38;
  let previousBtn = 40;

  useEffect(() => {
    document.addEventListener("keydown", HandleKeyPress);
    
    axios.get<Kitten[]>('/api/v1/kitten').then(res => {
      return res.data;
    }).then((kittens) => {
      setKittens(kittens);
      index = Math.floor(Math.random() * kittens.length);
      setImgIndex(index);
      imgsLength = kittens.length;
    });
  }, []);

  const HandleKeyPress = (event: any) => {
    switch(event.keyCode) {
      case previousBtn:
        index = index - 1;
        if(index < 0) {
          index = imgsLength - 1;
        }
        setImgIndex(index);
      break;
      case nextBtn:
        index = index + 1;
        if(index >= imgsLength) {
          index = 0;
        }
        setImgIndex(index);
      break;
      default:
        SetNewButton(event.keyCode);
      break;
    }
  }

  const SetNewButton = (key: any) => {
    nextP = document.getElementById('next-btn');
    prevP = document.getElementById('prev-btn');
    if(prevP && prevP.innerHTML === "Press any Key") {
      prevP.innerHTML = key;
      previousBtn = key;
    } 

    if(nextP && nextP.innerHTML === "Press any Key") {
      nextP.innerHTML = key;
      nextBtn = key;
    }
  }

  const InputHeight = (event: any) => {
    setImageHeight(event.target.value);
  }

  const InputWidth = (event: any) => {
    setImageWidth(event.target.value);
  }

  const ChangeNextBtn = (event: any) => {
    if(nextP && prevP){
      prevP.innerHTML = previousBtn.toString();
      nextP.innerHTML = "Press any Key";
    }
  }

  const ChangePrevBtn = (event: any) => {
    if(prevP && nextP){
      nextP.innerHTML = nextBtn.toString();
      prevP.innerHTML = "Press any Key";
    }
  }

  return (
    <div className="container text-center">
      {kittens &&
        <div>
          <Image url={kittens[imgIndex].url} x={imageWidth} y={imageHeight} description={kittens[imgIndex].description} />
          <input type="text" value={imageWidth} onChange={InputWidth} />
          <input type="text" value={imageHeight} onChange={InputHeight}/>

          <UploadImage />

          <p id="next-btn"></p>
          <button className="btn btn-primary" onClick={ChangeNextBtn}>Next</button>
          <p id="prev-btn"></p>
          <button className="btn btn-primary" onClick={ChangePrevBtn}>Prev</button>
        </div>
      }
    </div>
  );
}

export default App;
