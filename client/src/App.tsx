import { useEffect, useRef, useState } from 'react';
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
  const [sizeButton, setSizeButton] = useState(true);
  const [customButtons, setCustomButtons] = useState(false);

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
        console.log(index);
        setImgIndex(index);
      break;
      case nextBtn:
        index = index + 1;
        if(index >= imgsLength) {
          index = 0;
        }
        console.log(index);
        setImgIndex(index);
      break;
      default:
        SetNewButton(event.keyCode);
      break;
    }
  }

  const SetNewButton = (key: any) => {
    let nextP = document.getElementById('next-btn');
    let prevP = document.getElementById('prev-btn');
    if(prevP && prevP.innerText === "Press any key") {
      prevP.innerText = key;
      previousBtn = key;
    } 

    if(nextP && nextP.innerHTML === "Press any key") {
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
    let nextP = document.getElementById('next-btn');
    let prevP = document.getElementById('prev-btn');
    if(nextP && prevP) {
      prevP.innerHTML = previousBtn.toString();
      nextP.innerHTML = "Press any key";
    }
  }

  const ChangePrevBtn = (event: any) => {
    let nextP = document.getElementById('next-btn');
    let prevP = document.getElementById('prev-btn');
    if(nextP && prevP) {
      nextP.innerHTML = previousBtn.toString();
      prevP.innerHTML = "Press any key";
    }
  }

  const Customize = async (buttonName :string) => {
    switch(buttonName) {
      case 'size':
        setCustomButtons(false);
        setSizeButton(true);
      break;
      case 'change-btns':
        await setSizeButton(false);
        await setCustomButtons(true);
        let nextP = document.getElementById('next-btn');
        let prevP = document.getElementById('prev-btn');
        if(nextP && prevP) {
          console.log("sadf")
          nextP.innerHTML = nextBtn.toString();
          prevP.innerHTML = previousBtn.toString();
        }
      break;
    }
  }

  return (
    <div className="container text-center">
      {kittens &&
        <div>
          <div className="mt-5">
            <Image url={kittens[imgIndex].url} x={imageWidth} y={imageHeight} description={kittens[imgIndex].description} />
          </div>

          <div className="mb-4">
            <UploadImage />
          </div>

          <div className="m-auto">
            <button className="btn btn-primary m-3" onClick={() => Customize("size")}>Change Image Size</button>
            <button className="btn btn-primary" onClick={() => Customize("change-btns")}>Change Buttons</button>
          </div>

          {sizeButton &&
            <div className="mt-3">
              <div className="m-auto">
                <h4>Change the image size</h4>
                <div className="row m-auto mt-2">
                  <div className="col m-2">
                    <label className="mr-2">X:</label>
                    <input id="width" type="text" value={imageWidth} onChange={InputWidth} />
                  </div>
                </div>

                <div className="row m-auto">
                  <div className="col">
                    <label className="mr-2">Y:</label>
                    <input type="text" value={imageHeight} onChange={InputHeight}/>
                  </div>
                </div>
              </div>
            </div>
          }

          {customButtons &&
            <div className="mt-3">
              <h4 className="mb-4">Change the control buttons</h4>
              
              <div className="row">
                <div className="col">
                </div>

                <div className="col-3">
                  <div className="d-flex justify-content-around">
                    <div>
                      <button className="btn btn-primary" onClick={ChangeNextBtn}>Next</button>
                      <p id="next-btn" className="mt-1"></p>
                    </div>

                    <div>
                      <button className="btn btn-primary" onClick={ChangePrevBtn}>Prev</button>
                      <p id="prev-btn" className="mt-1"></p>
                    </div>
                  </div>
                </div>

                <div className="col">
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default App;
