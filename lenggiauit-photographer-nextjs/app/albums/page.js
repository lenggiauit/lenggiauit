import React from 'react'
import Navigation from '@/components/navigation'
import AlbumList from '@/components/albumList'
import Footer from '@/components/footer'
import Head from 'next/head'

let appSetting = require('/appSetting.json')
let appData = require('/data.json')
var albumsData = appData.find((x) => x.pageUrl == '/albums')

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: albumsData.metaData.title,
    description: albumsData.metaData.description,
    openGraph: {
      images: albumsData.albums.map((i) => i.image),
      title: albumsData.metaData.title,
      description: albumsData.metaData.description,
      url: appSetting.baseUrl + '/albums',
      icon: '/favicon.ico',
    },
  }
}

const AlbumPage = () => {
  return (
    <>
      <Navigation></Navigation>
      <AlbumList data={albumsData.albums} />
      <Footer />
    </>
  )
}

export default AlbumPage
