import React, {useState, useCallback}from 'react'
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { API_HOST } from "../../../utils/constant";
import { Camara } from "../../../utils/icons";
//import { toast } from "react-toastify";
/* Petición */
//import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from "../../../api/user";
import { useForm } from '../../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { uploadBanner } from '../../../actions/user/uploadBanner';
import { uploadAvatar } from '../../../actions/user/uploadAvatar';
import { update } from '../../../actions/user/update';
import { getPerfil } from '../../../actions/user';

export default function EditUserForm({perfil, setShowModal}) {

    const dispatch = useDispatch()

    const [formValue, handleInputChange] = useForm({
        apellidos: perfil.apellidos,
        fechaNacimiento: perfil.fechaNacimiento,
        id: perfil.id,
        nombre: perfil.nombre,
        biografia: perfil?.biografia,
        sitioWeb: perfil?.sitioWeb
    })

    const { apellidos, fechaNacimiento, nombre, biografia, sitioWeb } = formValue

    const [formData, setFormData] = useState(initialValue(perfil))
    const [bannerUrl, setBannerUrl] = useState(
        perfil?.banner ? `${API_HOST}/obtener-banner?id=${perfil.id}` : null
    )
    const [bannerFile, setBannerFile] = useState(null)

    const [avatarUrl, setAvatarUrl] = useState(
        perfil?.avatar ? `${API_HOST}/obtener-avatar?id=${perfil.id}` : null
    )
    const [avatarFile, setAvatarFile] = useState(null)

    const [loading, setLoading] = useState(false)

    const onDropBanner = useCallback((acceptedFile) => {
        const file = acceptedFile[0]
        setBannerUrl(URL.createObjectURL(file))
        setBannerFile(file)
    })
    const { 
        getRootProps: getRootBannerProps, 
        getInputProps : getInputBannerProps 
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple:false,
        onDrop: onDropBanner
    })
    /* EndDropBanner */

    /* DropAvatar */
    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0]
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
    })
    const { getRootProps : getRootAvatarProps, getInputProps : getInputAvatarProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple:false,
        onDrop: onDropAvatar
    })
    /* EndDropAvatar */

    const onSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        
        if(bannerFile) {
            dispatch(uploadBanner(bannerFile))
        }
        
        if(avatarFile) {
            dispatch(uploadAvatar(avatarFile))
        }

        dispatch(update(formValue))

        dispatch(getPerfil())

        setLoading(false)
        setShowModal(false)
        window.location.reload()
    }

    return (
        <div className="edit-user-form">
            <div 
                className='banner' 
                style={{ backgroundImage: `url('${bannerUrl}')`}}
                {...getRootBannerProps()}
            >
                <input {...getInputBannerProps()}/>
                <Camara />
            </div>
            <div 
                className='avatar'
                style={{ backgroundImage: `url('${avatarUrl}')`}}
                {...getRootAvatarProps()}
            >
                <input {...getInputAvatarProps()}/>
                <Camara />
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                name="nombre"
                                defaultValue={nombre}
                                onChange={handleInputChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                name="apellidos"
                                defaultValue={apellidos}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        row="3"
                        placeholder="Biografía"
                        type="text"
                        name="biografia"
                        defaultValue={biografia}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Sitio web"
                        defaultValue={sitioWeb}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group>
                    <DatePicker
                        placeholder="Fecha de nacimiento"
                        locale={es}
                        selected={new Date(fechaNacimiento)}
                        onChange={value => setFormData({...formData, fechaNacimiento: value})}
                    />
                </Form.Group>

                <Button
                    className="btn-submit"
                    variant="primary"
                    type="submit">
                    {loading && <Spinner animation="border" size="sm"/>}
                        Actualizar
                </Button>
            </Form>
        </div>
    )
}

/* Valor datos del usuario si existe */
const initialValue = user => {
    return {
        nombre: user.nombre         || "",
        apellidos: user.apellidos   || "",
        biografia: user.biografia   || "",
        ubicacion: user.ubicacion   || "",
        sitioWeb: user.sitioWeb     || "",
        fechaNacimiento: user.fechaNacimiento   || "",
    }
}