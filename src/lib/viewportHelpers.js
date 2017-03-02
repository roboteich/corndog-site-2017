export const measureViewport = ($win, $doc) => {
  const documentElement = $doc.documentElement,
    body = $doc.getElementsByTagName('body')[0],
    width = $win.innerWidth || documentElement.clientWidth || body.clientWidth,
    height = $win.innerHeight|| documentElement.clientHeight|| body.clientHeight;
  return {width, height};
}
