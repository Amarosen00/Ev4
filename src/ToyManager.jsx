import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';

const ToyManager = () => {
  const [toys, setToys] = useState([]);
  const [newToy, setNewToy] = useState({ clave1: 0, clave2: '', clave3: false, clave4: '' });

  useEffect(() => {
    const storedToys = JSON.parse(localStorage.getItem('items')) || [];
    setToys(storedToys);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(toys));
  }, [toys]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewToy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToys(prev => [...prev, newToy]);
    setNewToy({ clave1: 0, clave2: '', clave3: false, clave4: '' });
  };

  const handleDelete = (index) => {
    setToys(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <h1>Gestor de Juguetes</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="clave1">Id</Label>
          <Input type="number" name="clave1" id="clave1" value={newToy.clave1} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="clave2">Nombre</Label>
          <Input type="text" name="clave2" id="clave2" value={newToy.clave2} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="clave3" checked={newToy.clave3} onChange={handleInputChange} />{' '}
            Disponible
          </Label>
        </FormGroup>
        <FormGroup>
          <Label for="clave4">Descripcion</Label>
          <Input type="text" name="clave4" id="clave4" value={newToy.clave4} onChange={handleInputChange} required />
        </FormGroup>
        <Button color="primary" type="submit">Agregar Juguete</Button>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Disponibilidad</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {toys.map((toy, index) => (
            <tr key={index}>
              <td>{toy.clave1}</td>
              <td>{toy.clave2}</td>
              <td>{toy.clave3 ? 'Sí' : 'No'}</td>
              <td>{toy.clave4}</td>
              <td>
                <Button color="danger" onClick={() => handleDelete(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ToyManager;