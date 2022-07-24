/* eslint-disable react-hooks/rules-of-hooks */
import { useState,useEffect, useRef } from "react"
import Head from 'next/head'
import Image from 'next/image'
import Init from '../models/gameInit'
import  CardDeck  from './games/generateCards'
import {useMedia} from 'react-use'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css'
import { Backdrop } from "@mui/material"
import React from "react"

 interface Card {
  cardId:number
  isOpened: boolean
  cardName: string
  cardValue: string
  className: string
  clickedIndex: number
  cardImageUrl:string
}
export default function Game() {
  const isMobileScreen: boolean = useMedia("(max-width: 800px)")
  const [isPassed, setIsPassed] = useState(false)
  const [cardState, setCardState] = useState(Init())
  const [gameState, setGameState] = useState(getInitialState())

  function getInitialState() {
    return {
      cards: cardState,
      status: Array(10).fill(0),
      ready: -1,
      count: 20,
      timer: null,
      title:' ',
      overlay: 'overlay'
    }
  }

  const [cardValue, setCardValue] = useState('')
  const [statusState, setStatusState] = useState(gameState.status)
  const [readyState, setReadyState] = useState(gameState.ready)
  const [countState, setCountState] = useState(gameState.count)
  const [timerState, setTimerState] = useState(gameState.timer)
  const [titleState, setTitleState] = useState(gameState.title)
  const [overlayState, setOverlayState] = useState(gameState.overlay)
  const [isStarting, setIsStarting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
  }
  const handleToggle = () => {
    setOpen(!open);
  }


  /**
   * カードクリック
   * @param index 
   */
   const  onClickCard = (cardInfo:Card, index: number) : void =>{
    const sts = gameState.status.slice()
    let ready = -1
    let message = ""
    let title = ""
    let overlay = ""

    // ゲーム開始チェック
    if(!isStarting){
      return
    }

    // 既にカードが開かれていれば何もしない
    if (cardInfo.isOpened){
     return
    }

    if (gameState.ready == -2) {
        return
    }

    //1枚目をクリックした時の処理
    if (readyState  === -1) {
      cardInfo.isOpened = true
      sts[index] = 1

      // readyの状態を保持
      setReadyState( ready => {
        const nextReady = index
          return nextReady
      })

      // 1枚目がどっちだったかを保持
      setCardValue( value => {
        const newCardValue = cardInfo.cardValue
        return newCardValue
      })
    } else if (readyState != index) {
    //2枚目をクリックした時の処理
      sts[index] = 1
      //2枚揃ったかどうかを判定
      if (cardInfo.cardValue != cardValue) {
        cardInfo.isOpened = true

        // 揃ったメッセージを表示
        setTitleState( title => {
          const madePair = 'good!!'
            return madePair
          })

        // readyの状態をリセット
        setReadyState( ready => {
          const nextReady = -1
          return nextReady
        })

        if(!isFinish()){
            setTimeout(() => {
              setTitleState( title => {
                const clear = ''
                  return clear
                } )
           }, 500
           )
        }
        // 全てめくったら終わり
        else {
          setIsPassed(true)

          setIsStarting(false)
          // クリア時のメッセージ表示
          setTitleState( title => {
           const finishTitle = 'congraturation!'
             return finishTitle
           })
          // オーバーレイ表示
          //  setOverlayState( overlay => {
          //   const overlayEnd = 'overlay overlay-end'
          //   return overlayEnd
          // })
          stop()
          handleToggle()

        }
      }
      // ペアができなかった場合
      if (cardInfo.cardValue  == cardValue) {
         cardInfo.isOpened = true

         // readyの状態を保持
        setReadyState( ready => {
          const nextReady = index + 1
          return nextReady
        })

        sts[gameState.ready] = 3
        sts[index] = 3
        //少し経過後に元に戻す
        const rollbacksts = gameState.status.slice()
        rollbacksts[gameState.ready] = 0
        rollbacksts[index] = 0
        setTimeout(() => {
           cardInfo.isOpened = false
            cardReset(rollbacksts)
        }, 500)
      }
    }
    setStatusState(sts)
  }
  useEffect(() => {
  }, [cardValue, statusState, readyState, titleState,overlayState, isPassed])

  /**
   * スタートボタン押下
   * @returns 
   */
  const intervalRef = useRef(0)
  
  const onClickStart = () => {
    if (intervalRef.current !== null) {//タイマーが進んでいる時はstart押せないように//
      return
    }
    intervalRef.current = setInterval(() => {//3
      countDown()
    }, 1000)
    setIsStarting(true)
    setOverlayState('overlayNone')
  }
  useEffect(() => {
  }, [isStarting,overlayState])

    /**
   * リセットボタン押下
   * @returns 
   */
  const onClickReset = () => {
    Init()
    stop()
    stateClear()
  }

  /**
   * カウントダウン
   */
  function countDown(){
    let nextCount = countState -1
    
    setCountState( nextCount => {
      const newCount = nextCount - 1
      // カウントが0になったら止める
      if(newCount < 1){
        setTitleState( title => {
          const timeOver = 'time over'
          return timeOver
        })
        setOverlayState( overlay => {
          const overlayEnd = 'overlay overlay-end'
          return overlayEnd
        })
        // stateの中身を更新
        setCountState(0)
        stop()
      } 
      return newCount
    } )
  }
  useEffect(() => {
  }, [countState,overlayState,titleState])

  /**
   * カウントを止める
   * @returns 
   */
  const stop = () => {
    if (intervalRef.current === 0) {//タイマーが止まっている時はstart押せないように
      return
    }
    clearInterval(intervalRef.current)
    intervalRef.current = 0
  }

  /**
   * リセット
   */
  function cardReset (sts) {
    setStatusState(sts)
}

/**
 * state初期化
 */
function stateClear () {
  cardState.forEach(card => {
    card.isOpened  = false
  })
  setIsStarting(false)
  setOverlayState(gameState.overlay)
  setTitleState(gameState.title)
  setCountState(20)
  setReadyState(gameState.ready)
}
useEffect(() => {
}, [isStarting,overlayState,titleState,readyState,countState])

/**
 * 全部めくったかの判定
 * @returns 
 */
function isFinish() :boolean{
  if(cardState.every(card => card.isOpened)){
    return true
  }
    return false
  }

    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-15 mx-auto">
          <Head>
            <title>game</title>
            <meta name="robots" content="noindex,nofollow,noarchive" />
          </Head>
          {/* ボタン群 */}
          <div className="flex flex-wrap justify-center">
            <div className="w-1/3 mb-2">
              <button   
                className="relative start-button mt-5 mb-5" 
                onClick={onClickStart}>
                  start
              </button> 
              <button   
                className="relative start-button mt-5 mb-5 mx-4" 
                onClick={onClickReset}>
                  reset
              </button> 
              <div className="mb-5">
                <div  className="relative font-bold text-xl mb-2 flex justify-end">time:{countState}秒</div>
              </div>
              {/* メッセージ */}
              <div className={overlayState}></div>
            </div>
          </div>
        </div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      ></Backdrop>
          {/* カードコンポネント */}
        <div className="container mx-auto static z-auto">
        <div className="sm:w-2/3 md:w-full h-full flex justify-around">
        <div className='absolute flex justify-center place-content-center'>
                  <p className='static self-center title js-show-on-scroll'>{titleState}</p>
              </div>
        <div className="mx-3 h-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
            {cardState.map((card:Card, i:number) => (
              <CardDeck
                key={i}
                value={card.cardId}
                onClick={() => onClickCard(card, i)}
                className={card.className}
                clickedIndex={card.clickedIndex} 
                cardValue={card.cardValue}
                isOpened={card.isOpened}
                cardImageUrl={card.cardImageUrl}
              />
            ))}
        </div>
        </div>
        </div>
      </section>
    )
}