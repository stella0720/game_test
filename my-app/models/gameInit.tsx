
/**
 * カード初期化
 */
 export default function Init() : Array<Card>{
    cardsArr = []
    const cardNames:string[] = ["a", "b", "c","d", "e","f", "g","h","i", "j"]
    const cardImageUrl:string[] = ["/a.png", "/b.png", "/c.png", "/d.png","/e.png","/g.png","/g.png","/h.png","/i.png","/j.png"]

    cardNames.forEach((name:string,index:number) => {
        cardsArr.push({
            cardId:index,
            isOpened: false,
            cardName: name,
            cardValue: index % 2 === 0 ? "j" : "c",
            className: "",
            clickedIndex:0,
            cardImageUrl:cardImageUrl[index]
        })
    })
    shuffle()
    return cardsArr
}

/**
 * カードシャッフル
 */
function shuffle(): void{
    const cardNum =cardsArr.length

    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [cardsArr[i],cardsArr[randomIndex]] = [cardsArr[randomIndex], cardsArr[i]];
    }
}

interface Card {
    cardId:number
    isOpened: boolean
    cardName: string
    cardValue: string
    className: string
    clickedIndex: number
    cardImageUrl:string

}

let cardsArr: Array<Card> = []
