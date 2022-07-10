import React from 'react'
import { Col, Row } from 'reactstrap'
import LatestPurchasedProducts from './latest_purchased_products/LatestPurchasedProducts'
import LowestProductQuantities from './lowest_product_quantities/LowestProductQuantities'

export default function Tabels({lowest_product_quantities,latest_purchased_products}) {
  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col>
            <LatestPurchasedProducts latest_purchased_products={latest_purchased_products}/>
        </Col>
        <Col>
        <LowestProductQuantities lowest_product_quantities={lowest_product_quantities}/>
        </Col>
    </Row>
  )
}
