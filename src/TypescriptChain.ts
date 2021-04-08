// import { readFileSync } from 'fs';

import Block from "./Block";

class TypescriptChain {

  public blockchain: Block[];
  private dificultty: number = 3;

  constructor(blockchain: []){
    this.blockchain = blockchain;
  }

  public main(): void {
    let genesisBlock: Block = new Block('Genesis block', '0');
    this.blockchain.push(genesisBlock);
    console.log('mine',genesisBlock.mineBlock(this.dificultty, genesisBlock))
  
    let secondBlock: Block = new Block('Second block', genesisBlock.hash);
    this.blockchain.push(secondBlock);
    console.log('mine',secondBlock.mineBlock(this.dificultty, secondBlock))

    let treeBlock: Block = new Block('Tree block', secondBlock.hash);
    this.blockchain.push(treeBlock);
    console.log('mine',treeBlock.mineBlock(this.dificultty, treeBlock))


    console.log("Blockchain valid: " + this.isChainValid());
    // console.log(this.blockchain);

  }

  public isChainValid(): boolean{
    let currentBlock: Block;
    let previousBlock: Block;


    for(let i = 1; i < this.blockchain.length; i++){
      currentBlock = this.blockchain[i];
      previousBlock = this.blockchain[i-1];

      if((currentBlock?.previousHash !== previousBlock?.hash)){
        return false
      }
      
    }
    return true;
  }

  // public getBlockchain(): Array<any>{
  //   let historyBlockchain: string = readFileSync('blocks/HistoryBlocks.txt', 'utf-8');
  //   return JSON.parse(historyBlockchain)
  // }
}

export default TypescriptChain;
