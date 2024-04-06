import React from 'react'
import Head from 'next/head';
import Script from 'next/script';

function Title({ name }) {
  return (
    <Head>
      <title>
        {name}
      </title>
    </Head>
  )
}

export default Title