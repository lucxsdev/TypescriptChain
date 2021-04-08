import Utils from "./Utils";
const utils: Utils = new Utils();

interface mineResponse {
  blockMined: Block;
  approve: boolean;
}

class Block {
  public hash: string;
  public previousHash: string;
  private data: string;
  private timestamp: string;
  private nonce: number;


  constructor(data: string, previousHash: string){
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = new Date().getTime().toString();
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  public calculateHash(): string{
    let calculatedHash: string = utils.applySha256(
      this.previousHash +
      this.timestamp + 
      this.nonce +
      this.data
    );
    return calculatedHash;
  }

  public mineBlock(dificultty: number, block: Block): mineResponse{
    let res: mineResponse = {
      blockMined: block,
      approve: false
    };
    while(block.hash.substring(0, dificultty) !== utils.generateDificulttyString(dificultty)){
      this.nonce += 1;
      res.blockMined.hash = this.calculateHash();
      res.approve = true;
    }
    utils.writeFile(res.blockMined)
    return res;
  }

}

export default Block;