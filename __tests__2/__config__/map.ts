//TODO better name

interface MapValue {
  r: RegExp,
  p: string,
}

const map: MapValue[] = [


];


export function getMatch(uri: string): MapValue {
  const r = map.filter(x => x.r.test(uri));
  if (r.length > 1) {
    throw {message: "to many matches for: " + uri, matches: r};
  }
  if (r.length === 0) {
    console.log('no match found for ' + uri);
    return;
  }

  return r[0];
}


export function getFp(uri: string) {
  return getMatch(uri).p;
}


export function expectedResult(uri: string) {
  return getMatch(uri).r;
}