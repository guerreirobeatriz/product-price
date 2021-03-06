import React, { useContext } from 'react'
import { defineMessages, FormattedNumber } from 'react-intl'
import { ProductContext } from 'vtex.product-context'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessageWithMarkers } from 'vtex.native-types'

import { StorefrontFC, BasicPriceProps } from './types'

const CSS_HANDLES = [
  'savings',
  'previousPriceValue',
  'newPriceValue',
  'savingsValue',
  'savingsPercentage',
] as const

const Savings: StorefrontFC<BasicPriceProps> = props => {
  const { message, markers } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { selectedItem } = useContext(ProductContext)

  const commercialOffer = selectedItem?.sellers[0]?.commertialOffer
  if (!commercialOffer) {
    return null
  }

  const previousPriceValue = commercialOffer.ListPrice
  const newPriceValue = commercialOffer.Price
  const savingsValue = previousPriceValue - newPriceValue
  const savingsPercentage = savingsValue / previousPriceValue
  if (savingsValue === 0) {
    return null
  }

  return (
    <span className={handles.savings}>
      <IOMessageWithMarkers
        message={message}
        markers={markers}
        handleBase="savings"
        values={{
          previousPriceValue: (
            <span
              key="previousPriceValue"
              className={handles.previousPriceValue}
            >
              <FormattedCurrency value={previousPriceValue} />
            </span>
          ),
          newPriceValue: (
            <span key="newPriceValue" className={handles.newPriceValue}>
              <FormattedCurrency value={newPriceValue} />
            </span>
          ),
          savingsValue: (
            <span key="savingsValue" className={handles.savingsValue}>
              <FormattedCurrency value={savingsValue} />
            </span>
          ),
          savingsPercentage: (
            <span key="savingsPercentage" className={handles.savingsPercentage}>
              <FormattedNumber value={savingsPercentage} style="percent" />
            </span>
          ),
        }}
      />
    </span>
  )
}

const messages = defineMessages({
  title: {
    id: 'admin/savings.title',
  },
  description: {
    id: 'admin/savings.description',
  },
})

Savings.schema = {
  title: messages.title.id,
}

export default Savings
