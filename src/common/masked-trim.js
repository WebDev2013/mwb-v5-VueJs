export default {

  trimWithMask(theString, mask) {
    let s = theString.toString();  // Otherwise, can get a String object instead of a string primitive
    while (~mask.indexOf(s[0])) {
      s = s.slice(1);
    }
    while (~mask.indexOf(s[s.length - 1])) {
      s = s.slice(0, -1);
    }
    return s;
  }  
}
