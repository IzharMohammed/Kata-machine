export default function two_crystal_balls(breaks: boolean[]): number {
    let jumpAmt = Math.floor(Math.sqrt(breaks.length - 1));

    let j = jumpAmt
    for (; j < breaks.length; j += jumpAmt) {
        if (breaks[j]) {
            break;
        }
    }

    j -= jumpAmt;

    for (; j < breaks.length; j++) {
        if (breaks[j]) {
            return j;
        }
    }

    return -1;
}