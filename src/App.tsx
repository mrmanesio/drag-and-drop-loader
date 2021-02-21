import React from 'react';
import './App.scss';
import icon from './assets/Icon.svg';

const App = () => {

  const [drag, setDrag] = React.useState(false);
  const [logo, setLogo] = React.useState(undefined);
  const [touched, setTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(false)

  let files: any;

  function dragStartHandler(e:any) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e:any) {
    e.preventDefault();
    setDrag(false);
  }

  function loadFile(files: any):any {
    if (files[0].type === 'image/jpeg' || files[0].type === 'image/png' ) {
      setLoading(true);
      setTouched(true);
      const reader = new FileReader();
      reader.onload = function () {
        const img: any = new Image()
        img.src = reader.result;
        setLogo(img.src);
        setLoading(false);
      }
      reader.readAsDataURL(files[0]);
    }
  }

  function dropHandler(e:any) {
    e.preventDefault();
    files = e.dataTransfer.files;
    loadFile(files);
    setDrag(false);
  }

  function loadHandler(e:any) {
    files = e.target.files;
    loadFile(files)
  }

  return (
    <div className="App">
      <div className="App__header">
        <h1 className="App__title">
          Company logo
        </h1>
        <p className="App__description">
          Logo should be square, 100px size and in png, jpeg file format.
        </p>
      </div>
      <div className="App__body">
        <div className={`dragarea ${drag ? 'dragged' : ''}`}
          onDragStart={e => dragStartHandler(e)}
          onDragLeave={e => dragLeaveHandler(e)}
          onDragOver={e => dragStartHandler(e)}
          onDrop = {e => dropHandler(e)}
        >
            <div className={`dragarea__drop ${loading ? 'loading' : ''}`}>
              <img className='dragarea__output' src={!!logo ? logo : icon} alt=""/>
            </div>
            <p>{
              loading  
              ? 'Uploading...'
              :  touched ? 'Drag & drop here to replace' : 'Drag & drop here'
            }</p>
            <span>
              {loading ? '' : '- or -'}
            </span>
            <input type='file' className='dragarea__input' id='selectFile' onChange = {e => loadHandler(e)}></input>
            <label htmlFor="selectFile" className='dragarea__label'>
              {loading  
               ? ''
               :  touched ? 'Select file to replace' : 'Select file to upload'
              }
            </label>
        </div>
      </div>
    </div>
  )
}

export default App;
