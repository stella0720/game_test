import { VFC } from 'react';
import 'tailwindcss/tailwind.css'
import Image from 'next/image'
import {useMedia} from 'react-use'
import React from 'react';

type Props = {
  value: number
  className: string
    cardValue: string
    clickedIndex: number
    isOpened: boolean
    cardImageUrl:string
    onClick: () => void
}
export default  function CardDeck(props)  {
    const isMobileScreen: boolean =  useMedia("(max-width: 800px)")
    let cardStyle = 'card card-ura'
    let numStyle = 'omote'
    switch(props.clickedIndex){
                        case 0:
                            numStyle = 'ura'
                            break;
                        case 1:
                            numStyle = "isPair"
                            break;
                        case 2:
                            numStyle = "nonPair"
                            break;
                        default:
                            cardStyle = 'card'
                            break;
            }
            
  return (
    <section className="text-gray-600 text-center body-font mx-3">
        {isMobileScreen && (
        <button className={cardStyle + 'Sm '}  onClick={() => props.onClick()}>
        <div className="text-center items-center">
            <div className={numStyle + 'Sm'}>
            {/* カードが表になったら絵を表示する */}
            <span >
                {props.isOpened 
                    ? <Image src={props.cardImageUrl}  width={94} height={120}alt="My avatar" /> 
                    : <span></span>}
            </span>
            </div>
            </div>
        </button>
        )}
        {!isMobileScreen && (
        <button className={cardStyle}  onClick={() => props.onClick()}>
        <div className="text-center  items-center">
            <div className={numStyle}>
            {/* カードが表になったら絵を表示する */}
            <span>
                {props.isOpened 
                    ? <Image src={props.cardImageUrl}  width={140} height={180} alt="My avatar" /> 
                    : <span></span>}
            </span>
            </div>
        </div>
        </button>
        )}
        </section>
  )
}