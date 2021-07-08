import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Image from './components/Image';
import UploadImage from './components/UploadImage';

interface Kitten {
  id: number;
  url: string;
}

function App() {
  const [kittens, setKittens] = useState<Kitten[]>();
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(400);
  const [imageHeight, setImageHeight] = useState<number>(400);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [previousBtn, setPreviousBtn] = useState(40);
  const [nextBtn, setNextBtn] = useState(38);

  let index = 0;
  let imgsLength = 0;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    axios.get<Kitten[]>('/api/v1/kitten').then(res => {
      return res.data;
    }).then((kittens) => {
      setKittens(kittens);
      index = Math.floor(Math.random() * kittens.length);
      setImgIndex(index);
      imgsLength = kittens.length;
    });
  }, []);

  const handleKeyPress = (event: any) => {
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
    }
  }

  const inputHeight = (event: any) => {
    setImageHeight(event.target.value);
  }

  const inputWidth = (event: any) => {
    setImageWidth(event.target.value);
  }

  const ToggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className="container text-center">
      {kittens &&
        <div>
          <Image url={kittens[imgIndex].url} x={imageWidth} y={imageHeight} />
          <input type="text" value={imageWidth} onChange={inputWidth} placeholder="Enter Image Width" />
          <input type="text" value={imageHeight} onChange={inputHeight} placeholder="Enter Image Height"/>
              
          <UploadImage />
        </div>
      }
    </div>
  );
}

export default App;
