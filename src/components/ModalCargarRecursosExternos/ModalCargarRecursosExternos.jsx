import React, { useEffect, useState } from 'react';
import './ModalCargarRecursosExternos.css';
import getUnidades from '../../services/get/getUnidades';
import { useIntegraStates } from '../utils/global.Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { registrarRecursosExternos } from '../../services/post/registrarRecursosExternos';

const ModalCargarRecursosExternos = ({ setShowModalRecursosExternos, reload, setReload }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        unidad: undefined,
        horarioDisponible: []
    });
    const [errors, setErrors] = useState({});
    const [jsonContent, setJsonContent] = useState(null);
    const [fileName, setFileName] = useState('');
    const { state, dispatch } = useIntegraStates();
    const [unidad, setUnidad] = useState(undefined);
    const [diasUnidad, setDiasUnidad] = useState([]);
    const [diasSeleccionados, setDiasSeleccionados] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target.result);
                    setJsonContent(json);
                } catch (error) {
                    alert('Error al parsear el archivo JSON:', error);
                }
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, seleccione un archivo JSON válido.');
        }
    };

    const handleUploadClick = () => {
        if (jsonContent) {
            registrarRecursosExternos(jsonContent)
                .then((response) => {
                    if (response.succes) {
                        alert('Archivo cargado exitosamente.');
                        setShowModalRecursosExternos(false);
                        setReload(!reload);
                    } else {
                        alert('Error al cargar el archivo.');
                    }
                })
                .catch((error) => {
                    console.error('Error al enviar los datos al servidor:', error);
                });
        } else {
            alert('Por favor, seleccione un archivo JSON antes de cargar.');
        }
    };

    const handleIconClick = () => {
        document.getElementById('file-input').click();
    };

    useEffect(() => {
        getUnidades()
            .then((response) => {
                if (response.success) {
                    dispatch({ type: 'SET_LIST_UNIDADES', payload: response.responseData });
                }
            });
    }, [dispatch]);

    return (
        <div className='background-modal'>
            <div className='containerForm'>
                <FontAwesomeIcon icon={faXmark} className='closeModal' onClick={() => setShowModalRecursosExternos(false)} />
                <h3>Cargar recursos externos</h3>
                <div className="wrapper wrapper-upload">
                    <form method="POST" action="/upload" encType="multipart/form-data">
                        <input
                            className="file-input"
                            id="file-input"
                            type="file"
                            name="file"
                            accept=".json"
                            onChange={handleFileChange}
                            hidden
                        />
                        <i className="fas fa-cloud-upload-alt" onClick={handleIconClick}></i>
                        <p onClick={handleIconClick}>Seleccione un archivo</p>
                        
                    </form>
                    {
                        fileName &&
                        <section className="progress-area">
                            <li className='row'>
                                <div className='content'>
                                    <i className='fas fa-file-alt'></i>
                                    <div className='details'>
                                        <span className='name'>{fileName}</span>
                                    </div>
                                </div>
                                <i></i>
                            </li>
                        </section>
                    }
                    
                    <section className="progress-area"></section>
                    <section className="uploaded-area"></section>
                    <section className="buttonFormats">
                        <button type="button" className="btnRepresentation" onClick={handleUploadClick}>
                            Cargar
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ModalCargarRecursosExternos;
