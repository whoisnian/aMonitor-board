import React from 'react'
import {
  Svgalpine,
  Svgarchlinux,
  Svgcentos,
  Svgdebian,
  Svgdeepin,
  Svgfedora,
  Svgfreebsd,
  Svggentoo,
  Svgkali,
  Svgmanjaro,
  Svgmint,
  Svgopensuse,
  Svgpuppy,
  Svgraspbian,
  Svgrhel,
  Svgtux,
  Svgubuntu
} from './icon'

export default function DistroLogo (props) {
  const prettyName = props.distro.toLowerCase()

  if (prettyName.includes('alpine')) return <Svgalpine />
  else if (prettyName.includes('arch')) return <Svgarchlinux />
  else if (prettyName.includes('centos')) return <Svgcentos />
  else if (prettyName.includes('debian')) return <Svgdebian />
  else if (prettyName.includes('deepin')) return <Svgdeepin />
  else if (prettyName.includes('fedora')) return <Svgfedora />
  else if (prettyName.includes('freebsd')) return <Svgfreebsd />
  else if (prettyName.includes('gentoo')) return <Svggentoo />
  else if (prettyName.includes('kali')) return <Svgkali />
  else if (prettyName.includes('manjaro')) return <Svgmanjaro />
  else if (prettyName.includes('mint')) return <Svgmint />
  else if (prettyName.includes('opensuse')) return <Svgopensuse />
  else if (prettyName.includes('pup')) return <Svgpuppy />
  else if (prettyName.includes('raspbian')) return <Svgraspbian />
  else if (prettyName.includes('red hat')) return <Svgrhel />
  else if (prettyName.includes('ubuntu')) return <Svgubuntu />
  else return <Svgtux />
}
