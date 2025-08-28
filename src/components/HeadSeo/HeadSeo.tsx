import React from 'react';
import Head from 'next/head'

interface HeadProps {
    title: string;
    description: string;
}

export default function HeadSeo(props: HeadProps) {

    return (
        <Head>
            <title>{props.title} - Genoma ®</title>
            <meta name="description" content={props.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}