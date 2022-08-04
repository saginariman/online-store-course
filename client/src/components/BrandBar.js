import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { Context } from '..'

const BrandBar = observer(() => {
    const {device} = useContext(Context);
  return (
    <ListGroup horizontal>
        {device.brands.map(brand => 
            <Card key={brand.id} style={{cursor: 'pointer'}} className={"p-3 "} onClick={() => device.setSelectedBrand(brand)} border={brand.id === device.selectedBrand.id ? 'danger':'light'}> {brand.name} </Card>    
        )}
    </ListGroup>
  )
})

export default BrandBar