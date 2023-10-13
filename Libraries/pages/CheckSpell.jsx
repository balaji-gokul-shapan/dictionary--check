// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Popover, List, ListItem, Typography } from '@mui/material';
// import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';
// export function CheckSpell() {
//   // const [enteredText, setEnteredText] = useState('');
//   const [value, setValue] = useState('');
//   const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
//   const [selWord, setSelWord] = useState('');
//   const [result, setResult] = useState(null); // filter result
//   const [coords, setCoords] = useState({ x: 0, y: 0 });
//   const [showPopup, setShowPopup] = useState(false);
//   const [apiData, setApiData] = useState('');
//   const [errWord, setErrWord] = useState('');
//   const [selErrWord, setSelErrWord] = useState('');

//   let enteredText = '';
//   let typingTimer;
//   const contentEditableRef = useRef();
//   const openPopover = Boolean(popoverAnchor);
//   const handlePopoverClose = () => setPopoverAnchor(null);
//   const handleMouseEnter = () => setShowPopup(true);
//   const handleMouseLeave = () => setShowPopup(false);
//   const handleMouseMove = (event) =>
//     setCoords({ x: event.clientX, y: event.clientY });

//   useEffect(() => {
//     if (contentEditableRef.current) {
//       contentEditableRef.current.focus();
//       const selection = window.getSelection();
//       selection.selectAllChildren(contentEditableRef.current);
//       selection.collapseToEnd();
//     }
//   });

//   const handleInputChange = () => {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(() => {
//       enteredText = document.getElementById('textArea')?.innerText;
//       // enteredText = enteredText.replace(/\n/g, ' '); // Replace line breaks with spaces

//       performSpellCheck(enteredText);
//     }, 2000);
//   };

//   const handlePopoverOpen = (
//     event,
//     word,
//     errWords,
//     temp,
//     spellCheckData,
//     apiData
//   ) => {
//     const words = temp.trim();
//     setSelErrWord(words);

//     // const parser = new DOMParser();
//     // const doc = parser.parseFromString(word, 'text/html');
//     // const spanElement = doc.querySelector('span');
//     // const content = spanElement.textContent.trim();

//     //

//     setPopoverAnchor(event.currentTarget);

//     setResult(
//       (spellCheckData || apiData).filter((item) => item.correct === words)
//     );
//     setSelWord(words);
//   };

  // const handleSuggestChange = (word, apiData) => {
  //   console.log(value);
  //   console.log('LINE---80', word, '-------', apiData);
  //   let matchingIndices = value.reduce(function (indices, item, index) {
  //     if (item.includes(`<span key=${index}>${selErrWord}`)) {
  //       indices.push(index);
  //     }
  //     return indices;
  //   }, []);

  //   console.log('LINE--88-MATCHINGINDICES', matchingIndices, value);

  //   let tempStrErr = '';
  //   let replacedValue = value.map(function (item, matchingIndices) {
  //     if (item.includes(`<span key=${matchingIndices}>${selErrWord}`)) {
  //       // let replCheck = value.length-1 !== matchingIndices ? item.replace(`<span key=${matchingIndices}>${selErrWord}</span>`,word + ' ') : item.replace(`<span key=${matchingIndices}>${selErrWord}</span>`,word);

  //       let replCheck = item.replace(
  //         `<span key=${matchingIndices}>${selErrWord}</span>`,
  //         word
  //       );

  //       tempStrErr = tempStrErr + replCheck;
  //       console.log('LIne-106--replcheck', replCheck, '--------', tempStrErr);
  //       return tempStrErr;
  //     }
  //     console.log('LINE--97--TEMPTRerr', item);

  //     return `${item}`;
  //     // else{
  //     // }
  //     //   let corrCheck = value.length - 1 !== matchingIndices ? item : item;
  //     // tempStrErr = tempStrErr + item;
  //     // console.log('LINE--114--TEMPTRerr', tempStrErr, '------', item);
  //     // return `${item}`;
  //   });

  //   // let errCheck = textSplit.length-1 !== index ? `<span key=${index}>${word}</span>&nbsp;` : `<span key=${index}>${word}</span>`;
  //   // tempStr = tempStr + errCheck
  //   // return tempStr ;

  //   // var replacedValue = value.map(function (item) {
  //   //   if (item.includes(`<span key=${matchingIndices}>${selErrWord}`)) {
  //   //     tempStrErr = tempStrErr +
  //   //       item.replace(
  //   //         `<span key=${matchingIndices}>${selErrWord}</span>`,word + ' '
  //   //       );
  //   //       return tempStrErr
  //   //     // return item.replace(
  //   //     //   `<span key=${matchingIndices}>${selErrWord}</span>`,
  //   //     //   `${word}\u00A0`
  //   //     // );
  //   //   } else {
  //   //     tempStrErr += item;
  //   //     return `${item}`;
  //   //   }
  //   //   // return `${item}\u00A0`;
  //   // });

  //   // const temp = replacedValue.replace(/,/g ,' ');
  //   //
  //   document.getElementById('textArea').innerHTML = tempStrErr;

  //   const setError = replacedValue.map((word, index) => {
  //     if (word.includes('<span')) {
  //       const spanElements = document.querySelectorAll('span');
  //       spanElements.forEach((spanElement) => {
  //         spanElement.style.textDecoration = 'underline red solid 2px';
  //         spanElement.style.cursor = 'pointer';
  //         spanElement.addEventListener('click', (event) => {
  //           const clickedWord = event.target.innerText;
  //           event.target.dataset.clickedWord = clickedWord;
  //           const temp = event.target.dataset.clickedWord;

  //           handlePopoverOpen(event, word, apiData, temp, apiData);
  //         });
  //       });
  //       return `${word}`;
  //     }
  //     return `${word}`;
  //   });

  //   // const setErrorTrim = setError?.trim()
  //   setValue(setError);

  //   // const isErrorCheck = `<span key=1>${selErrWord}&nbsp;</span>`;

  //   // if (value.includes(isErrorCheck)) {
  //   //   const cleanedSelErrWord = isErrorCheck.replace(/<[^>]+>|&nbsp;/g, '');
  //   //

  //   //   return cleanedSelErrWord;
  //   // }

  //   // const isErrorCheck = `<span key=1>${selErrWord}&nbsp;</span>`;

  //   // if(value.includes(isErrorCheck)){
  //   //   const cleanedSelErrWord = isErrorCheck.replace(/<[^>]+>|&nbsp;/g, '');
  //   //
  //   //   return cleanedSelErrWord;
  //   // }

  //   //

  //   // value = value.split('&nbsp').join('');
  //   // let updatedValue = value.replace(selErrWord, word).split('&nbsp').join('<br/>');
  //   //
  //   // setValue(updatedValue);

  //   // const cleanedSelErrWord = value.replace(/<[^>]+>|&nbsp;/g, '');\
  //   // if (cleanedSelErrWord.includes(selErrWord)) {
  //   //   const replacedSelErrWord = cleanedSelErrWord.replace(selErrWord, word);
  //   //
  //   //
  //   //
  //   // } else {
  //   //
  //   // }

  //   // const resultData = document.getElementById('textArea').innerText;
  //   //

  //   //

  //   // const updatedData = value.map((element) => {
  //   //   const nestedChild = element?.props?.children[0];
  //   //   if (selWord.includes(nestedChild)) {
  //   //     return `${word}\u00A0`;
  //   //   }
  //   //   return element;
  //   // });
  //   //
  //   // setValue(updatedData);
  //   setPopoverAnchor(null);
  // };

//   const performSpellCheck = async (text) => {
//     try {
//       const response = await axios.post(
//         'https://api.textgears.com/spelling',
//         {
//           text: text,
//           language: 'en-US',
//         },
//         {
//           params: {
//             key: 'LPtt6e0Mpbx7x1SA',
//           },
//         }
//       );
//       const spellCheckResult = response.data;
//       const spellCheckData = spellCheckResult?.response.errors.map((match) => {
//         return {
//           message: match.description,
//           offset: match.offset,
//           length: match.length,
//           word: match.better,
//           type: match.type,
//           correct: match.bad,
//         };
//       });

//       setApiData(spellCheckData);

//       const errWords = spellCheckData.map((error) => error.correct);
//       setErrWord(errWords);

//       // updatedChekedWords(errWords, text, spellCheckData);
//       updatedChekedWords(errWords, text, spellCheckData);
//     } catch (error) {}
//   };

//   const updatedChekedWords = (errWords, text, spellCheckData) => {
//     const textSplit = text.match(/\b\w+\b/g);
//     // const textSplit = text.split(' ');

//     // const wordsExceptLast = textSplit.slice(0, -1);
//     //

//     // const firstWord = textSplit[0];
//     //

//     //

//     // let result;
//     // if (wordsExceptLast.includes(firstWord)) {
//     //   result = wordsExceptLast;
//     // } else {
//     //   result = firstWord;
//     // }
//     //

//     let tempStr = '';
//     const invisibleCharacter = '&#8203;';
//     const highlightedWords = textSplit.map((word, index) => {
//       if (errWords.includes(word)) {
//         let errCheck =
//           textSplit.length - 1 !== index
//             ? `<span key=${index}>${word}</span>&nbsp;`
//             : `<span key=${index}>${word}</span>`;

//         tempStr = tempStr + errCheck;
//         return tempStr;
//         // return errCheck

//         //
//         // tempStr = tempStr + `<span key=${index}>${word}</span>`;
//         // return textSplit?.length-1 !== index ? `<span key=${index}>${word + '\u00A0'}</span>` : `<span key=${index}>${word + '\u00A0'}</span>`
//       } else {
//         let CorrCheck =
//           textSplit.length - 1 !== index ? `${word + '\u00A0'}` : `${word}`;
//         tempStr = tempStr + CorrCheck;
//         return tempStr;
//         // tempStr = tempStr + `${word + '\u00A0'}`;
//         // return `${word + '\u00A0'}`;
//       }
//     });

//     // const lastword = textSplit[textSplit.length - 1];
//     //
//     //
//     //
//     //
//     //
//     //

//     // let tempLastStr = '';
//     // const lastErrorWord = lastword.split(' ').map((word, index) => {
//     //   if (errWords.includes(word)) {
//     //     tempLastStr = tempLastStr + `<span key=${index}>${word}&nbsp;</span>`;
//     //     return `<span key=${index}>${word}&nbsp;</span>`;
//     //   } else {
//     //     tempLastStr = tempLastStr + `${word + '\u00A0'}`;
//     //     return `${word + '\u00A0'}`;
//     //   }
//     // });
//     //

//     // if (errWords.includes(lastword)) {
//     //
//     //   tempStr = tempStr + `<span>${lastword}</span>`;
//     //   highlightedWords.push(`<span>${lastword}</span>`);
//     // } else {
//     //   tempStr = tempStr + `${lastword} `;
//     //   highlightedWords.push(lastword);
//     // }

//     // const highlightedWords = wordsExceptLast.map((word, index) => {
//     //   if (errWords.includes(word)) {
//     //     tempStr = tempStr + `<span key=${index}>${word}&nbsp;</span>`;
//     //     return `<span key=${index}>${word}&nbsp;</span>`;
//     //   }
//     //   else if (errWords.includes(lastword)) {
//     //
//     //     tempStr = tempStr + `<span key=${index}>${lastword}&nbsp;</span>`;
//     //     return `<span key=${index}>${lastword}&nbsp;</span>`;
//     //   }
//     //    else {
//     //     tempStr = tempStr + `${word + ' '}`;
//     //     return `${word + ' '}`;
//     //   }
//     // });

//     // const invisibleCharacter = '&#8203;';

//     document.getElementById('textArea').innerHTML =
//       tempStr.concat(invisibleCharacter);
//     // document.addEventListener('keydown', (event) => {
//     //   if (event.key === ' ') {
//     //     const words = tempStr.split(' ');
//     //     const updatedWords = words.map((word) => {
//     //       return word + '&nbsp;';
//     //     });
//     //     tempStr = updatedWords.join(' ');
//     //
//     //   }
//     // });

//     // tempStr.concat(String.fromCharCode(160),invisibleCharacter);
//     // tempStr

//     function applyStylesAndClickEvent(spanElements, word, errWords) {
//       spanElements.forEach((spanElement) => {
//         spanElement.style.textDecoration = 'underline red solid 2px';
//         spanElement.style.cursor = 'pointer';

//         // spanElement.style.marginRight = '1px';
//         spanElement.addEventListener('click', (event) => {
//           const clickedWord = event.target.innerText;
//           event.target.dataset.clickedWord = clickedWord;
//           const temp = event.target.dataset.clickedWord;

//           handlePopoverOpen(event, word, errWords, temp, spellCheckData);
//         });
//       });
//     }

//     // const checkLastErrWord = lastword.split(' ').map((word) => {
//     //   if (word.includes('<span')) {
//     //     const spanElements = document.querySelectorAll('span');
//     //     applyStylesAndClickEvent(spanElements, word, errWords);
//     //     return word;
//     //   }
//     //   return `${word}\u00A0`;
//     // });

//     const checkError = highlightedWords.map((word) => {
//       if (word.includes('<span')) {
//         const spanElements = document.querySelectorAll('span');
//         applyStylesAndClickEvent(spanElements, word, errWords);
//         return word;
//       }
//       return `${word}`;
//     });

//     // const checkLastErrWord = lastword.map((word, index) => {
//     //   if (word.includes('<span')) {
//     //     const spanElements = document.querySelectorAll('span');
//     //     spanElements.forEach((spanElement) => {
//     //       spanElement.style.textDecoration = 'underline red solid 2px';
//     //       spanElement.style.cursor = 'pointer';
//     //       spanElement.addEventListener('click', (event) => {
//     //         const clickedWord = event.target.innerText;
//     //         event.target.dataset.clickedWord = clickedWord;
//     //         const temp = event.target.dataset.clickedWord;
//     //
//     //         handlePopoverOpen(event, word, errWords, temp, spellCheckData);
//     //       });
//     //     });
//     //     return word;
//     //   }
//     //   return `${word}\u00A0`;
//     // });

//     // const checkError = highlightedWords.map((word, index) => {

//     //   if (word.includes('<span')) {
//     //     const spanElements = document.querySelectorAll('span');
//     //     spanElements.forEach((spanElement) => {
//     //       spanElement.style.textDecoration = 'underline red solid 2px';
//     //       spanElement.style.cursor = 'pointer';
//     //       spanElement.addEventListener('click', (event) => {
//     //         const clickedWord = event.target.innerText;
//     //         event.target.dataset.clickedWord = clickedWord;
//     //         const temp = event.target.dataset.clickedWord;
//     //
//     //         handlePopoverOpen(event, word, errWords, temp, spellCheckData);
//     //       });
//     //     });
//     //     return word;
//     //   }

//     //   return `${word}\u00A0`;
//     // });
//     //

//     const plainText = checkError.join('');
//     // const plainText = checkError.map((item) => JSON.stringify(item)).join(' ');
//     // setValue([...checkError, ...checkLastErrWord]);
//     setValue(checkError);
//     //
//   };

//   //   const performCheck = (text) => {
//   //     const splitText = text.match(/\b\w+\b/g);
//   //
//   //     const errWord = 'hwllo';
//   //     const textSpan = splitText.map((item, index) => {
//   //
//   //
//   //       if (errWord.includes(item)) {
//   //         return `<span key=${index} style={{ textDecoration: "underline red solid 2px", cursor: "pointer" }}>
//   //           ${item}&nbsp;
//   //           </span>`;
//   //       } else {
//   //         return `${item}`;
//   //       }
//   //     });

//   //

//   //     document.getElementById('textArea').innerHTML = textSpan;
//   //

//   //     const checkError = textSpan.map((err, index) => {
//   //       if (err.includes('<span')) {
//   //         const spanElements = document.querySelectorAll('span');
//   //         spanElements.forEach((spanElement) => {
//   //           spanElement.style.textDecoration = 'underline red solid 2px';
//   //           spanElement.style.cursor = 'pointer';
//   //         });
//   //         return err;
//   //       }
//   //       return err;
//   //     });
//   //     //

//   //     const plainText = checkError.toString();
//   //
//   //
//   //   }

//   return (
//     <>
//       <InputBoxContainer>
//         <Typography variant="h4">Spell Check</Typography>
//         <SuggestionPopUp
//           id="textArea"
//           style={{ height: '50px' }}
//           onMouseMove={handleMouseMove}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           contentEditable
//           spellCheck={false}
//           suppressContentEditableWarning
//           onInput={handleInputChange}
//           ref={contentEditableRef}>
//           {/* {enteredText} */}
//         </SuggestionPopUp>
//       </InputBoxContainer>
//       <Popover
//         open={openPopover}
//         anchorReference="anchorPosition"
//         anchorPosition={{ top: coords.y, left: coords.x }}
//         onClose={handlePopoverClose}>
//         {result?.map((element) => (
//           <List key={element?.word}>
//             {element?.word?.map((word, index) => (
//               <ListItem
//                 key={index}
//                 sx={{ cursor: 'pointer' }}
//                 onClick={() => handleSuggestChange(word, apiData)}>
//                 {word}
//               </ListItem>
//             ))}
//           </List>
//         ))}
//       </Popover>
//     </>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { InputBoxContainer, SuggestionPopUp } from '../../styles/pages/Index';
export function CheckSpell() {
  // const [enteredText, setEnteredText] = useState('');
  const [value, setValue] = useState('');
  const [popoverAnchor, setPopoverAnchor] = useState(null); //popover
  const [selWord, setSelWord] = useState('');
  const [result, setResult] = useState(null); // filter result
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [apiData, setApiData] = useState('');
  const [errWord, setErrWord] = useState('');
  const [selErrWord, setSelErrWord] = useState('');

  let enteredText = '';
  let typingTimer;
  const contentEditableRef = useRef();
  const openPopover = Boolean(popoverAnchor);
  const handlePopoverClose = () => setPopoverAnchor(null);
  const handleMouseEnter = () => setShowPopup(true);
  const handleMouseLeave = () => setShowPopup(false);
  const handleMouseMove = (event) =>
    setCoords({ x: event.clientX, y: event.clientY });

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
      const selection = window.getSelection();
      selection.selectAllChildren(contentEditableRef.current);
      selection.collapseToEnd();
    }
  });

  const handleInputChange = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      enteredText = document.getElementById('textArea')?.innerText;
      enteredText = enteredText.replace(/\n/g, ' '); // Replace line breaks with spaces
      console.log(enteredText);

      performSpellCheck(enteredText);
    }, 2000);
  };

  const handlePopoverOpen = (
    event,
    word,
    errWords,
    temp,
    spellCheckData,
    apiData
  ) => {
    console.log('apiData: ', apiData);
    const words = temp.trim();
    setSelErrWord(words);
    console.log('words: ', words);

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(word, 'text/html');
    // const spanElement = doc.querySelector('span');
    // const content = spanElement.textContent.trim();

    // console.log('content:', content);
    console.log('spellCheckData: ', spellCheckData);
    setPopoverAnchor(event.currentTarget);
    console.log(errWords);
    setResult(
      (spellCheckData || apiData).filter((item) => item.correct === words)
    );
    setSelWord(words);
  };

//------------------------------------------------------------------------------------------------------------------------
const handleSuggestChange = (word, apiData) => {
  console.log(value);
  console.log('LINE---80', word, '-------', apiData);
  let matchingIndices = value.reduce(function (indices, item, index) {
    if (item.includes(`<span key=${index}>${selErrWord}`)) {
      indices.push(index);
    }
    return indices;
  }, []);

  console.log('LINE--88-MATCHINGINDICES', matchingIndices, value);

  let tempStrErr = '';
  let replacedValue = value.map(function (item, matchingIndices) {
    if (item.includes(`<span key=${matchingIndices}>${selErrWord}`)) {
      // let replCheck = value.length-1 !== matchingIndices ? item.replace(`<span key=${matchingIndices}>${selErrWord}</span>`,word + ' ') : item.replace(`<span key=${matchingIndices}>${selErrWord}</span>`,word);

      let replCheck = item.replace(
        `<span key=${matchingIndices}>${selErrWord}</span>`,
        word
      );

      tempStrErr = tempStrErr + replCheck;
      console.log('LIne-106--replcheck', replCheck, '--------', tempStrErr);
      return tempStrErr;
    }
    console.log('LINE--97--TEMPTRerr', item);

    return `${item}`;
    // else{
    // }
    //   let corrCheck = value.length - 1 !== matchingIndices ? item : item;
    // tempStrErr = tempStrErr + item;
    // console.log('LINE--114--TEMPTRerr', tempStrErr, '------', item);
    // return `${item}`;
  });

  // let errCheck = textSplit.length-1 !== index ? `<span key=${index}>${word}</span>&nbsp;` : `<span key=${index}>${word}</span>`;
  // tempStr = tempStr + errCheck
  // return tempStr ;

  // var replacedValue = value.map(function (item) {
  //   if (item.includes(`<span key=${matchingIndices}>${selErrWord}`)) {
  //     tempStrErr = tempStrErr +
  //       item.replace(
  //         `<span key=${matchingIndices}>${selErrWord}</span>`,word + ' '
  //       );
  //       return tempStrErr
  //     // return item.replace(
  //     //   `<span key=${matchingIndices}>${selErrWord}</span>`,
  //     //   `${word}\u00A0`
  //     // );
  //   } else {
  //     tempStrErr += item;
  //     return `${item}`;
  //   }
  //   // return `${item}\u00A0`;
  // });

  // const temp = replacedValue.replace(/,/g ,' ');
  //
  document.getElementById('textArea').innerHTML = tempStrErr;

  const setError = replacedValue.map((word, index) => {
    if (word.includes('<span')) {
      const spanElements = document.querySelectorAll('span');
      spanElements.forEach((spanElement) => {
        spanElement.style.textDecoration = 'underline red solid 2px';
        spanElement.style.cursor = 'pointer';
        spanElement.addEventListener('click', (event) => {
          const clickedWord = event.target.innerText;
          event.target.dataset.clickedWord = clickedWord;
          const temp = event.target.dataset.clickedWord;

          handlePopoverOpen(event, word, apiData, temp, apiData);
        });
      });
      return `${word}`;
    }
    return `${word}`;
  });

  // const setErrorTrim = setError?.trim()
  setValue(setError);

  // const isErrorCheck = `<span key=1>${selErrWord}&nbsp;</span>`;

  // if (value.includes(isErrorCheck)) {
  //   const cleanedSelErrWord = isErrorCheck.replace(/<[^>]+>|&nbsp;/g, '');
  //

  //   return cleanedSelErrWord;
  // }

  // const isErrorCheck = `<span key=1>${selErrWord}&nbsp;</span>`;

  // if(value.includes(isErrorCheck)){
  //   const cleanedSelErrWord = isErrorCheck.replace(/<[^>]+>|&nbsp;/g, '');
  //
  //   return cleanedSelErrWord;
  // }

  //

  // value = value.split('&nbsp').join('');
  // let updatedValue = value.replace(selErrWord, word).split('&nbsp').join('<br/>');
  //
  // setValue(updatedValue);

  // const cleanedSelErrWord = value.replace(/<[^>]+>|&nbsp;/g, '');\
  // if (cleanedSelErrWord.includes(selErrWord)) {
  //   const replacedSelErrWord = cleanedSelErrWord.replace(selErrWord, word);
  //
  //
  //
  // } else {
  //
  // }

  // const resultData = document.getElementById('textArea').innerText;
  //

  //

  // const updatedData = value.map((element) => {
  //   const nestedChild = element?.props?.children[0];
  //   if (selWord.includes(nestedChild)) {
  //     return `${word}\u00A0`;
  //   }
  //   return element;
  // });
  //
  // setValue(updatedData);
  setPopoverAnchor(null);
};
//------------------------------------------------------------------------------------------------------------------------






  // const handleSuggestChange = (word, errWords) => {
  //   console.log(word);
  //   console.log(errWord);
  //   console.log(selErrWord);
  //   console.log(value);

  //   var matchingIndices = value.reduce(function (indices, item, index) {
  //     if (item.includes(`<span key=${index}>${selErrWord}&nbsp;</span>`)) {
  //       indices.push(index);
  //     }
  //     return indices;
  //   }, []);

  //   console.log(matchingIndices);

  //   let tempStrErr = '';
  //   var replacedValue = value.map(function (item) {
  //     if (
  //       item.includes(`<span key=${matchingIndices}>${selErrWord}&nbsp;</span>`)
  //     ) {
  //       tempStrErr =
  //         tempStrErr +
  //         item.replace(
  //           `<span key=${matchingIndices}>${selErrWord}&nbsp;</span>`,
  //           `${word} `
  //         );
  //       return item.replace(
  //         `<span key=${matchingIndices}>${selErrWord}&nbsp;</span>`,
  //         `${word}\u00A0`
  //       );
  //     } else {
  //       tempStrErr += item;
  //       return `${item.trim()}`;
  //     }
  //     // return `${item}\\u00A0`;
  //   });

  //   console.log(replacedValue);
  //   console.log(tempStrErr);
  //   // const temp = replacedValue.replace(/,/g ,' ');
  //   // console.log(temp);
  //   document.getElementById('textArea').innerHTML = tempStrErr.trim();

  //   const setError = replacedValue.map((word, index) => {
  //     if (word.includes('<span')) {
  //       const spanElements = document.querySelectorAll('span');
  //       spanElements.forEach((spanElement) => {
  //         spanElement.style.textDecoration = 'underline red solid 2px';
  //         spanElement.style.cursor = 'pointer';
  //         spanElement.addEventListener('click', (event) => {
  //           const clickedWord = event.target.innerText;
  //           event.target.dataset.clickedWord = clickedWord;
  //           const temp = event.target.dataset.clickedWord;
  //           console.log('clickedWord: ', clickedWord);
  //           handlePopoverOpen(event, word, errWords, temp, apiData);
  //         });
  //       });
  //       return `${word}`;
  //     }
  //     return `${word} `;
  //     // let isEmpty = word.endsWith(' ') ? word +' ' : word;
  //     // return `${isEmpty}`;
  //   });

  //   // const setErrorTrim = setError?.trim()
  //   setValue(setError);

  //   // const isErrorCheck = `<span key=1>${selErrWord}&nbsp;</span>`;

  //   // if (value.includes(isErrorCheck)) {
  //   //   const cleanedSelErrWord = isErrorCheck.replace(/<[^>]+>|&nbsp;/g, '');
  //   //   console.log('cleanedSelErrWord: ', cleanedSelErrWord);

  //   //   return cleanedSelErrWord;
  //   // }

  //   // const isErrorCheck = `<span key=1>${selErrWord}&nbsp;</span>`;

  //   // if(value.includes(isErrorCheck)){
  //   //   const cleanedSelErrWord = isErrorCheck.replace(/<[^>]+>|&nbsp;/g, '');
  //   //   console.log('cleanedSelErrWord: ', cleanedSelErrWord);
  //   //   return cleanedSelErrWord;
  //   // }

  //   // console.log(replaceWord.innerText);

  //   // value = value.split('&nbsp').join('');
  //   // let updatedValue = value.replace(selErrWord, word).split('&nbsp').join('<br/>');
  //   // console.log(updatedValue);
  //   // setValue(updatedValue);

  //   // const cleanedSelErrWord = value.replace(/<[^>]+>|&nbsp;/g, '');\\
  //   // if (cleanedSelErrWord.includes(selErrWord)) {
  //   //   const replacedSelErrWord = cleanedSelErrWord.replace(selErrWord, word);
  //   //   console.log('The word is present in selErrWord');
  //   //   console.log('Replaced string: ', replacedSelErrWord);
  //   //   console.log(cleanedSelErrWord);
  //   // } else {
  //   //   console.log('The word is not present in selErrWord');
  //   // }

  //   // const resultData = document.getElementById('textArea').innerText;
  //   // console.log('resultData: ', resultData);

  //   // console.log(enteredText);

  //   // const updatedData = value.map((element) => {
  //   //   const nestedChild = element?.props?.children[0];
  //   //   if (selWord.includes(nestedChild)) {
  //   //     return `${word}\\u00A0`;
  //   //   }
  //   //   return element;
  //   // });
  //   // console.log(updatedData);
  //   // setValue(updatedData);
  //   setPopoverAnchor(null);
  // };

  const performSpellCheck = async (text) => {
    try {
      const response = await axios.post(
        'https://api.textgears.com/spelling',
        {
          text: text,
          language: 'en-US',
        },
        {
          params: {
            key: 'LPtt6e0Mpbx7x1SA',
          },
        }
      );
      const spellCheckResult = response.data;
      const spellCheckData = spellCheckResult?.response.errors.map((match) => {
        return {
          message: match.description,
          offset: match.offset,
          length: match.length,
          word: match.better,
          type: match.type,
          correct: match.bad,
        };
      });
      console.log(spellCheckData);
      setApiData(spellCheckData);

      const errWords = spellCheckData.map((error) => error.correct);
      setErrWord(errWords);

      // updatedChekedWords(errWords, text, spellCheckData);
      updatedChekedWords(errWords, text, spellCheckData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatedChekedWords = (errWords, text, spellCheckData) => {
    const textSplit = text.match(/\b\w+\b/g);
    // const textSplit = text.split(' ');
    console.log('textSplit: ', textSplit);

    const wordsExceptLast = textSplit.slice(0, -1);
    console.log('wordsExceptLast: ', wordsExceptLast);

    const firstWord = textSplit[0];
    console.log('firstWord: ', firstWord);

    console.log(errWords.includes(firstWord));

    // let result;
    // if (wordsExceptLast.includes(firstWord)) {
    //   result = wordsExceptLast;
    // } else {
    //   result = firstWord;
    // }
    // console.log('Result: ', typeof result);

    let tempStr = '';
    const invisibleCharacter = '&#8203;';
    const highlightedWords = textSplit.map((word, index) => {
      let tempStore =""
      if (errWords.includes(word)) {
        // tempStr = tempStr + `<span key=${index}>${word}&nbsp;</span>`;
        // return `<span key=${index}>${word}&nbsp;</span>`;
        let errCheck =
          textSplit.length - 1 !== index
            ? `<span key=${index}>${word}</span>&nbsp;`
            : `<span key=${index}>${word}</span>`;
        tempStore = errCheck
        // tempStr = tempStr + errCheck;
        // return tempStr;
        // return errCheck

      } else {
        // tempStr = tempStr + `${word}`;
        // return `${word}`;
        let CorrCheck =
          textSplit.length - 1 !== index ? `${word + '\u00A0'}` : `${word}`;
          tempStore = CorrCheck
        // tempStr = tempStr + CorrCheck;
        // return tempStr;
        // return CorrCheck
      }
      tempStr = tempStr + tempStore
      return tempStore
    });
    // tempStr = highlightedWords.
    console.log("aaaaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",highlightedWords)
    const lastword = textSplit[textSplit.length - 1];
    console.log('errWords: ', errWords);
    console.log('lastword: ', lastword);
    console.log(errWords.includes(lastword));
    // console.log(lastword.includes('\\u00A0'));
    // console.log(lastword.includes(' '));

    // let tempLastStr = '';
    // const lastErrorWord = lastword.split(' ').map((word, index) => {
    //   if (errWords.includes(word)) {
    //     tempLastStr = tempLastStr + `<span key=${index}>${word}&nbsp;</span>`;
    //     return `<span key=${index}>${word}&nbsp;</span>`;
    //   } else {
    //     tempLastStr = tempLastStr + `${word + '\\u00A0'}`;
    //     return `${word + '\\u00A0'}`;
    //   }
    // });
    // console.log('lastErrorWord: ', lastErrorWord);

    // if (errWords.includes(lastword)) {
    //   console.log('true');
    //   tempStr = tempStr + `<span>${lastword}</span>`;
    //   highlightedWords.push(`<span>${lastword}</span>`);
    // } else {
    //   tempStr = tempStr + `${lastword} `;
    //   highlightedWords.push(lastword);
    // }

    console.log('highlightedWords: ', tempStr);

    // const highlightedWords = wordsExceptLast.map((word, index) => {
    //   if (errWords.includes(word)) {
    //     tempStr = tempStr + `<span key=${index}>${word}&nbsp;</span>`;
    //     return `<span key=${index}>${word}&nbsp;</span>`;
    //   }
    //   else if (errWords.includes(lastword)) {
    //     console.log('tue ');
    //     tempStr = tempStr + `<span key=${index}>${lastword}&nbsp;</span>`;
    //     return `<span key=${index}>${lastword}&nbsp;</span>`;
    //   }
    //    else {
    //     tempStr = tempStr + `${word + ' '}`;
    //     return `${word + ' '}`;
    //   }
    // });
    // console.log('highlightedWords: ', tempStr);
    // console.log('highlightedWords ===>: ', highlightedWords);
    // const invisibleCharacter = '&#8203;';
    document.getElementById('textArea').innerHTML =
      tempStr.concat(invisibleCharacter);
    // tempStr

    function applyStylesAndClickEvent(spanElements, word, errWords) {
      spanElements.forEach((spanElement) => {
        spanElement.style.textDecoration = 'underline red solid 2px';
        spanElement.style.cursor = 'pointer';
        spanElement.addEventListener('click', (event) => {
          const clickedWord = event.target.innerText;
          event.target.dataset.clickedWord = clickedWord;
          const temp = event.target.dataset.clickedWord;
          console.log('clickedWord: ', clickedWord);
          handlePopoverOpen(event, word, errWords, temp, spellCheckData);
        });
      });
    }

    // const checkLastErrWord = lastword.split(' ').map((word) => {
    //   if (word.includes('<span')) {
    //     const spanElements = document.querySelectorAll('span');
    //     applyStylesAndClickEvent(spanElements, word, errWords);
    //     return word;
    //   }
    //   return `${word}\\u00A0`;
    // });
    console.log('line---862        highlightedWords: ', highlightedWords);
    const checkError = highlightedWords.map((word) => {
      if (word.includes('<span')) {
        const spanElements = document.querySelectorAll('span');
        applyStylesAndClickEvent(spanElements, word, errWords);
        return word;
      }
      return `${word}`;
    });

    // const checkLastErrWord = lastword.map((word, index) => {
    //   if (word.includes('<span')) {
    //     const spanElements = document.querySelectorAll('span');
    //     spanElements.forEach((spanElement) => {
    //       spanElement.style.textDecoration = 'underline red solid 2px';
    //       spanElement.style.cursor = 'pointer';
    //       spanElement.addEventListener('click', (event) => {
    //         const clickedWord = event.target.innerText;
    //         event.target.dataset.clickedWord = clickedWord;
    //         const temp = event.target.dataset.clickedWord;
    //         console.log('clickedWord: ', clickedWord);
    //         handlePopoverOpen(event, word, errWords, temp, spellCheckData);
    //       });
    //     });
    //     return word;
    //   }
    //   return `${word}\\u00A0`;
    // });

    // const checkError = highlightedWords.map((word, index) => {

    //   if (word.includes('<span')) {
    //     const spanElements = document.querySelectorAll('span');
    //     spanElements.forEach((spanElement) => {
    //       spanElement.style.textDecoration = 'underline red solid 2px';
    //       spanElement.style.cursor = 'pointer';
    //       spanElement.addEventListener('click', (event) => {
    //         const clickedWord = event.target.innerText;
    //         event.target.dataset.clickedWord = clickedWord;
    //         const temp = event.target.dataset.clickedWord;
    //         console.log('clickedWord: ', clickedWord);
    //         handlePopoverOpen(event, word, errWords, temp, spellCheckData);
    //       });
    //     });
    //     return word;
    //   }

    //   return `${word}\\u00A0`;
    // });
    //console.log('checkError: ', checkError);
    console.log(' li9ne--912---checkError: ', checkError);
    const plainText = checkError.join('');
    // const plainText = checkError.map((item) => JSON.stringify(item)).join(' ');
    // setValue([...checkError, ...checkLastErrWord]);
    setValue(checkError);
    console.log('checkError: ', checkError);
    // console.log('plainText:', plainText);
  };

  //   const performCheck = (text) => {
  //     const splitText = text.match(/\b\w+\b/g);
  //     console.log('splitText: ', splitText);
  //     const errWord = 'hwllo';
  //     const textSpan = splitText.map((item, index) => {
  //       console.log('item: ', item);
  //       console.log('splitText', splitText, errWord.includes(item));
  //       if (errWord.includes(item)) {
  //         return `<span key=${index} style={{ textDecoration: "underline red solid 2px", cursor: "pointer" }}>   //           ${item}&nbsp;   //           </span>`;
  //       } else {
  //         return `${item}`;
  //       }
  //     });

  //     console.log('textSpan', textSpan);

  //     document.getElementById('textArea').innerHTML = textSpan;
  //     console.log('textSpan: ', textSpan);

  //     const checkError = textSpan.map((err, index) => {
  //       if (err.includes('<span')) {
  //         const spanElements = document.querySelectorAll('span');
  //         spanElements.forEach((spanElement) => {
  //           spanElement.style.textDecoration = 'underline red solid 2px';
  //           spanElement.style.cursor = 'pointer';
  //         });
  //         return err;
  //       }
  //       return err;
  //     });
  //     // console.log('checkError: ', checkError);

  //     const plainText = checkError.toString();
  //     console.log('checkError: ',typeof checkError);
  // console.log('checkError:', plainText);
  //   }

  return (
    <>
      <InputBoxContainer>
        <Typography variant="h4">Spell Check</Typography>
        <SuggestionPopUp
          id="textArea"
          style={{ height: '50px' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          contentEditable
          spellCheck={false}
          suppressContentEditableWarning
          onInput={handleInputChange}
          ref={contentEditableRef}>
          {/* {enteredText} */}
        </SuggestionPopUp>
      </InputBoxContainer>
      <Popover
        open={openPopover}
        anchorReference="anchorPosition"
        anchorPosition={{ top: coords.y, left: coords.x }}
        onClose={handlePopoverClose}>
        {result?.map((element) => (
          <List key={element?.word}>
            {element?.word?.map((word, index) => (
              <ListItem
                key={index}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSuggestChange(word)}>
                {word}
              </ListItem>
            ))}
          </List>
        ))}
      </Popover>
    </>
  );
}
