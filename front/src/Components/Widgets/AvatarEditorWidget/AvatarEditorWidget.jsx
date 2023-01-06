import { useState, useRef } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import Requests from '../../Requests';

import Styles from './AvatarEditorWidget.module.scss';

const AvatarEditorWidget = ({image_path}) => {
  let navigate = useNavigate();
  
  let formData = new FormData();

  const [editorValues, setEditorValues] = useState({
    valueScale: 1,
    valueRotate: 0,
    borderRadius: 25,
  });

  const filePicker = useRef(null);
  const setAvatarEditorRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  let textBtn = selectedFile != null ? selectedFile.name.length < 10 ?  selectedFile.name : '...' + selectedFile.name.split('.')[0].slice(selectedFile.name.length - 10, selectedFile.name.length) + '.' + selectedFile.name.split('.')[1] : 'Upload file';
  
  const uploadStatus = (serverRequest) => {
    if(serverRequest === 200) {
      navigate('/admin/profile');
    }
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);

    return event.target.files[0];
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  const onSendData = (event) => {
    event.preventDefault();
    if(selectedFile) {
      formData.append('image', selectedFile);

      Requests({
        method: 'post',
        url: '/upload-avatar',
        data: formData,
        callback: uploadStatus
      }, []);
    } else {

    }
  };

  const onChangeScale = (value) => {
    setEditorValues(previous => {
      return {
        ...previous,
        valueScale: Number(value)
      }
    });
  }

  const onChangeRotate = (value) => {
    setEditorValues(previous => {
      return {
        ...previous,
        valueRotate: Number(value)
      }
    });
  }

  const onChangeRadius = (value) => {
    setEditorValues(previous => {
      return {
        ...previous,
        borderRadius: Number(value)
      }
    });
  }

  return (
    <div className={Styles.AvatarEditor}>
      <AvatarEditor 
        ref={setAvatarEditorRef}
        image={selectedFile == null ? image_path : selectedFile}
        height={250}
        width={250}
        border={50}
        borderRadius={editorValues.borderRadius}
        color={[255, 255, 255, 0.6]}
        scale={editorValues.valueScale}
        rotate={editorValues.valueRotate}
      />
      <ul className={Styles.AvatarEditor__controlPanel}>
        <li className={Styles.AvatarEditor__controlPanel__item}>
          <label htmlFor='scale'>Scale: x{editorValues.valueScale}</label>
          <input value={editorValues.valueScale} list='true' id='scale' type="range" min='1' max='3' step='0.1' onChange={event => onChangeScale(event.target.value)} />
        </li>
        <li className={Styles.AvatarEditor__controlPanel__item}>
          <label htmlFor='rotate'>Rotate: {editorValues.valueRotate}&#176;</label>
          <input value={editorValues.valueRotate} id='rotate' type="range" min='0' max='360' step='90' onChange={event => onChangeRotate(event.target.value)}/>
        </li>
        <li className={Styles.AvatarEditor__controlPanel__item}>
          <label htmlFor='rotate'>Radius: {editorValues.borderRadius == 125 ? 'Circle' : editorValues.borderRadius}</label>
          <input value={editorValues.borderRadius} id='radius' type="range" min='25' max='125' step='1' onChange={event => onChangeRadius(event.target.value)}/>
        </li>
      </ul>
      <form method='post' encType='multipart/form-data'>
        <div
          className={Styles.uploadBtn}
          onClick={handlePick}
          >
          <p>{textBtn}</p>
        </div>
        <input 
          className={Styles.hidden}
          type="file"
          ref={filePicker}
          onChange={handleChange}
          accept="image/*,.jpeg,.png,.gif,.web,.jpg"
        />
        <button className={Styles.uploadNow} onClick={onSendData}>
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </form>
    </div>
  );
};

export default AvatarEditorWidget;