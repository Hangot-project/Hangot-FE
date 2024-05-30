function getRgbString(hexType: string) {
  /* 맨 앞의 "#" 기호를 삭제하기. */
  const hex = hexType.trim().replace("#", "");

  /* rgb로 각각 분리해서 배열에 담기. */
  const rgb = hex.length === 3 ? hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

  rgb.forEach((str, x, arr) => {
    /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */
    if (str.length == 1) str = str + str;

    /* 10진수로 변환하기. */
    arr[x] = parseInt(str, 16).toString();
  });

  return rgb.join(", ");
}

export function hexToRgb(hexType: string) {
  return `rgb(${getRgbString(hexType)})`;
}

export function hexToRgba(hexType: string, opacity: number) {
  return `rgba(${getRgbString(hexType)}, ${opacity})`;
}
