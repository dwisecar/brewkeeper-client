import React from 'react'
import pale from '../assets/images/pale-beer.png'

const CreateBeerDisplay = ({srm}) => {

  //hexcodes for all 30 °L colors
  const hex = [
    "#F3F993",
    "#F5F75C",
    "#F6F513",
    "#EAE615",
    "#E0D01B",
    "#D5BC26",
    "#CDAA37",
    "#C1963C",
    "#BE8C3A",
    "#BE823A",
    "#C17A37",
    "#BF7138",
    "#BC6733",
    "#B26033",
    "#A85839",
    "#985336",
    "#8D4C32",
    "#7C452D",
    "#6B3A1E",
    "#5D341A",
    "#4E2A0C",
    "#4A2727",
    "#361F1B",
    "#261716",
    "#231716",
    "#19100F",
    "#16100F",
    "#120D0C",
    "#100B0A",
    "#050B0A"
  ]

  //returns the corresponding hex code for the srm value passed in
  const beerColor = (esrm) => {
    let lovibond = esrm - 1
    if(lovibond < 0) {lovibond = 0}
    if(lovibond > 30) {lovibond = 30}
    return hex[lovibond]
  }

  //svg filled in with color depending on the srm prop that gets passed in. This changes the color of the beer example.
  return (
    <div className="create-beer-display">
      <div className="beer-image-overlays">
        <svg id="overlayed-beer-svg" version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="295.000000pt" height="728.000000pt" viewBox="0 0 295.000000 728.000000"
          preserveAspectRatio="xMidYMid meet">
          <metadata>
          Created by potrace 1.16, written by Peter Selinger 2001-2019
          </metadata>
          <g transform="translate(0.000000,728.000000) scale(0.100000,-0.100000)"
          fill={beerColor(srm)} stroke="none">
          <path id="beer-cover-shape" d="M1456 5373 l-949 -3 7 -73 c72 -764 217 -1826 321 -2354 63 -319 85
          -637 85 -1255 0 -260 -4 -396 -11 -415 -13 -32 -39 -195 -33 -205 5 -7 187
          -51 279 -67 258 -45 593 -29 923 45 64 14 128 31 142 37 38 18 38 63 -1 134
          l-31 58 6 390 c12 738 28 964 96 1380 56 342 92 588 149 1030 51 388 151 1235
          151 1275 l0 30 -92 -2 c-51 -2 -520 -4 -1042 -5z"/>
          </g>
        </svg>
        <img id="beer-bg" src={pale} alt="created-beer"></img>
      </div>
    </div>
  )
}
export default CreateBeerDisplay