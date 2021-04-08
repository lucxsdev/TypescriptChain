import sjcl from 'sjcl';
import { writeFileSync, readFileSync } from 'fs';
// import Block from './Block';

class Utils {
  public applySha256(param: string): any{
    try{
      const myBitArray = sjcl.hash.sha256.hash(param);
      const hash: string = sjcl.codec.hex.fromBits(myBitArray);
      return hash;
    } catch(error) {
      throw new Error(error)
    }
  }

  public generateDificulttyString(dif: number): string{
    let dificultty: string = '';
    for(let i = 1; i <= dif; i++){
      dificultty += '0';
    }
    return dificultty;
  }

  public writeFile(newBlock: any): void{
    let blocksHistory: string = readFileSync('blocks/HistoryBlocks.json', {encoding:'utf8', flag:'r'});
    console.log(typeof blocksHistory)
    let blocks: any[] = [];
    blocks.push(JSON.parse(blocksHistory));
    blocks.push(newBlock)
    writeFileSync('blocks/HistoryBlocks.json',
    JSON.stringify(blocks))
  }

   public readFile(): any[]{
    let result: any = readFileSync('blocks/HistoryBlocks.json')
    console.log(typeof result)
    return result;
  }
}

export default Utils;