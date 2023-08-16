import React from 'react'

const format = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style:'currency'
});

const Format_currrency = (number:number) => {
  return format.format(number)
}

export default Format_currrency
