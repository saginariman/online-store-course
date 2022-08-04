import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, Form, Modal, Row, Col } from 'react-bootstrap'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import {Context} from '../../';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';

const CreateDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const selectFile = e => {
    setFile(e.target.files[0])
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value}: i))
  }
  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ДОбавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className="mt-2 mb-2">
              <DropdownToggle>{device.selectedType.name || "Выберите тип"}</DropdownToggle>
              <DropdownMenu>
                {device.types.map(type =>
                  <Dropdown.Item onClick = {(e) => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>  
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <DropdownToggle>{device.selectedBrand.name || "Выберите брэнд"}</DropdownToggle>
              <DropdownMenu>
                {device.brands.map(brand =>
                  <Dropdown.Item onClick = {(e) => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>  
                )}
              </DropdownMenu>
            </Dropdown>
            <Form.Control className="mt-3" placeholder='Введите название устройства' value={name} onChange={(e) => setName(e.target.value)}/>
            <Form.Control className="mt-3" type="number" placeholder='Введите стоимость устройства' value={price} onChange={(e) => setPrice(Number(e.target.value))}/>
            <Form.Control className="mt-3" type="file" onChange={selectFile}/>
            <hr/>
            <Button variant = {"outline-dark"} onClick={addInfo}>Добавить новое свойство</Button>
            {info.map(i => 
              <Row key={i.number} className="mt-4">
                <Col md={4}>
                  <Form.Control value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)} placeholder='Введите название свойства'/>
                </Col>
                <Col md={4}>
                  <Form.Control value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} placeholder='Введите описание свойства'/>
                </Col>
                <Col md={4}>
                  <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Удалить</Button>
                </Col>
              </Row>  
            )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outine-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outine-success' onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice