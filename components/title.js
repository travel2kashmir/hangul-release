import React from 'react'
import Head from 'next/head';
import Script from 'next/script';

function Title({name,renderSnippet}) {
  return (
    <Head>
 
    <title>
   {name}

   {/* <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      /> */}

      
    </title>
   
    </Head>
  )
}

export default Title