export function formatNum(num: number|string): string {
  if (typeof num !== 'number') {
    num = Number(num)
  }
  const dividedNum = num.toString().split(".");
  const intPart = dividedNum[0].split("");
  const decPart: string | undefined = dividedNum[1];

  const formatedIntPart = [];

  while (intPart.length > 3) {
    let firstPartChunk = intPart.pop();
    let secondPartChunk = intPart.pop();
    let thirdPartChunk = intPart.pop();

    let chunk = thirdPartChunk?.concat(
      secondPartChunk as string,
      firstPartChunk as string
    );

    formatedIntPart.unshift(chunk);
  }

  const formatedNumber: string = [intPart.join(""), ...formatedIntPart].join(" ");

  if(!decPart){
     return formatedNumber;
  }

  const formatedNumberWithDecimal = formatedNumber.concat(',', decPart);  

  return formatedNumberWithDecimal;
}
