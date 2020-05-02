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

  if (prettyName.includes('alpine')) return <Svgalpine className={props.className} />
  else if (prettyName.includes('arch')) return <Svgarchlinux className={props.className} />
  else if (prettyName.includes('centos')) return <Svgcentos className={props.className} />
  else if (prettyName.includes('debian')) return <Svgdebian className={props.className} />
  else if (prettyName.includes('deepin')) return <Svgdeepin className={props.className} />
  else if (prettyName.includes('fedora')) return <Svgfedora className={props.className} />
  else if (prettyName.includes('freebsd')) return <Svgfreebsd className={props.className} />
  else if (prettyName.includes('gentoo')) return <Svggentoo className={props.className} />
  else if (prettyName.includes('kali')) return <Svgkali className={props.className} />
  else if (prettyName.includes('manjaro')) return <Svgmanjaro className={props.className} />
  else if (prettyName.includes('mint')) return <Svgmint className={props.className} />
  else if (prettyName.includes('opensuse')) return <Svgopensuse className={props.className} />
  else if (prettyName.includes('pup')) return <Svgpuppy className={props.className} />
  else if (prettyName.includes('raspbian')) return <Svgraspbian className={props.className} />
  else if (prettyName.includes('red hat')) return <Svgrhel className={props.className} />
  else if (prettyName.includes('ubuntu')) return <Svgubuntu className={props.className} />
  else return <Svgtux className={props.className} />
}
